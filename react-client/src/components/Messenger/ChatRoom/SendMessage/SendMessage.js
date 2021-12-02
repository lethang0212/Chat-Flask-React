import { useEffect, useState } from "react";
import { Col, Button } from "react-bootstrap";
import styled from "styled-components";
import io from "socket.io-client";

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
  const [message, setMessage] = useState("");
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");
    socket.on("my response", (response) => {
      console.log(response);
    });
    socket.emit("my response", "hey yo wtf1");
    return () => socket.close();
  }, [click]);
  return (
    <div>
      <button onClick={handleClick}>click</button>
      <Send>
        <Col xs={10}>
          <input className="w-100 sendmessage" defaultValue="send message" />
        </Col>
        <Col xs={2}>
          <Button className="bg-transparent ">Send</Button>
        </Col>
      </Send>
    </div>
  );
};
