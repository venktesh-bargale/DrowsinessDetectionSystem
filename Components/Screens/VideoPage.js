import 'react-native-reanimated';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {useState, useEffect, useRef} from 'react';
import {color, event, useSharedValue} from 'react-native-reanimated';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import RNFetchBlob from 'rn-fetch-blob';
import SendSMS from 'react-native-sms';
import axios from 'axios';
// import SocketIO from "socket.io-client";

import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  showToast,
  StatusBar,
  Dimensions,
  Image,
  Vibration
} from 'react-native';
const VideoPage = () => {
  const devices = useCameraDevices();
  const device = devices.front;
  const camera = useRef(null);
  const [flag, setflag] = useState(false);
  const fs = RNFetchBlob.fs;
  let imagePath = null;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [VideoOn, setVideoOn] = useState(true);
  const [Dimage, setDimage] = useState(
    'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg',
  );
  const [AlertCount, setAlertCount] = useState(0)
  var ws = null;
  var IntervalID = 1;
  var count = 0;
  var event1=useRef(true);
  useEffect(() => {
    
    ws = new WebSocket(
      'ws://670d-2409-40c2-24-d6a-595a-4f6d-2ada-2ba3.ngrok-free.app/ws',
    );
    // Callback when a message is received
    ws.onmessage = event => {
      if (event.data) {
        count += 1;
      }
      if (count > 3) {
        var cnt=AlertCount+1;
        setAlertCount(cnt)
        // setAlertCount(AlertCount => prevCount + 1);
        console.log(event.data);
        Vibration.vibrate([500, 1000, 500, 2000]);
        SendSMS.send({
          body: 'Hello, this is a test message',
          recipients: ['7219724155'],
          successTypes: ['sent', 'queued'],
          allowAndroidSendWithoutReadPermission: true,
        }, (completed, canceled, error) => {
          console.log('SMS Callback: completed: ' + completed + ' canceled: ' + canceled + 'error: ' + error);
        });
        count=0
        // console.log(AlertCount)
      }
    };
    console.log(ws);
    ws.onopen = () => {
      setSocket(ws);
      // ws.send("Message")
    };
    // ws.send("message");
    // Create an interval to send echo messages to the server
  }, []);
  const onMessage = ev => {
    // console.log(ev);
    // const recv = JSON.parse(ev.data)
    // const [Data, setData] = useState()
    // const count=0;
    // // const {data, count} = this.state
    // let newData = [...Data]
    // // Remove first data if we received more than 20 values
    // if (count > 20) {
    //   newData = newData.slice(1)
    // }
    // newData.push({value: recv.value, index: count})
    // // this.setState({data: newData, count: count + 1})
    // setData(newData)
    // count+=1;
  }

  const sendMessage = message => {
    // console.log("welcomeeee")
    socket.send(message);

    // console.log(message);
  };

  const SnapshotShot = async () => {
    const snapshot = await camera.current.takeSnapshot({
      quality: 40,
      skipMetadata: true,
      //
    });
    RNFetchBlob.fs.readFile(snapshot.path, 'base64').then(async data => {
      var base64Icon = `data:image/png;base64,${data}`;
      setDimage(base64Icon);
      sendMessage(data);
    });
  };
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

  const funcall = () => {
    setflag(!flag);
    SnapshotShot();
  };
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
function condition() {
  return counter < 5;
}

async function callback() {
  SnapshotShot()
  
}
  if (device == null) return <Text>.</Text>;
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4F4F4F" />
      {}
      <View style={styles.container}>
        <Text style={styles.AlertText}>
          Alert Count: <Text style={[styles.AlertText, {fontSize: 25}]}>{AlertCount}</Text>
        </Text>
        <Camera
          ref={camera}
          style={styles.video}
          device={device}
          isActive={true}
          photo={true}
          
        />
       
       
        <View
          style={{
            flexDirection: 'row',
            width: '80%',
            justifyContent: 'space-around',
            height: Dimensions.get('window').height * 0.2,
          }}>
          <TouchableOpacity
            onPress={async(event) => {
              // event1.current=event;
              // console.log(event1)
              var interID=0;
               interID=setInterval(() => {
                if(!event1.current){
                  clearInterval(interID)
                  interID=undefined
                }
                  SnapshotShot()
                }, 1000);
              // while(event1.current){
              //   await callback()
              //   await delay(1000)
              // }
            }}
            style={styles.takeImageOutline}>
            <Image
              source={require('../Assets/Play.png')}
              style={styles.takeImage}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              
              // setVideoOn(false)
              event1.current=false;
              console.log(event1.current)
              // console.log(VideoOn)
              // clearInterval(IntervalID);
              // IntervalID = 0;
              
            }}
            style={styles.pauseImageOutline}>
            <Image
              source={require('../Assets/Recording.png')}
              style={styles.takeImage}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#4F4F4F',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  AlertText: {
    top: Dimensions.get('window').height * 0.05,
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  video: {
    // flex: 1,
    marginTop: Dimensions.get('window').height * 0.1,
    height: Dimensions.get('window').height * 0.7,
    alignSelf: 'stretch',
  },
  takeImageOutline: {
    height: 73,
    width: 73,
    borderRadius: 100,
    backgroundColor: '#4F4F4F',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 2,
    // borderColor: '#BE491D',
  },
  takeImage: {
    height: 70,
    width: 70,
    borderRadius: 100,
    // backgroundColor: '#BE491D',
    alignSelf: 'center',
  },
  LiveImage: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: '#BE491D',
    alignSelf: 'center',
  },
  pauseImageOutline: {
    height: 73,
    width: 73,
    borderRadius: 100,
    backgroundColor: '#4F4F4F',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default VideoPage;
