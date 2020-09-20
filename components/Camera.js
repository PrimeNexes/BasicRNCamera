//@ts-check

import React, {PureComponent} from 'react';
import {RNCamera} from 'react-native-camera';
import {Alert} from 'react-native';
import { PermissionsAndroid, Platform, Linking } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import Toolbar from './Toolbar';
import FontAwesome from "react-native-vector-icons/FontAwesome"

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === 'granted';
}

async function savePicture(uri) {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  return CameraRoll.save(uri);
};

class Camera extends PureComponent {
  constructor(props) {
    super(props);
    FontAwesome.loadFont();
    this.state = {
      takingPic: false,
      captures: [],
    // start the back camera by default
    cameraType: this.props.startWithBack ? RNCamera.Constants.Type.back : RNCamera.Constants.Type.front,
    };
  }


setCameraType = (cameraType) => this.setState({ cameraType });
handleCaptureIn = () => this.setState({ takingPic: true });


  openPhotos = () =>{
    switch(Platform.OS){
      case "ios":
        Linking.openURL("photos-redirect://");
      break;
      case "android":
        Linking.openURL("content://media/internal/images/media");
      break;
      default:
        Alert.alert("Could not open gallery app");
     }
    }
    
  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
       
      let options = {
        quality: 1.00,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({takingPic: true});

      try {
        const data = (await this.camera.takePictureAsync(options));
        const newLocation =await savePicture(data.uri);
        Alert.alert('Success', newLocation);
      } catch (err) {
        Alert.alert('Error', 'Failed to take picture: ' + (err.message || err));
        return;
      } finally {
        this.setState({takingPic: false});
      }

    }
  };

  render() {
    return (
      <RNCamera
        ref={ref => {
          this.camera = ref;
        }}
        captureAudio={false}
        style={{flex: 1}}
        type={this.state.cameraType}
        autoFocus={this.props.autoFocus ? RNCamera.Constants.AutoFocus.on : RNCamera.Constants.AutoFocus.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}>

        <Toolbar 
                    takingPic={this.state.takingPic}
                    cameraType={this.state.cameraType}
                    onOpenPhoto={this.openPhotos}
                    setCameraType={this.setCameraType}
                    onCapture={this.takePicture}
                />
      </RNCamera>
    );
  }
}

export default Camera