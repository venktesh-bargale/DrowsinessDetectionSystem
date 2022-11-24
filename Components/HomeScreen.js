import { View, StyleSheet, Dimensions,ScrollView,TouchableOpacity,Text, Button } from 'react-native';
import React from 'react'
const { height, width } = Dimensions.get('window')
 const HomeScreen=({navigation})=> {
  return (
    <ScrollView contentContainerStyle={styles.backView}>
      {/* <View style={styles.backView}/> */}
        <View style={styles.fontView}>
          <TouchableOpacity style={styles.button}  onPress={() => {
                  navigation.navigate('Sample')
                }}>
            <Text style={styles.text}>
              Capture Video
            </Text>
          </TouchableOpacity>
        </View>
      
    </ScrollView>
    );
}

const styles = StyleSheet.create({
  backView:{
    width:width,
    backgroundColor:'#FFC1C1',
    height:Dimensions.get('window').height,
    alignItems:'center',
    justifyContent:'flex-end',

  },
  fontView:{
    backgroundColor:"#FFFFFF",
    height:Dimensions.get('window').height*0.7,
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    width:width,
    alignItems:'center',
    justifyContent:'center'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#57C8EC",
    padding: 10,
    width:width*0.70,
    height:60,
    borderRadius:100,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:23,
    fontWeight:'800',
    color:'#000'
  }
})
export default HomeScreen
