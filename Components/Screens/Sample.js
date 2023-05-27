import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SocketIO from "socket.io-client";

const Sample = () => {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const connectSocket = () => {
    const socket = new SocketIO("https://c934-2409-40c2-2f-698a-dc9c-2d6c-1daf-1dc6.ngrok-free.app/" );
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
    setSocket(socket);
  };

  const sendMessage = (message) => {
    if (socket) {
      socket.emit("message", message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Messages:</Text>
      <ul style={styles.list}>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <input
        placeholder="Enter message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
  },
  list: {
    listStyle: "none",
  },
});

export default Sample;