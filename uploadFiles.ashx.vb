Imports System.Web
Imports System.Web.Services

Public Class uploadFiles
    Implements System.Web.IHttpHandler

    Sub ProcessRequest(ByVal context As HttpContext) Implements IHttpHandler.ProcessRequest
        Dim result As Result = Nothing
        Try
            Dim MyFileCollection As HttpFileCollection = context.Request.Files
            Dim array(MyFileCollection.Count - 1) As String
            Dim files(MyFileCollection.Count - 1) As String
            For intLoop As Integer = 0 To MyFileCollection.Count - 1
                Dim MyFile As HttpPostedFile = MyFileCollection(intLoop)
                Dim subName As String = MyFile.FileName.Split(".")(MyFile.FileName.Split(".").Length - 1)
                Dim fName As String = "log"
                If context.Request.Form("path") IsNot Nothing Then
                    fName = context.Request.Form("path")
                Else
                    Select Case subName.Replace(".", "").ToLower()
                        Case "txt"
                            fName = "txt"
                        Case "xls"
                            fName = "xls"
                        Case "csv"
                            fName = "csv"
                    End Select
                End If
                files(intLoop) = DateTime.Now.ToString("yyyyMMddHHmmssfff") & "." & subName
                array(intLoop) = fName & "\" & files(intLoop)
                If IsNoGateway() = True Then
                    MyFile.SaveAs(CableSoft.BLL.Utility.Utility.GetCurrentDirectory() & array(intLoop))
                Else
                    Dim dataGW = New DataGateway.DataGatewayClient()
                    Dim timeout As Integer
                    If timeout < 120 Then timeout = 120
                    Dim time As New TimeSpan(0, 0, timeout)
                    dataGW.Endpoint.Binding.SendTimeout = time
                    Dim br As IO.BinaryReader = New IO.BinaryReader(MyFile.InputStream)
                    Dim numBytes As Long = MyFile.InputStream.Length
                    ' convert the file to a byte array
                    Dim data As Byte() = br.ReadBytes(CType(numBytes, Integer))
                    br.Close()
                    ' pass the byte array (file) And file name to the web service
                    dataGW.UploadFile(data, fName, files(intLoop))
                End If
            Next
            'Dim FileLen As Integer
            'Dim MyStream As System.IO.Stream

            'MyFileCollection = context.Request.Files
            'MyFile = MyFileCollection(0)

            'FileLen = MyFile.ContentLength
            'Dim Input(FileLen) As Byte

            '' Initialize the stream.
            'MyStream = MyFile.InputStream

            '' Read the file into the byte array.
            'MyStream.Read(Input, 0, FileLen)
            'Using file As IO.Stream = IO.File.Create(CableSoft.BLL.Utility.Utility.GetCurrentDirectory() & "\log\test.js")
            '    MyStream.CopyTo(file)
            'End Using
            result = New Result With {.ResultBoolean = True, .ResultXML = String.Join(",", files)}
        Catch ex As Exception
            result = New Result With {.ResultBoolean = False, .ErrorCode = -999, .ErrorMessage = ex.ToString()}
        End Try
        context.Response.ContentType = "text/plain"
        context.Response.Write(Newtonsoft.Json.JsonConvert.SerializeObject(result))

    End Sub
    Public Shared Function IsNoGateway() As Boolean
        Dim noGateway As String = CableSoft.BLL.Utility.Utility.GetAppSettingValue("noGateway")
        Return (noGateway = "true")
    End Function
    ReadOnly Property IsReusable() As Boolean Implements IHttpHandler.IsReusable
        Get
            Return False
        End Get
    End Property

End Class