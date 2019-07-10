import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Easing,
  Image,
  Text,
  Animated,
  WebView,
  ActivityIndicator,
  Platform
} from 'react-native';

import Splash from 'react-native-smart-splash-screen';
import * as Animatable from 'react-native-animatable';
import { fonts, colors } from '../../styles';
import { AnimationFrameScheduler } from 'rxjs/internal/scheduler/AnimationFrameScheduler';
// import { normalize } from 'upath';
import DeviceInfo from 'react-native-device-info';

var animations = [
  ['bounce', '#62B42C'],
  // ['flash', '#316BA7'],
  // ['jello', '#A0A0A0'],
  // ['pulse', '#FFC600'],
  // ['rotate', '#1A7984'],
  // ['rubberBand', '#435506'],
  // ['shake', '#FF6800'],
  // ['swing', '#B4354F'],
  // ['tada', '#333333']
];

export default class SplashScreen  extends React.Component {

  constructor() {
    super();
    
    this.RotateValueHolder = new Animated.Value(0);
    this.springValue = new Animated.Value(0.3);
    this.state = {
      isLogoHidden: false,
      webviewDisplay: 'flex',
      deviceId: '',
    };
  }

  getdeviceId = () => {
    //Getting the Unique Id from here
    var id = DeviceInfo.getUniqueID();
    this.setState({ deviceId: id, });
  };

  ActivityIndicatorLoadingView() {
    return (
      <ActivityIndicator
        color='#009688'
        size='large'
        style={styles.ActivityIndicatorStyle}
      />
    );
  }

  componentDidMount() {
    // this.startImageRotateFunction();
    // this.startSpringAnimation();
    console.log('========= splash view constructor ============  ');
    Splash.close({
      animationType: Splash.animationType.scale,
      duration: 850,
      delay: 500
    });

    // Get Device Unique ID
    this.getdeviceId();
  }

  _openArticle = article => {
    this.props.navigation.navigate({
      routeName: 'Home',
      params: { ...article },
    });
  };

  stopSpringAnimation() {
    this.springValue.stopAnimation();
    this.setState({ webviewDisplay:  'flex'});
  }

  startSpringAnimation() {
    this.springValue.setValue(0.3);
    Animated.loop(
      Animated.spring(
        this.springValue,
        {
          toValue: 0.6,
          friction: 0.6,
        }
      ),
      {
        infinite: -1
      }
    ).start();
  }

  startImageRotateFunction() {
    this.RotateValueHolder.setValue(0);

    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
    }).start(() => this.startImageRotateFunction());
  }

  renderBoxes(start) {
    var selected_animations = animations.slice(start, start+3);
    return selected_animations.map((animation, index) => {
      return (
        <View
          style={{
            width: 150,
            height: 150,
          }}
        >
          <Animatable.View
            ref = {animation[0]}
            style = {[styles.box, { backgroundColor: 'none' }]}
            animation = {animation[0]}
            iterationCount = {"infinite"}>
            <Image
              source={require('../../../assets/images/anim_icon.png')}
              style={{
                width: 150,
                height: 150,
              }}
            />
            <Text style={styles.box_text}>My Anthology</Text>
          </Animatable.View>
        </View>
      );
    });
    
  }

  stopAnimation(animation) {
    this.refs['bounce'].stopAnimation();
    this.setState({ webviewDisplay:  'flex', isLogoHidden: true});
  }

  navChanged(navState) {
    if (navState.url.match('https://hoxtonpress-secure.dwellant.com/Account/LogOn')) {
    // set flex to 1;
    // this.setState({ webviewDisplay:  'flex'});
    }
  }
  
  render () {
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const { isLogoHidden } = this.state;

    return (
      <View style={styles.container}>
        { Platform.OS === 'ios' && (
          <View style={styles.container}>
            { !isLogoHidden && 
              <View  style={styles.row} >
                { this.renderBoxes(0) }
              </View>
            }
            <WebView
              // hide = {!this.state.isLogoHidden}
              source={{uri: 'https://hoxtonpress.dwellant.com'}}
              style={[ styles.WebViewStyle,
                { display: this.state.webviewDisplay }   
              ]}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              // renderLoading={this.ActivityIndicatorLoadingView} 
              // startInLoadingState={true}
              onLoadEnd = {() => this.stopAnimation()}
              onNavigationStateChange={this.navChanged}
            />
          </View>
        )}
        { Platform.OS === 'android' && (
          <View style={styles.container}>
            <WebView
              // hide = {!this.state.isLogoHidden}
              source={{uri: 'https://hoxtonpress.dwellant.com'}}
              style={[ styles.WebViewStyle,
                // { display: this.state.webviewDisplay }   
              ]}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              renderLoading={this.ActivityIndicatorLoadingView} 
              startInLoadingState={true}
              // onLoadEnd = {() => this.stopAnimation()}
              // onNavigationStateChange={this.navChanged}
            />
            
            {/* {this.state.deviceId} */}

            {/* { !isLogoHidden && 
              <View  style={styles.row} >
                { this.renderBoxes(0) }
              </View>
            } */}
          </View>
        )}
        {/* <TouchableOpacity key={"1"} onPress={() => this.StopSpringAnimation()}>

          <Animated.Image
          style={{
            width: 200,
            height: 200,
            // alignItems: 'center',
            // transform: [{ rotate: RotateData}],
            position: 'absolute',
            top: '50%',
            left: '50%',
            // transform: [
            //   {translateX: - 100},
            //   {translateY: - 100}
            // ],
            zIndex: 99,
            transform: [{ scale: this.springValue}],
          }}
          source = {
            require('../../../assets/images/anim_icon.png')
          }
          />
        </TouchableOpacity> */}
      </View>

      
    );
  };
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ddc7c2',
    position: 'relative',
  },
  WebViewStyle:
  {
    // justifyContent: 'center',
    // alignItems: 'center',
    // display: 'none',
    backgroundColor: 'transparent',
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
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: 150,
    backgroundColor: '#ccc'
  },
  row: {
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: - 75},
      {translateY: - 75}
    ],
    // display: 'none',
  },
  box_text: {
    color: '#af9674',
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
});
