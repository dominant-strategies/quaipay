# quaipay
## Installation & Deployment
### - Installation for Android
    
To install React Native environment on Android, you need to follow the below steps: 
 
1. Install Node.js: First, you need to install Node.js on your computer. You can download and install it from the [official Node.js website](https://nodejs.org/en/download). 
 
2. Install NPM: You need to install NPM for managing packages on your computer. You can install NPM by running the following command: 
    ```bash
    $ npm install -g npm
    ``` 
3. Install JDK: Install the Java Development Kit (JDK) on your computer. You can download and install it from the [official Oracle website](https://www.oracle.com/cis/java/technologies/downloads/). 
 
4. Install Android Studio: Download and install Android Studio from the official website. Android Studio is the recommended IDE for building Android apps with React Native. 
 
5. Configure Android Studio: Open Android Studio and configure it with Android SDK and other necessary components. You can do this by selecting the “SDK Manager” option in Android Studio. 
 
6. Configure the Android emulator (Optional): You can use the Android emulator to test your React Native app on your computer. Configure the Android emulator by selecting the “AVD Manager” option in Android Studio. 
 
7. Install React Native: Open a terminal in your computer and run the following command to install React Native CLI:
    ```bash
    $ npm install -g react-native-cli
    ```
8. Download the source code: After installing the React Native CLI, you can pull the source code from [Github repository](https://github.com/dominant-strategies/quaipay) by running the following command:
    ```bash
    $ git clone https://github.com/dominant-strategies/quaipay.git
    ```
 
9. Run your app: Once you’ve created your app, you can run it on your Android emulator or a connected Android device by running the following command in your app directory:
    ```bash
    $ react-native run-android
    ```
    This will start your app on the Android emulator or the connected Android device. 
 
### - Installation for iOS
To install React Native environment on iOS, you need to follow the below steps: 

1. Install Xcode: Xcode is the recommended IDE for building iOS apps with React Native. You can download and install it from the App Store on your Mac. 

2. Install Node.js: First, you need to install Node.js on your computer. You can download and install it from the official Node.js website. 

3. Install NPM: You need to install NPM for managing packages on your computer. You can install NPM by running the following command: 
    ```bash
    $ npm install -g npm
    ``` 
4. Install Watchman: Watchman is a file watching service that is used by React Native development server to monitor code changes. You can install Watchman by running the following command in your terminal:
    ```bash
    brew install watchman
    ```

5. Install React Native CLI: After installing Watchman, you need to install React Native CLI by running the following command in your terminal:
    ```bash
    npm install -g react-native-cli
    ```
6. Download the source code: After installing the React Native CLI, you can pull the source code from [Github repository](https://github.com/dominant-strategies/quaipay) by running the following command:
    ```bash
    $ git clone https://github.com/dominant-strategies/quaipay.git
    ```
 
7. Run your app: Once you’ve created your app, you can run it in the iOS simulator by running the following command in your app directory:
    ```bash
    react-native run-ios
    ```
    This will start your app in the iOS simulator. 