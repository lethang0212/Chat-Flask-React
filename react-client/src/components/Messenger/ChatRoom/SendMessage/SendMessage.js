import { useEffect, useState } from "react";
import { Col, Button } from "react-bootstrap";
import styled from "styled-components";
import io from "socket.io-client";
import { useSelector } from "react-redux";

const Send = styled.div`
  display: flex;
  &&& .sendmessage {
    height: 40px;
    background-color: #b4b4d59e;
    border-radius: 10px;
    border: none;
    padding-left: 10px;
  }
`;

export const SendMessage = (id) => {
  const guid = id;
  const user = useSelector((state) => state.User);
  const uid = user.uid;
  const time = Date.now();
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");
    socket.on("my response", (response) => {
      console.log(response);
    });
    socket.emit("my response", {
      message: message,
      guid: guid.guid,
      uid: uid,
      time: time,
    });
    return () => socket.close();
  }, [message]);
  const handleMessageInput = (e) => {
    setInput(e.target.value);
  };
  const handleSendMessage = () => {
    setMessage(input);
  };
  return (
    <div>
      <Send>
        <Col xs={10}>
          <input
            onChange={handleMessageInput}
            className="w-100 sendmessage"
            placeholder="Send message"
          />
        </Col>
        <Col xs={2}>
          <Button onClick={handleSendMessage} className="bg-transparent ">
            Send
          </Button>
        </Col>
      </Send>
    </div>
  );
};
