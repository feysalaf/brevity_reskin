!include "FileFunc.nsh"
!include "LogicLib.nsh"

!define APP_NAME "Coyote"
!define COMPANY_NAME "prodigy_intelligence"

Name "${APP_NAME}"
OutFile "installer.exe"
InstallDir "$PROGRAMFILES\${COMPANY_NAME}\${APP_NAME}"

Section "Install Application"
  SetOutPath "$INSTDIR"
  File /r "dist\*"
  File /r "resources\*"

  ; Add FFmpeg and mysite.exe to the PATH
  ReadRegStr $R0 HKCU "Environment" "Path"
  StrCpy $R0 "$R0;$INSTDIR\resources\ffmpeg\bin;$INSTDIR\resources"
  WriteRegStr HKCU "Environment" "Path" "$R0"
  System::Call 'Kernel32::SendMessageTimeout(i 0xFFFFFFFF, i ${WM_SETTINGCHANGE}, i 0, t "Environment", i ${SMTO_ABORTIFHUNG}, i 5000, *i 0)'
SectionEnd

Section "Uninstall"
  DeleteRegKey HKCU "Software\${COMPANY_NAME}\${APP_NAME}"
  ; Remove FFmpeg and mysite.exe from PATH
  ReadRegStr $R0 HKCU "Environment" "Path"
  ${StrRep} $R0 "$INSTDIR\resources\ffmpeg\bin;" ""
  ${StrRep} $R0 "$INSTDIR\resources;" ""
  WriteRegStr HKCU "Environment" "Path" "$R0"
  RMDir /r "$INSTDIR"
SectionEnd
