# life-of-hwaksin-memory

가정교회 확신의 삶 8구절 암송을 위한 ionic angular app입니다.

# Changes

1. Ionic Project 생성
   ionic start

2. App 로고, Favicon 생성
   [Canva](https://www.canva.com/design)
   [Favicon Converter](https://favicon.io/favicon-converter/)

3. 스크립트 추가 Home 화면 구성

4. 다크 모드 추가

5. TTS 추가

6. android/ios 추가

```
sudo npm i @capacitor/android
sudo npx cap add android
sudo npm i @capacitor/ios
sudo npx cap add ios
```

7. 광고 추가

```
sudo npm i @capacitor-community/admob
```

1. AdMob 계정 설정

   - https://admob.google.com/home/ 접속
   - Google 계정으로 로그인
   - 새 앱 추가
   - 플랫폼 선택 (Android/iOS)
   - 앱 정보 입력 (앱 이름, 카테고리 등)

2. 광고 단위 생성
   - AdMob 콘솔에서 "앱" 선택
   - "광고 단위 만들기" 클릭
   - 광고 형식 선택:
     - 배너 광고
     - 전면 광고
     - 리워드 광고
   - 각 광고 단위의 ID를 저장해두기:
     - 배너 광고(Android)
       - 앱 ID : ca-app-pub-6594298326624225~4609422361
       - 광고 단위 ID : ca-app-pub-6594298326624225/8547100704
     - 배너 광고(IOS)
       - 앱 ID : ca-app-pub-6594298326624225~2014487537
       - 광고 단위 ID : ca-app-pub-6594298326624225/3573975626

주요 설정 사항:

- AdMob 계정 생성이 필요합니다 (https://admob.google.com/)
- 실제 광고 ID로 교체해야 합니다
- 테스트 시에는 isTesting: true로 설정하고, 실제 배포 시에는 false로 변경
- iOS의 경우 추가 설정이 필요할 수 있습니다

광고 종류:

- 배너 광고: 화면 하단에 고정되어 표시
- 전면 광고: 전체 화면을 차지하는 광고 (사용자 행동에 따라 표시)

실제 앱 배포 전 주의사항:

- 테스트 모드를 비활성화 (isTesting: false)
- 실제 광고 ID 사용
- AdMob 정책 준수 확인
- 광고 표시 빈도 조절 (사용자 경험 고려)
