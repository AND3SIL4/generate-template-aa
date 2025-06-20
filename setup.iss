[Setup]
AppName="Generate Template"
AppVersion=1.0
DefaultDirName={pf}\GenerateTemplate
DefaultGroupName=GenerateTemplate
OutputDir=C:\NetApplications\Apps
OutputBaseFilename=InstaladorGenerateTemplate
Compression=lzma
SolidCompression=yes

[Files]
Source: "C:\Users\Andres Felipe Silva\Documents\PythonScripts\flet_application\build\windows\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\MiAplicacion"; Filename: "{app}\flet_application.exe"
Name: "{commondesktop}\MiAplicacion"; Filename: "{app}\flet_application.exe"; WorkingDir: "{app}"