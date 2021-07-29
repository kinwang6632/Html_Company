Imports System.IO

Public Class data1
    Inherits System.Web.UI.Page

    Protected Sub Page_Load(ByVal sender As Object, ByVal e As System.EventArgs) Handles Me.Load
        Dim gridData As String = Request.Form("gridData")

        If gridData <> Nothing Then
            Dim fileName = Request.Form("fileName")
            File.WriteAllText(Server.MapPath(fileName + ".xls"), gridData)
        End If
    End Sub

End Class