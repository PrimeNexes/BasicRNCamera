# BasicRNCamera
Basic Camera using RNCamera

# Permissions

To use the camera,
On Android you must ask for camera permission:

      <uses-permission android:name="android.permission.CAMERA" />
      <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
      <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
      <application
            ...
            android:requestLegacyExternalStorage="true">
        ...
      </application>

On iOS, you must update Info.plist with a usage description for camera

    <key>NSCameraUsageDescription</key>
    <string>Your own description of the purpose</string>
    <key>NSPhotoLibraryAddUsageDescription</key>
    <string>Your message to user when the photo library is accessed for the first time</string>
    <key>NSPhotoLibraryUsageDescription</key>
    <string>Your message to user when the photo library is accessed for the first time</string>

More help : 
For RNCamera - https://github.com/react-native-community/react-native-camera#permissions
For CameraRoll - https://github.com/react-native-community/react-native-cameraroll

# Dependence

    npm install @react-native-community/cameraroll --save
    npm install react-native-camera --save
    npm install react-native-easy-grid --save
    npm install --save react-native-vector-icons
