import { Col, Button } from "react-bootstrap";
import styled from "styled-components";

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

export const SendMessage = () => {
  return (
    <div>
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
