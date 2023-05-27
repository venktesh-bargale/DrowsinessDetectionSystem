import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import React, {useState} from 'react';
const {height, width} = Dimensions.get('window');
const SignUp = ({navigation}) => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [Name, setName] = useState();
  const [Contact, setContact] = useState();
  function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  function isValidPhoneNumber(phoneNumber) {
    var phonePattern = /^\d{10}$/;
    var cleanedNumber = phoneNumber.replace(/\D/g, '');
    return phonePattern.test(cleanedNumber);
  }
  const SendData = () => {
    if (!Email == '' && !Password == '' && !Name == '' && !Contact == '') {
      if (isValidEmail(Email) && isValidPhoneNumber(Contact)) {
        firestore()
          .collection('Users')
          .doc(Email)
          .set({
            Email: Email,
            Password: Password,
            Name:Name,
            EmergencyContact:Contact
          })
          .then(() => {
            navigation.navigate('Login');
            ToastAndroid.show('Signup Successful', ToastAndroid.SHORT);
          });
      }
      else{
        ToastAndroid.show('Wrong Email OR Phone Number', ToastAndroid.SHORT);
      }
    }
    else{
      ToastAndroid.show('Please Fill all Details.', ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.MainView}>
        <View style={{height: height * 0.15}}>
          <Text style={styles.LoginText}>SignUp</Text>
        </View>
        <View style={{height: height * 0.6}}>
          <Text style={styles.HeadingText}>Create an account</Text>

          <View>
            <Text
              style={[
                styles.NormalText,
                {marginTop: 20, color: 'rgba(190, 73, 29, 1)'},
              ]}>
              Email Address
            </Text>
            <TextInput
              placeholder="sampleemail.gmail.com"
              style={styles.InputText}
              onChangeText={Text => setEmail(Text)}
            />
          </View>
          <View>
            <Text
              style={[
                styles.NormalText,
                {marginTop: 20, color: 'rgba(190, 73, 29, 1)'},
              ]}>
              Name
            </Text>
            <TextInput
              placeholder="Your Name..."
              style={styles.InputText}
              onChangeText={Text => setName(Text)}
            />
          </View>
          <View>
            <Text
              style={[
                styles.NormalText,
                {marginTop: 20, color: 'rgba(190, 73, 29, 1)'},
              ]}>
              Emergency Contact
            </Text>
            <TextInput
              placeholder="Emergency Contact"
              style={styles.InputText}
              keyboardType="decimal-pad"
              onChangeText={Text => setContact(Text)}
            />
          </View>
          <View>
            <Text
              style={[
                styles.NormalText,
                {marginTop: 20, color: 'rgba(190, 73, 29, 1)'},
              ]}>
              Password
            </Text>
            <TextInput
              placeholder="Password"
              style={styles.InputText}
              secureTextEntry
              onChangeText={Text => setPassword(Text)}
            />
          </View>
        </View>
        <View style={{height: height * 0.3}}>
          <TouchableOpacity
            style={styles.SubmitButton}
            onPress={() => SendData()}>
            <Text
              style={[styles.NormalText, {color: 'rgba(255, 255, 255, 1)'}]}>
              Signup
            </Text>
          </TouchableOpacity>
          <View style={styles.SignupView}>
            <Text
              style={[styles.NormalText, {color: 'rgba(153, 158, 161, 1)'}]}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={[styles.NormalText, {color: 'rgba(190, 73, 29, 1)'}]}>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

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
    marginTop: height * 0.07,

    color: 'rgba(190, 73, 29, 1)',
    lineHeight: 40,
    alignSelf: 'center',
  },
  HeadingText: {
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 34,
    color: 'rgba(255, 255, 255, 1)',
    marginTop: 20,
  },
  NormalText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(31, 31, 31, 1)',
  },
  InputText: {
    borderWidth: 1,
    marginTop: 10,
    height: 40,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 1)',
    paddingLeft: 10,
  },

  SubmitButton: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(190, 73, 29, 1)',
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
