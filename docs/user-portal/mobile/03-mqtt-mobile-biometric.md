---
type: flow
title: MQTT 기반 모바일 생체 인증
status: stable
version: v2.2.9
portal: user
screens:
  - login/components/octatco/MobileMetricCert.vue
related_docs:
  - ../term/02-octatco.md
  - ../auth/02-login-to-home-flow.md
api_endpoints:
  - POST /v1/nauth/user/external/octatco/reqToken/{tnt_url_id}
  - POST /v1/nauth/user/external/octatco/userLogin/{tnt_url_id}
  - POST /v1/nauth/user/external/octatco/loginCheck/{tnt_url_id}/{serial}
---

# MQTT 기반 모바일 생체 인증

[Octatco](../term/02-octatco.md) 로그인의 모바일 생체 인증에서 사용하는 MQTT 통신 구조를 다룬다. 인증 흐름 자체는 [02-login-to-home-flow.md](../auth/02-login-to-home-flow.md)의 "B-3b. 모바일 생체 인증" 참고.

## 동작 구조

모바일 생체 인증에서 "모바일"은 user-portal이 모바일에서 실행된다는 뜻이 아니다. **PC 브라우저에서 로그인할 때, 사용자의 모바일 기기(스마트폰)로 push를 보내서 그 기기에서 생체 인증을 수행**하는 방식이다.

```
PC 브라우저 (user-portal)              서버 (Octatco)              모바일 기기
        │                                  │                          │
        ├── reqToken API ─────────────────→│                          │
        │   (디바이스 목록 요청)             │                          │
        │←── 디바이스 목록 ────────────────│                          │
        │                                  │                          │
        │   [사용자가 디바이스 선택]         │                          │
        │                                  │                          │
        ├── userLogin API ────────────────→│── push 발송 ────────────→│
        │←── topic 반환 ──────────────────│                          │
        │                                  │                          │
        │   [MQTT 구독 시작]                │          [생체 인증 수행] │
        │       (30초 타임아웃)              │                          │
        │                                  │←── 인증 결과 ────────────│
        │←── MQTT 메시지 수신 ─────────────│                          │
        │   "success/{loginSerial}"        │                          │
        │                                  │                          │
        ├── loginCheck API ───────────────→│                          │
        │   (serial로 최종 검증)            │                          │
        │←── 사용자 정보 + 토큰 ───────────│                          │
        │                                  │                          │
        │   [로그인 완료 → 홈 이동]         │                          │
```

## MQTT 설정 — `octatco/octatcoConfig.js`

```javascript
MQTT: {
  host: `wss://${apiSubDomain}.${baseDomain}:${mqttPort}`,
  username: process.env["VUE_APP_OCTATCO_USERNAME"],
  password: process.env["VUE_APP_OCTATCO_PASSWORD"]
}
```

WebSocket Secure(`wss://`)로 MQTT 브로커에 연결한다. 인증 정보는 환경 변수에서 가져온다.

## MQTT 클라이언트 — `octatco/mqtt.js`

### 연결

```javascript
// connectMqtt(client, topic)
const options = getMQTTOptions();  // host, username, password, will topic
client = mqtt.connect(options.host, options);
client.subscribe(topic);
return client;
```

### 메시지 수신

```javascript
// handleMqttConnection(client, topic, type)
client.on('message', (receivedTopic, message) => {
  const msg = message.toString();
  if (type === 'auth') {
    const loginSerial = validateLoginSerial(msg);  // "success/serial" 파싱
    if (loginSerial) resolve(loginSerial);
  }
});
```

메시지 형식은 `"success/{loginSerial}"`이다. `validateLoginSerial()`이 `success/` 접두사를 확인하고 serial 부분을 추출한다. 성공하면 Promise가 resolve되어 `loginCheck` API를 호출한다.

### 타임아웃

`MobileMetricCert.vue`에서 30초 타이머를 운영한다. 시간 내에 MQTT 메시지가 오지 않으면 MQTT 연결을 종료하고 "인증 시간을 초과하였습니다" 화면으로 전환한다. "재인증 받기" 버튼으로 처음부터 다시 시도할 수 있다.

API 명세:
- [octatco](../api/nauth/user/03-octatco.md)
