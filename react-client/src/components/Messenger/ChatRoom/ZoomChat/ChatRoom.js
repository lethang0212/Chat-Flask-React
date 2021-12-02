import React from "react";
import { Col, Row } from "react-bootstrap";
import { Sidebar } from "../Sidebar/Sidebar";
import { ChatWindow } from "./ChatWindow";

export const ChatRoom = () => {
  return (
    <>
      <div>
        <Row>
          <Col xs={3}>
            <Sidebar />
          </Col>
          <Col xs={9}>
            <ChatWindow />
          </Col>
        </Row>
      </div>
    </>
  );
};
