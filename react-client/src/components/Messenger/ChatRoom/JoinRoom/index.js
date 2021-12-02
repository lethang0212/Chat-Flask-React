import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import styled from "styled-components";

export const JoinZoom = () => {
  const Send = styled.div`
    display: flex;
    &&& .sendmessage {
      height: 40px;
      background-color: #ffff;
      border-radius: 10px;
      border: none;
      padding-left: 10px;
      margin-left: 0px;
    }
  `;

  return (
    <>
      <Send className="d-flex mt-2" xs={12}>
        <Col className="pl-0" xs={8}>
          <input className="w-100 sendmessage" placeholder="Enter zoom id" />
        </Col>
        <Col xs={4}>
          <Button>Join</Button>
        </Col>
      </Send>
    </>
  );
};
