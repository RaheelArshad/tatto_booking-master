import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.thebarber.app',
  appName: 'thebarber',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '1000',
      SplashShowOnlyFirstTime: 'false',
      ShowSplashScreenSpinner: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '10000',
      'android-minSdkVersion': '25',
      'android-targetSdkVersion': '29'
    }
  }
};

export default config;
