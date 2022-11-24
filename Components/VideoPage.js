import { Camera, useCameraDevices,useFrameProcessor } from 'react-native-vision-camera';
import { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
const VideoPage = () => {
  const devices = useCameraDevices()
  const device = devices.front
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    const isHotdog = detectIsHotdog(frame)
    console.log(isHotdog ? "Hotdog!" : "Not Hotdog.")
  }, [])
  if (device == null) return (<Text>Hello</Text>)
  return (
    <View style={{flex:1}}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        // {...cameraProps}
      frameProcessor={frameProcessor}
        // video={true}
      />
      <Text>hello hi</Text>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: "#fff",
    alignSelf: "flex-end"
  },
  video: {
    flex: 1,
    alignSelf: "stretch"
  }
})
export default VideoPage;