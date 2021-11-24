import React from "react";
import Avatar from "react-avatar";
import { Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import Collapsible from "react-collapsible";
import { FilePlusFill } from "react-bootstrap-icons";
import "./Style.css";

const SidebarStyled = styled.div`
  background: #04040459;
  color: white;
  height: 100vh;
`;

export const Sidebar = () => {
  return (
    <>
      <SidebarStyled>
        <Row className="px-2 h-100">
          <Col xs={12} className="d-flex text-center mt-2">
            <Avatar name="Le Dai Thang " size={40} round={true} />
            <span className="mx-2 py-2">Le Dai Thang</span>
            <Button className="ml-5 bg-transparent bd-0">Sign Out</Button>
          </Col>
          <Col xs={12} className="pt-4">
            <Collapsible trigger="List Room" className="text-primary">
              <Button className="bg-transparent d-block border-0 fs-12">
                Room 1
              </Button>
              <Button className="bg-transparent d-block border-0 fs-12">
                Room 2
              </Button>
              <Button className="bg-transparent d-block border-0 fs-12">
                Room 3
              </Button>
              <Button className="bg-transparent d-block border-0">
                <FilePlusFill />
                <span className="pl-2 ">Create Room</span>
              </Button>
            </Collapsible>
          </Col>
        </Row>
      </SidebarStyled>
    </>
  );
};
