import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useState,useEffect} from 'react';
// import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height, width} = Dimensions.get('window');
const Login = ({navigation}) => {

  // const collectionRef = firestore().collection('users');
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  
  useEffect(() => {
    async function getData(){
      const EmailValue = await AsyncStorage.getItem("Email");
      const PasswordValue = await AsyncStorage.getItem("Password");
      if(EmailValue!== null && PasswordValue!==null){
        // console.log(EmailValue)
        // console.log(PasswordValue)
        navigation.navigate('Home');
      }
    }
    getData();
   
  }, [])
  


  
  function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  const CheckData = async() => {
    if (Email == null || Password == null) {
      ToastAndroid.show('Please fill all the details', ToastAndroid.SHORT);
    } 
    else if(isValidEmail(Email)){
      firestore()
      .collection('Users')
      .get()
      .then(querySnapshot => {
        const Size=querySnapshot.size;
        var count=0
        let Bool=false;
        console.log(querySnapshot.size)
        querySnapshot.forEach(async documentSnapshot => {
          count+=1;
          const Data=documentSnapshot.data();
          if(Email==Data.Email){
            if(Password==Data.Password){
              try{
                await AsyncStorage.setItem("Email", Email);
                await AsyncStorage.setItem("Password", JSON.stringify(Password));
                navigation.navigate("Home");
                Bool=true
              }catch(error){
                console,log("Error while saving data in async storage.")
              }
             
            }
            else{
              Bool=true;
              ToastAndroid.show('Invalid Email or Password', ToastAndroid.SHORT);
              
            }
          }
          if(count==Size && Bool==false){
            ToastAndroid.show('Invalid Email or Password', ToastAndroid.SHORT);
          }
        });
      });
    }else {
      ToastAndroid.show('Invalid Email ID', ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.MainView}>
        <View style={{height: height * 0.2}}>
          <Text style={styles.LoginText}>Login</Text>
        </View>
        <View style={{height: height * 0.5}}>
          <Text style={styles.HeadingText}>Hi, Wecome Back! 👋</Text>
          <Text style={[styles.NormalText, {color: 'rgba(255, 255, 255, 1)'}]}>
            Hello again, you’ve been missed!
          </Text>

          <View>
            <Text
              style={[styles.NormalText, {marginTop: 20, color: '#BE491D'}]}>
              Email
            </Text>
            <TextInput
              placeholder="sampleemail.gmail.com"
              style={styles.InputText}
              onChangeText={Text => setEmail(Text)}
            />
          </View>
          <View>
            <Text
              style={[styles.NormalText, {marginTop: 20, color: '#BE491D'}]}>
              Password
            </Text>
            <TextInput
              placeholder="Password"
              style={styles.InputText}
              secureTextEntry
              onChangeText={Text => setPassword(Text)}
            />
          </View>
          <TouchableOpacity>
            <Text style={[styles.NormalText, styles.ForgotText]}>
              Forgot Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{height: height * 0.3}}>
          <TouchableOpacity
            style={styles.SubmitButton}
            onPress={() => CheckData()}>
            <Text
              style={[styles.NormalText, {color: 'rgba(255, 255, 255, 1)'}]}>
              Login
            </Text>
          </TouchableOpacity>
          <View style={styles.SignupView}>
            <Text
              style={[styles.NormalText, {color: 'rgba(255, 255, 255, 1)'}]}>
              Don’t have an account ?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={[styles.NormalText, {color: '#BE491D'}]}>
                {' '}
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  Container: {
    minHeight: height,
    backgroundColor: '#4F4F4F',
    alignItems: 'center',
  },
  MainView: {
    width: width * 0.85,
  },
  LoginText: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: height * 0.1,
    color: '#BE491D',
    lineHeight: 40,
    alignSelf: 'center',
  },
  HeadingText: {
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 34,
    color: '#FFFFFF',
    marginTop: 20,
  },
  NormalText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  InputText: {
    borderWidth: 1,
    marginTop: 10,
    height: 40,
    borderRadius: 5,
    borderColor: '#FFFFFF',
    paddingLeft: 10,
    color: '#FFFFFF',
  },
  ForgotText: {
    color: '#399EF3',
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  SubmitButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#BE491D',
    height: 45,
    borderRadius: 5,
  },
  SignupView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'flex-end',
    // backgroundColor:'red',
    marginTop: '20%',
  },
});
