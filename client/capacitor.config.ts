import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chesssummary.app',
  appName: 'Chess Summary',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
