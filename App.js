import React from 'react';
import { ScrollView,StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Components/Screens/HomeScreen';
import VideoPage from './Components/Screens/VideoPage';
import Login from './Components/Screens/Login';
import SignUp from './Components/Screens/Signup';
import Records from './Components/Screens/Records';
import EditProfile from './Components/Screens/EditProfile';
// import Sample from './Components/Sample';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VideoPage" component={VideoPage} />
        <Stack.Screen name="Records" component={Records} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
  </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

export default App;
