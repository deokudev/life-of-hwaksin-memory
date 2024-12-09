import { Injectable } from "@angular/core";
import {
  AdMob,
  BannerAdOptions,
  BannerAdPosition,
  BannerAdSize,
  AdOptions,
  RewardAdOptions,
  AdmobConsentStatus,
  AdMobRewardItem,
  AdmobConsentDebugGeography,
} from "@capacitor-community/admob";
import { Platform } from "@ionic/angular";
import { AD_UNIT_IDS } from "../constants/ad";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class AdService {
  constructor(private platform: Platform) {}

  private getBannerAdId(): string {
    return this.platform.is("ios") ? AD_UNIT_IDS.BANNER.IOS : AD_UNIT_IDS.BANNER.ANDROID;
  }

  async initializeAd() {
    await AdMob.initialize();

    const [trackingInfo, consentInfo] = await Promise.all([
      AdMob.trackingAuthorizationStatus(),
      AdMob.requestConsentInfo({
        debugGeography: environment.production ? undefined : AdmobConsentDebugGeography.EEA,
        testDeviceIdentifiers: environment.production ? [] : AD_UNIT_IDS.TEST_DEVICES,
      }),
    ]);

    // iOS 사용자 추적 권한 요청
    if (trackingInfo.status === "notDetermined") {
      await AdMob.requestTrackingAuthorization();
    }

    // GDPR 동의 양식 표시
    const authorizationStatus = await AdMob.trackingAuthorizationStatus();
    if (
      authorizationStatus.status === "authorized" &&
      consentInfo.isConsentFormAvailable &&
      consentInfo.status === AdmobConsentStatus.REQUIRED
    ) {
      await AdMob.showConsentForm();
    }
  }

  async showBanner() {
    if (this.platform.is("mobileweb") || this.platform.is("desktop")) {
      console.log("광고는 모바일 앱에서만 지원됩니다.");
      return;
    }

    const options: BannerAdOptions = {
      adId: this.getBannerAdId(), // 실제 광고 ID
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: !environment.production,
    };

    try {
      await AdMob.showBanner(options);
    } catch (error) {
      console.error("배너 광고 표시 실패:", error);
    }
  }

  async showInterstitial() {
    const options: AdOptions = {
      adId: "ca-app-pub-XXXXX/YYYYY", // 실제 광고 ID
      // isTesting: true
    };

    try {
      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
    } catch (error) {
      console.error("전면 광고 표시 실패:", error);
    }
  }

  async showRewardVideo(): Promise<AdMobRewardItem | null> {
    const options: RewardAdOptions = {
      adId: "ca-app-pub-XXXXX/YYYYY", // 실제 광고 ID
      // isTesting: true
    };

    try {
      await AdMob.prepareRewardVideoAd(options);
      return await AdMob.showRewardVideoAd();
    } catch (error) {
      console.error("리워드 광고 표시 실패:", error);
      return null;
    }
  }

  removeBanner() {
    AdMob.removeBanner();
  }
}
