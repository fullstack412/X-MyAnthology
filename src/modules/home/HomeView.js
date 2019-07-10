import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  WebView,
  Platform,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';


export default class HomeScreen extends React.Component {
  // const rnsUrl = 'https://reactnativestarter.com';
  // const handleClick = () => {
  //   Linking.canOpenURL(rnsUrl).then(supported => {
  //     if (supported) {
  //       Linking.openURL(rnsUrl);
  //     } else {
  //       console.log(`Don't know how to open URI: ${rnsUrl}`);
  //     }
  //   });
  // };

 ActivityIndicatorLoadingView() {
  return (
    <ActivityIndicator
      color='#009688'
      size='large'
      style={styles.ActivityIndicatorStyle}
    />
  );
}

  render() {
  return (
    <WebView
        source={{uri: 'https://hoxtonpress.dwellant.com'}}
        style={styles.WebViewStyle}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={this.ActivityIndicatorLoadingView} 
        startInLoadingState={true}  
      />
  );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  WebViewStyle:
  {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  ActivityIndicatorStyle:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
