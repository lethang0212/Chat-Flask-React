import React from "react";
import { Col, Row, Button } from "react-bootstrap";
import Avatar from "react-avatar";
// import Collapsible from "react-collapsible";
import styled from "styled-components";
import { FilePlusFill } from "react-bootstrap-icons";

const SidebarStyled = styled.div`
  color: white;
  height: 100vh;
  &&& .text-10 {
    font-size: 10px;
  }
  .message {
    width: 100% !important;
    overflow-y: scroll;
  }
`;

export const ChatWindow = () => {
  const data = [
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { name: "Le Thang", message: "thang dep trai nhat qua dat" },
  ];
  return (
    <>
      <SidebarStyled>
        <Row className="pt-2 h-100">
          <Col xs={12} className="d-flex justify-content-end">
            <Button className="bg-transparent border-0 text-primary">
              <FilePlusFill />
              <span>Add+</span>
            </Button>
            <div className="py-2">
              <Avatar name="Le Dai Thang " size={40} round={true}></Avatar>
              <Avatar name="Thang Le" size={40} round={true}></Avatar>
              <Avatar name=". . ." size={40} round={true}></Avatar>
            </div>
          </Col>
          <Col xs={12} className="h-75 message">
            {data.map((e) => (
              <>
                <Col className="d-block">
                  <Avatar name={e.name} size={32} round={true} />
                  <span>this's a message of smilerkai</span>
                </Col>
                <span className="text-10">{e.name} </span>
              </>
            ))}
          </Col>
          <Col xs={12} className="send-message">
            send message
          </Col>
        </Row>
      </SidebarStyled>
    </>
  );
};
