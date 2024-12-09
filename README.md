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

sudo npm run build
sudo chmod -R 777 ./ && npx cap sync
sudo npx cap run android -l
sudo npx cap run ios -l
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
