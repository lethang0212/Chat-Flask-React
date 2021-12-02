import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import Avatar from "react-avatar";
// import Collapsible from "react-collapsible";
import styled from "styled-components";
import { FilePlusFill } from "react-bootstrap-icons";
import { SendMessage } from "../SendMessage/SendMessage";
import { useSelector } from "react-redux";
import { instance } from "../../../../api/config";

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
  .text-you {
    margin-right: 10px;
    background-color: blue;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    width: 30% !important;
  }
  .text-other {
    margin-left: 10px;
    background-color: gray;
    border-radius: 10px;
    padding: 10px 10px 10px 10px;
    width: 30% !important;
  }
  .text-20 {
    font-size: 20px;
  }
`;

export const ChatWindow = () => {
  const guid = useSelector((state) => state.User.ID.id);
  const [id, setId] = useState();
  useEffect(async () => {
    setId(guid);
    await instance
      .post(`/api/join/${id}`)
      .then((respone) => {
        console.log("join", respone);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }, [guid]);

  const data = [
    { id: 1, name: "Le Dai Thang", message: "thang dep trai nhat qua dat" },
    { id: 2, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 2, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Thang Le", message: "thang dep trai nhat qua dat" },
    { id: 4, name: "Le Dai Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 5, name: "Thang Le", message: "thang dep trai nhat qua dat" },
    { id: 7, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 5, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 9, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 1, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 2, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 4, name: "Le Thang", message: "thang dep trai nhat qua dat" },
    { id: 5, name: "Le Thang", message: "thang dep trai nhat qua dat" },
  ];
  return (
    <>
      <SidebarStyled>
        <Row className="pt-2 h-100">
          <Col xs={12} className="d-flex justify-content-center">
            <b className="text-20">Room {id}</b>
          </Col>
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
                {e.id === 1 ? (
                  <>
                    <Col className="d-block d-flex mb-2">
                      <div>
                        <Avatar
                          name={e.name}
                          size={32}
                          round={true}
                          className="d-block"
                        />
                        <span className="text-10">Other</span>
                      </div>
                      <span className="pr-2 text-light text-other">
                        this's a message of smilerkai dasdasdasdasdasdas
                      </span>
                    </Col>
                  </>
                ) : (
                  <>
                    <Col className="d-block d-flex justify-content-end mb-2">
                      <span className="pr-2 text-light text-you">
                        this's a message of smilerkai dasdasdasdasdasdas
                      </span>
                      <div>
                        <Avatar
                          name="Y o u"
                          size={32}
                          round={true}
                          className="d-block"
                        />
                        <span className="text-10 pl-2 ">You</span>
                      </div>
                    </Col>
                  </>
                )}
              </>
            ))}
          </Col>
          <Col xs={12}>
            <SendMessage guid={id} />
          </Col>
        </Row>
      </SidebarStyled>
    </>
  );
};
