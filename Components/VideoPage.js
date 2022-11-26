import 'react-native-reanimated'
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { useState, useEffect, useRef } from 'react';
import { useSharedValue, } from 'react-native-reanimated';
import { useScanBarcodes, BarcodeFormat } from 'vision-camera-code-scanner';
import RNFetchBlob from "rn-fetch-blob";

import { Button, StyleSheet, Text, TouchableOpacity, View, showToast, StatusBar } from 'react-native';
const VideoPage = () => {

  const devices = useCameraDevices();
  const device = devices.front
  const camera = useRef(null)
  const [flag, setflag] = useState(false)
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  
  const SnapshotPhot = async () => {
    setflag(true);
    const snapshot = await camera.current.takeSnapshot({
      quality: 40,
      skipMetadata: true,
// 
    })
    // console.log(JSON.stringify(snapshot.path))
    RNFetchBlob.fs.readFile(snapshot.path,'base64')
    .then((data)=>{
      // const value=RNFetchBlob.base64.encode(data)
      console.log(data);
    })
    // RNFetchBlob.config({
    //   fileCache: true
    // })

    //   .fetch('file://'+snapshot.path)
    //   // // the image is now dowloaded to device's storage
    //   .then(resp => {
    //     // the image path you can use it directly with Image component
    //     imagePath = resp.path();
    //     console.log(imagePath);
    //     return resp.readFile("base64");
    //   })
    //   .then(base64Data => {
    //     // here's base64 encoded image
    //     // console.log(base64Data);
    //     // remove the file from storage
    //     // return fs.unlink(imagePath);
    //   });
    // 
  }
  // useEffect(() => {
  //   if(flag==true){
  //     SnapshotPhot()
  //   }
  //     // This will fire only on mount.
  // },1000)

  // const frameProcessor = useFrameProcessor((frame) => {
  //   'worklet'
  //   const isHotdog = detectIsHotdog(frame, sensitivity)
  //   console.log(isHotdog ? "Hotdog!" : "Not Hotdog.")
  // }, [sensitivity])

  if (device == null) return (<Text>Hello</Text>)
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      // audio={false}
      // video={true}
      // preset={'vga-640x480'}
      />
      {/* {setflag(true)} */}
      <View>
        <TouchableOpacity onPress={() => { SnapshotPhot() }}>
          <Text style={{ fontSize: 35 }}>Start Recoding</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity >
          <Text style={{ fontSize: 35 }}>STOP Recoding</Text>
        </TouchableOpacity>
      </View>
    </>

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