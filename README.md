# OutletPembukuan

![Static Badge](https://img.shields.io/badge/NodeJS-%235FA04E?style=flat-square&logo=nodedotjs&logoColor=fff)
![Static Badge](https://img.shields.io/badge/React%20Native-61DAFB?style=flat-square&logo=react&logoColor=000)
![Static Badge](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=fff)
![Static Badge](https://img.shields.io/badge/NativeWind-%2306B6D4?style=flat-square&logo=tailwindcss&logoColor=fff)
![Static Badge](https://img.shields.io/badge/Fastlane-%2300F200?style=flat-square&logo=fastlane&logoColor=fff)

A simple React native application to help manage and track a store's sales growth, and it's also come with debt and
receivable recording feature

## Table of Contents

- [Overview](#Overview)
- [Features](#Features)
- [Installation](#Installation)
- [Running the App](#running-the-app)
- [Build Instructions](#build-instruction)

## Overview

This app is come with sales and expense recording, only with adding information of your product in stock feature and you
can easily record your sales by adding your product in transaction page, it will automatically make a report that you
can see in report page

## Features

- Transaction management (sales and expense)
- Debt and Receivable management
- Stock and Category management
- Transaction Report Chart

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/rixwand/outlet-pembukuan.git
   ```
2. Navigate to the project directory:
   ```bash 
   cd outlet-pembukuan
   ```
3. Install dependencies :
   ```bash 
   npm install
   #or
   yarn install #recomended
   ```
4. Set the Environment variable
   ```dotenv
   #Contact the dev for API URL
    BASE_URL=
    DEV_URL=
   ```

## Running the app

### On the android

   ```bash
   yarn start
   # or
   npm start
   
   #if the app not launch run this in other terminal
   npx react-native run-android
   ```

### On the IOS

note: Since i dont have ios device, i dont know if it's run well in ios, good luck ;)

   ```bash
   npx react-native run-ios
   ```

## Version Management

### Install the fastlane dependency

```bash
bundle install
```

### increase version

```bash
#increase patch version
yarn bump-patch

#increase minor version
yarn bump-minor

#increase major version
yarn bump-major
```

## Build Instruction

### Debug APK

```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

```bash
cd android
```

```bash
./gradlew assembleDebug
```

APK file in `android/app/build/outputs/apk/debug/app-debug.apk`

### Release APK

```bash
keytool -genkey -v -keystore outlet_pembukuan.keystore -alias myoutlet -keyalg RSA -keysize 2048 -validity 10000
```

```bash
mv outlet_pembukuan.keystore android/app
```

open your `android\app\build.gradle` file and add the keystore configuration.

```
android {
....
  signingConfigs {
    release {
      storeFile file('your_key_name.keystore')
      storePassword 'your_key_store_password'
      keyAlias 'your_key_alias'
      keyPassword 'your_key_file_alias_password'
    }
  }
  buildTypes {
    release {
      ....
      signingConfig signingConfigs.release
    }
  }
}
```

```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
```

```bash
cd android
```

```bash
./gradlew assembleRelease
```

APK file in `android/app/build/outputs/apk/release/app-release.apk`