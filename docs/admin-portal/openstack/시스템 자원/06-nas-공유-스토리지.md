# NAS — 공유 스토리지

admin-portal 메뉴: 시스템 자원 > 네트워크 스토리지 (A1007/T1007)

## NAS (Network-Attached Storage)

네트워크를 통해 파일 단위로 접근하는 공유 스토리지. 블록 스토리지(Cinder)와 달리 파일 시스템 수준에서 공유.

### Block Storage vs NAS

| 항목 | Block Storage (Cinder) | NAS (공유 폴더) |
|------|----------------------|-----------------|
| 접근 단위 | 블록 (섹터) | 파일 |
| 프로토콜 | iSCSI, FC | NFS, CIFS/SMB |
| VM 연결 | 1:1 (한 VM에 하나) | N:M (여러 VM에서 공유) |
| 용도 | OS 디스크, 개인 디스크 | 공유 폴더, 부서 파일 서버 |

## CloudX에서의 NAS

### NetApp 연동

CloudX는 NetApp 스토리지를 NAS 백엔드로 사용. `app-ms-operation`에서 NetApp API와 직접 통신.

```
admin-portal → app-ms-resource → app-ms-operation → NetApp REST API
```

서비스 그룹 설정(`serviceGroup` 스토어)에 NetApp 연동 정보 포함:
- `cert_id` / `cert_passwd_cryptval` — 인증 정보
- `ip` / `port` — NetApp 접속 주소
- `grp_fold_cre_size` — 그룹 폴더 기본 생성 크기

### SA vs TA 조회 범위

| 역할 | API | 조회 범위 |
|------|-----|----------|
| SA | `POST /v1/legacy/cloud/ad/allSharedfolders` | 전체 테넌트의 NAS 사용량 집계 |
| TA | `POST /v1/legacy/cloud/ad/sharedfolder/directories` | 자기 테넌트의 사용자 그룹별 사용량 |

### 공유 폴더 구조

```
NetApp Volume
  └── 테넌트 A
        ├── 사용자 그룹 1 (부서)
        │     ├── 공유 폴더 (dept_cd)
        │     └── 용량: usedSize / totalSize
        └── 사용자 그룹 2
              └── ...
```

AD(Active Directory) 연동과 함께 사용. AD의 OU(조직 단위)가 NAS 공유 폴더의 접근 권한과 매핑.
