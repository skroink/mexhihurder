Dim WshShell
Dim obj
Set WshShell = WScript.CreateObject("WScript.Shell")
obj = WshShell.run("npmStart.bat",0)
set WshShell = nothing
