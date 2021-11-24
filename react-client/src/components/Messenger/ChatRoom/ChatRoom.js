import React from "react";
import { Col, Row } from "react-bootstrap";
import { ChatWindow } from "./ChatWindow";
import { Sidebar } from "./Sidebar";

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
