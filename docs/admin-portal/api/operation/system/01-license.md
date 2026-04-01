# 시스템 라이선스 API

리소스 경로 기준: `/v1/operation/system/license`

---

## 시스템 라이선스 조회

```
GET /v1/operation/system/license
```

**응답**

| 필드 | 타입 | 설명 |
|------|------|------|
| data | object | 라이선스 정보 |
| data.version | string | 시스템 버전 |
| data.license_valid_period | string | 라이선스 유효 기간 (`YYYY.MM.DD~YYYY.MM.DD`) |
| data.quantity_virtual_pc | string | 라이선스 가상PC 수량 |
| data.contact | string | 문의 이메일 |

**호출 위치**

| 컴포넌트 | 라인 |
|----------|------|
| `views/adminSetting/SystemLicense.vue` | 78 |
| `views/policy/UserAuthPolicySupadm.vue` | 737 |
| `views/userInfo/policy/policyManager.vue` | 142 |
