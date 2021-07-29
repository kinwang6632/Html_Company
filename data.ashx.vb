Imports System.IO
Imports System.Web
Imports System.Web.Services

Public Class data
    Implements System.Web.IHttpHandler
    Private errorCount As Integer = 0
    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim value As String = Nothing
        Try
            Dim timeout As Double = 0
            Dim sr As String = Nothing
            If context.Request.Params("timeout") IsNot Nothing Then
                timeout = context.Request.Params("timeout")
            Else
                sr = New StreamReader(context.Request.InputStream).ReadToEnd()
                timeout = getParamsValue(sr, "timeout")
            End If
            Dim parameters As String = context.Request.Params("parameters")
            If parameters Is Nothing Then
                If sr Is Nothing Then
                    sr = New StreamReader(context.Request.InputStream).ReadToEnd()
                End If
                parameters = HttpUtility.UrlDecode(getParamsValue(sr, "parameters"))
            End If
            If (parameters = "getDate") Then
                value = Newtonsoft.Json.JsonConvert.SerializeObject(DateTime.Now)
            Else
                If context.Request.Url.AbsoluteUri.ToLower().IndexOf("localhost") >= 0 Then
                    value = InvokeDataGateway(ChangeGetKey(parameters), timeout)
                Else
                    value = InvokeDataGateway(parameters, timeout)
                End If
            End If
        Catch ex As Exception
            Dim result As New Dictionary(Of String, Object)
            result.Add("parameters", New Result With {.ResultBoolean = False, .ErrorCode = -999, .ErrorMessage = ex.ToString()})
            value = Newtonsoft.Json.JsonConvert.SerializeObject(result)
        End Try
        context.Response.ContentType = "text/plain"
        context.Response.Write(value)
    End Sub
    Public Shared Function getParamsValue(data As String, paramName As String) As String
        Dim params() As String = data.Split("&")
        For Each param As String In params
            Dim values() As String = param.Split("=")
            If values(0) = paramName Then
                Return values(1)
            End If
        Next
        Return Nothing
    End Function

    Public Shared Function IsNoGateway() As Boolean
        Dim noGateway As String = CableSoft.BLL.Utility.Utility.GetAppSettingValue("noGateway")
        Return (noGateway = "true")
    End Function
    Public Function InvokeDataGateway(parameters As String, timeout As Double) As String
        Try
            Dim dataGW As Object = Nothing
            If IsNoGateway() = True Then
                dataGW = CableSoft.BLL.Utility.Utility.DynamicCreateClass("CableSoft.WCF.DataGateway.dll", "CableSoft.WCF.DataGateway.DataGateway", Nothing, Nothing)
            Else
                dataGW = New DataGateway.DataGatewayClient()
                If timeout < 120 Then timeout = 120
                Dim time As New TimeSpan(0, 0, timeout)
                dataGW.Endpoint.Binding.SendTimeout = time
            End If
            Dim value As String = dataGW.GetData(parameters)
            If IsNoGateway() = True OrElse CheckAndDownloadFile(value) Then
                Return value
            Else
                Throw New Exception("CheckAndDownloadFile")
            End If
        Catch ex As Exception
            If ex.HResult = -2146233087 AndAlso errorCount = 0 Then
                errorCount += 1
                Return InvokeDataGateway(parameters, timeout)
            Else
                Dim result As New Result With {.ResultBoolean = False, .ErrorCode = -999, .ErrorMessage = ex.ToString()}
                Return Newtonsoft.Json.JsonConvert.SerializeObject(result)
            End If
        End Try
    End Function

    Private Function ChangeGetKey(parameters As String) As String
        Dim newBytes As Byte() = Convert.FromBase64String(parameters)
        Dim value As String = System.Text.Encoding.UTF8.GetString(newBytes)
        If value.IndexOf("getKey") < 0 Then
            Return parameters
        Else
            Dim jObject = Newtonsoft.Json.JsonConvert.DeserializeObject(value)
            jObject("classname") = GetEncryptKey()
            Dim plainTextBytes = System.Text.Encoding.UTF8.GetBytes(jObject.ToString())
            Return System.Convert.ToBase64String(plainTextBytes)
            'Return jObject.ToString()
        End If
    End Function

    Private Function CheckAndDownloadFile(value As String) As Boolean
        Dim jObj As Object = Newtonsoft.Json.JsonConvert.DeserializeObject(value)
        If jObj("parameters") IsNot Nothing Then
            Dim para As Object = jObj("parameters")
            Dim downLoad = Function(p As Object) As Boolean
                               If p("DownloadFileName") IsNot Nothing AndAlso p("DownloadFileName").ToString().Length > 0 Then
                                   Try
                                       Dim wc As New Net.WebClient()
                                       Dim fileName As String = p("DownloadFileName")
                                       Dim dataGW As DataGateway.DataGatewayClient = New DataGateway.DataGatewayClient()
                                       fileName = fileName.TrimStart("/").TrimStart("\")
                                       wc.DownloadFile(dataGW.Endpoint.ListenUri.AbsoluteUri.Replace(dataGW.Endpoint.ListenUri.AbsolutePath, "") + "/" + fileName, CableSoft.BLL.Utility.Utility.GetCurrentDirectory() + "\" + fileName.Replace("/", "\"))
                                       wc.Dispose()
                                       'Dim ms As MemoryStream = New MemoryStream()
                                       'Dim fs As FileStream = New FileStream(String.Format("{0}\{1}\{2}", CableSoft.BLL.Utility.Utility.GetCurrentDirectory(), Path, FileName), FileMode.Create)
                                       'ms.WriteTo(fs)
                                       'ms.Close()
                                       'ms.Dispose()
                                       'fs.Close()
                                       'fs.Dispose()
                                   Catch ex As Exception
                                       Return False
                                   End Try
                               End If
                               Return True
                           End Function
            If para.type = Newtonsoft.Json.Linq.JTokenType.Array Then
                For intLoop As Integer = 0 To para.count - 1
                    downLoad(para(intLoop))
                Next
            Else
                downLoad(para)
            End If
        End If
        jObj = Nothing
        Return True
    End Function
    Private Function GetEncryptKey() As String
        Dim aes As New CableSoft.Utility.Cryptography.AES(GetParaEncryptKey())
        Return aes.Encrypt(Date.Now.AddHours(2).ToString("yyyy/MM/dd HH:mm:ss"))
    End Function
    Private ReadOnly AppSetting As New System.Configuration.AppSettingsReader()
    Private Function GetParaEncryptKey() As String
        Return AppSetting.GetValue("EncryptKey", GetType(String))
    End Function
    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class