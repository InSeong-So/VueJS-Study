# 오류 해결
> 이 시스템에서 스크립트를 실행할 수 없으므로 ...파일을 로드할 수 없습니다.

- Windows에서 정책적으로 Powershell 실행에 제한이 있어 불가능.
  - 관리자 권한이 있는 powershell로 ExecutionPolicy를 RemoteSigned로 변경해주는 것으로 해결

```cmd
PS C:\> Set-ExecutionPolicy -Scope CurrentUser

cmdlet Set-ExecutionPolicy(명령 파이프라인 위치 1)
다음 매개 변수에 대한 값을 제공하십시오.
ExecutionPolicy: RemoteSigned
PS C:\> Get-ExecutionPolicy
RemoteSigned
PS C:\>
```