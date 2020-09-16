import React from 'react';
import Camera from './components/Camera';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
          <Camera/>
        </SafeAreaView>
  );
};


export default App;