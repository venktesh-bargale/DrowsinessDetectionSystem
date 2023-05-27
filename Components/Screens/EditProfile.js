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
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
const {height, width} = Dimensions.get('window');
const EditProfile = ({navigation}) => {
  const [Email, setEmail] = useState();
  const [Password, setPassword] = useState();
  const [Name, setName] = useState();
  const [Contact, setContact] = useState();

  useEffect(() => {
    async function getData(){
        const EmailValue = await AsyncStorage.getItem("Email");
        console.log(EmailValue);
        firestore()
          .collection('Users')
          .doc(EmailValue)
          .onSnapshot(documentSnapshot => {
            setEmail(documentSnapshot.data().Email);
            setPassword(documentSnapshot.data().Password);
            setName(documentSnapshot.data().Name);
            setContact(documentSnapshot.data().EmergencyContact);
            // console.log('User data: ', documentSnapshot.data());
          });
    }
    getData();
    
    
    // Stop listening for updates when no longer required
  }, []);

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
            Name: Name,
            EmergencyContact: Contact,
          })
          .then(() => {
            ToastAndroid.show('Profile Updated Successfully', ToastAndroid.SHORT);
            navigation.navigate("Home")
          });
      } else {
        ToastAndroid.show('Wrong Email OR Phone Number', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show('Please Fill all Details.', ToastAndroid.SHORT);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View style={styles.MainView}>
        <View style={{height: height * 0.15}}>
          <Text style={styles.LoginText}>Edit Profile</Text>
        </View>
        <View style={{height: height * 0.6}}>
          <View>
            <Text
              style={[
                styles.NormalText,
                {marginTop: 20, color: 'rgba(190, 73, 29, 1)'},
              ]}>
              Email Address
            </Text>
            <TextInput
              value={Email}
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
              value={Name}
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
              value={Contact}
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
              value={Password}
              style={styles.InputText}
              secureTextEntry
              onChangeText={Text => setPassword(Text)}
            />
          </View>
        </View>
        <View style={{height: height * 0.25}}>
          <TouchableOpacity
            style={styles.SubmitButton}
            onPress={() => SendData()}>
            <Text
              style={[styles.NormalText, {color: 'rgba(255, 255, 255, 1)'}]}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;

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
