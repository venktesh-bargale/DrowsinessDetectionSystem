import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Text,
  Button,
  Image,
  Alert,
  BackHandler,
  NativeModules
} from 'react-native';
import React, {useEffect,useState} from 'react';
const {height, width} = Dimensions.get('window');
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Icon from 'react-native-vector-icons/Entypo';
import Settings from 'react-native-vector-icons/Feather';
import Logout from 'react-native-vector-icons/MaterialIcons';
import {useFocusEffect} from '@react-navigation/native';
import AwesomeAlert from 'react-native-awesome-alerts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendSMS from 'react-native-sms';
import SmsAndroid from 'react-native-sms';

const HomeScreen = ({navigation}) => {
  const [EnablePopup, setEnablePopup] = useState(false)
  const [ShowPopup, setShowPopup] = useState(false)
  var DirectSMS = NativeModules.DirectSms;
  const [bodySMS, setBodySMS] = useState(
    'This is Test Message',
  );
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
      //   Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      //     {
      //       text: 'Cancel',
      //       onPress: () => null,
      //       style: 'cancel',
      //     },
      //     {text: 'YES', onPress: () => BackHandler.exitApp()},
      //   ]
      // );
      setShowPopup(true)  

        // return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );


  hideAlert = () => {
    setShowPopup(false);
  };
  CloseAPP=()=>{
    setShowPopup(false);
    BackHandler.exitApp()
  }
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('Hold on!', 'Are you sure you want to go back?', [
  //       {
  //         text: 'Cancel',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {text: 'YES', onPress: () => BackHandler.exitApp()},
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () =>  backHandler.removeEventListener("hardwareBackPress", backAction);
  // }, []);

  const LogoutUser=()=>{
    AsyncStorage.removeItem("Email")
    AsyncStorage.removeItem("Password")
    navigation.navigate("Login")
  }
  return (
    <ScrollView contentContainerStyle={styles.backView}>
      <View style={{width: width * 0.9}}>
        <View style={styles.TopView}>
          <View style={styles.TopInnerView}>
            <Text style={styles.HomeText}>HOME</Text>
            <TouchableOpacity style={{marginRight: 10}} onPress={()=>setEnablePopup(!EnablePopup)}>
              <Settings name="settings" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
          <Text style={styles.NormalText}>
            Tap on any option to Processed for further options.
          </Text>
         {
          EnablePopup
          ? <View style={styles.popupView}>
          <TouchableOpacity style={styles.PopUpOptions} onPress={()=> navigation.navigate("EditProfile")}>
          <Settings name="edit" size={18} color="#BE491D" />
            <Text style={[styles.NormalText,{color:'#000',marginLeft:10}]}>Edit Profile</Text>
          </TouchableOpacity>
          <View style={{width:'90%',borderWidth:0.5,alignSelf:'center',borderColor:'#4F4F4F'}}/>
          <TouchableOpacity style={styles.PopUpOptions} onPress={()=> LogoutUser()}>
          <Logout name="logout" size={18} color="#BE491D" />
            <Text style={[styles.NormalText,{color:'#000',marginLeft:10}]}>Logout</Text>
          </TouchableOpacity>
        </View>
          :""
         }
        </View>
        <View>
          <View style={styles.TouchableOuterView}>
            <Text style={styles.Heading}>Statistics</Text>
            <TouchableOpacity
              style={styles.TouchableView}
              onPress={() =>
                {
                  DirectSMS.sendDirectSms("7558744737","This is test Message");
                }
              }>
              <View style={styles.TouchableImageView}>
                <Image
                  source={require('../Assets/Staticstics.png')}
                  style={styles.StaticsticsImage}
                />
              </View>
              <View style={styles.TextView}>
                <Text style={styles.TouchableHeading}>Recent Statistics</Text>
                <Text style={styles.TouchableText}>
                  Tap to get a glance of your drowsy beheviour
                </Text>
              </View>
              <View style={styles.IconView}>
                <Icon name="chevron-right" size={30} color="#FFF" />
              </View>
            </TouchableOpacity>
          </View>
          <View style={[styles.TouchableOuterView, {marginTop: 40}]}>
            <Text style={styles.Heading}>Detection</Text>
            <TouchableOpacity
              style={styles.TouchableView}
              onPress={() => navigation.navigate('VideoPage')}>
              <View style={styles.TouchableImageView}>
                <Image
                  source={require('../Assets/Record.png')}
                  style={styles.StaticsticsImage}
                />
              </View>
              <View style={styles.TextView}>
                <Text style={styles.TouchableHeading}>camera Detection</Text>
                <Text style={styles.TouchableText}>
                  Tap to start drowsiness detection
                </Text>
              </View>
              <View style={styles.IconView}>
                <Icon name="chevron-right" size={30} color="#FFF" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <AwesomeAlert
          show={ShowPopup}
          showProgress={false}
          title="Hold on!"
          message="Are you sure you want to go back?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="cancel"
          confirmText="Yes"
          confirmButtonColor="#DD6B55"
          confirmButtonStyle={{width:80,alignItems:'center'}}
          cancelButtonStyle={{width:80,alignItems:'center'}}
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.CloseAPP();
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backView: {
    width: width,
    backgroundColor: '#4F4F4F',
    height: height,
    alignItems: 'center',
  },
  TopView: {
    height: height * 0.2,
    width: width,
    paddingTop: 20,
    paddingRight: 30,
  },
  TopInnerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  popupView: {
    position: 'absolute',
    backgroundColor: 'rgba(253, 250, 255, 1)',
    width: width * 0.4,
    height: 100,
    right: 50,
    top: 50,
    borderRadius:4
  },
  PopUpOptions:{
    width:'100%',
    height:'50%',
    alignItems:'center',
    marginLeft:10,
    flexDirection:'row'
  },
  HomeText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 10,
  },
  NormalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    lineHeight: 24,
  },
  fontView: {
    backgroundColor: '#FFFFFF',
    height: Dimensions.get('window').height * 0.7,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  TouchableOuterView: {
    width: '100%',
    alignItems: 'flex-start',
  },
  TouchableView: {
    height: height * 0.2,
    backgroundColor: '#363638',
    width: width * 0.9,
    borderRadius: 9,
    flexDirection: 'row',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#57C8EC',
    padding: 10,
    width: width * 0.7,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Heading: {
    fontSize: 23,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  TouchableImageView: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextView: {
    width: '50%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  IconView: {
    // backgroundColor:'red',
    alignItems: 'center',
    width: '20%',
    justifyContent: 'center',
  },
  TouchableHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#ffffff',
  },
  TouchableText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    lineHeight: 20,
  },
  StaticsticsImage: {
    height: '50%',
    width: '50%',
    resizeMode: 'contain',
  },
});
export default HomeScreen;
