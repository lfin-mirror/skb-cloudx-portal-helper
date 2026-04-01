# docs/ 문서 작성 규칙

세부 규칙은 `.claude/rules/`에 분리되어 해당 파일 편집 시 자동 로드.

| 규칙 파일 | 적용 대상 | 내용 |
|----------|----------|------|
| `docs-writing.md` | `docs/**/*.md` | 파일명 넘버링, 중복 금지, 문체, 흐름 문서 |
| `docs-sa-ta.md` | `docs/admin-portal/SA/**`, `TA/**` | SA/TA 화면 문서 구성, 메뉴 트리 조회 |
| `docs-openstack.md` | `docs/admin-portal/openstack/**` | OpenStack 지식 문서, 추측 표기, 데이터 소스 |
| `docs-api.md` | `docs/**/api/**` | API 명세 폴더 구조, CRUD 한 파일 원칙 |

## 폴더 구조

```
docs/
├── CLAUDE.md              # 이 파일 (규칙 인덱스)
├── term/                  # 프로젝트 공통 용어 정의
├── admin-portal/          # 관리자 포털 문서
│   ├── SA/                # Super Admin 화면 문서 (한글 폴더명)
│   ├── TA/                # Tenant Admin 화면 문서 (한글 폴더명)
│   ├── openstack/         # 화면 이해에 필요한 OpenStack/VDI 지식
│   │   ├── 시스템 자원/   # Nova, Neutron, Cinder, Glance 등
│   │   └── 정책/          # SPICE 프로토콜 등
│   ├── internals/         # 내부 구조 (역할 무관)
│   ├── common/            # 공통 컴포넌트 (역할 무관)
│   ├── auth/              # 인증 흐름
│   ├── init/              # 초기 설정 마법사
│   ├── api/               # admin-portal API 명세
│   └── term/              # admin-portal 전용 용어
├── user-portal/           # 사용자 포털 문서
│   ├── api/               # user-portal API 명세
│   └── term/              # user-portal 전용 용어
├── app-ms-resource/       # 리소스 관리 MS 문서
├── app-ms-operation/      # 운영/정책 관리 MS 문서
├── plat-ms-vid4o/         # OpenStack 어댑터 MS 문서
├── openstack/             # OpenStack 일반 지식 (프로젝트 전체 공통)
└── speculation/           # 코드 기반 추측 문서
```

- 각 서브프로젝트 문서는 루트의 레포명과 동일한 폴더 하위에 작성.
- `term/`은 `docs/term/`(공통)과 `docs/{서브프로젝트}/term/`(전용)으로 분리. 여러 프로젝트에서 사용하면 공통, 한 프로젝트에서만 사용하면 전용.
