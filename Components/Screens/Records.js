import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
const Records = () => {
  return (
    <ScrollView contentContainerStyle={styles.Container}>
      <View>
        <Text>Records</Text>
      </View>
    </ScrollView>
  );
};

export default Records;

const styles = StyleSheet.create({
  Container: {
    width: width,
    backgroundColor: '#4F4F4F',
    height: height,
    alignItems: 'center',
  },
});
