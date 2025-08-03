# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the development server

   ```bash
   npx expo start
   ```

## Running Your App 📱💻🖥️

Once the development server is running, you can test your app in multiple ways:

### 🌐 Web Browser (Easiest)
Press `w` in your terminal to open the app in your web browser.

### 📱 Expo Go on Your Phone
1. Install **Expo Go** from App Store (iOS) or Google Play (Android)
2. Make sure your phone and computer are on the same WiFi network
3. Open Expo Go and scan the QR code from your terminal
4. Your app will open on your phone with live reload

### 🖥️ iOS Simulator (Mac only)
Press `i` in your terminal to open the iOS Simulator.

### 🤖 Android Emulator
Press `a` in your terminal to open the Android Emulator.

### 🔧 Development Builds (Advanced)
For testing with native modules:
```bash
npx expo run:ios     # iOS device/simulator
npx expo run:android # Android device/emulator
```

### 📱 Direct USB Connection (iPhone/Android)
For the most reliable connection:

**For iPhone:**
1. Connect your iPhone to your Mac via USB cable
2. Trust the computer when prompted on your iPhone
3. Run: `npx expo run:ios --device`
4. Your app will install and open directly on your iPhone

**For Android:**
1. Enable USB debugging on your Android device
2. Connect via USB cable
3. Run: `npx expo run:android --device`
4. Your app will install and open directly on your Android device

### 🌐 Tunnel Mode (Alternative)
If you have network issues with Expo Go:
```bash
npx expo start --tunnel
```

## Troubleshooting 🔧

### Expo Go Not Working?
- Make sure your phone and computer are on the same WiFi
- Try refreshing the Expo Go app (pull down to refresh)
- Check that the terminal shows "Using Expo Go" (not "Using development build")

### Development Build Issues?
- If you see "Using development build" but want to use Expo Go, make sure `expo-dev-client` is not installed
- Remove it with: `npm uninstall expo-dev-client`

### Network Issues?
- Try tunnel mode: `npx expo start --tunnel`
- Or use web version: press `w` in terminal

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
