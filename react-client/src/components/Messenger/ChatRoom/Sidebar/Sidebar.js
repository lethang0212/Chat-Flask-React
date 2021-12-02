import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Col, Row, Button } from "react-bootstrap";
import styled from "styled-components";
import Collapsible from "react-collapsible";
import { FilePlusFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../../../api/config";
import { useHistory } from "react-router";
import Cookies from "js-cookie";
import { editIdRoom } from "../../../../store/action";
import { JoinZoom } from "../JoinRoom";

const SidebarStyled = styled.div`
  background: #04040459;
  color: white;
  height: 100vh;
`;

export const Sidebar = () => {
  const [collaps, setCollaps] = useState(false);
  const [status, setStatus] = useState(false);
  const [room, setRoom] = useState([]);
  const data = useSelector((state) => state.User);
  const name = data.display_name;
  const id = data.uid.toString();
  const history = useHistory();
  const dispatch = useDispatch();
  const handleIdRoom = (e) => {
    dispatch(editIdRoom(e));
  };
  const handleCreateRoom = async () => {
    await instance
      .post("/api/conversation")
      .then((response) => {
        console.log("a", response);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  };
  useEffect(async () => {
    await instance
      .get(`/api/list/${id}`)
      .then((response) => {
        console.log("get", response);
        setRoom(response.data);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }, [status]);
  return (
    <>
      <SidebarStyled>
        <Row className="px-2">
          <Col xs={12} className="d-flex text-center mt-2">
            <Avatar name={name} size={40} round={true} />
            <span className="mx-2 py-2">{name}</span>
            <Button
              onClick={() => {
                Cookies.remove("token");
                history.push("/login");
              }}
              className="ml-5 bg-transparent bd-0"
            >
              Sign Out
            </Button>
          </Col>
          <JoinZoom />
          <Col xs={12} className="pt-4">
            <Button onClick={() => setCollaps(!collaps)}>List room</Button>
            <Collapsible open={collaps} className="text-primary">
              {room.map((e) => (
                <Button
                  onClick={() => {
                    handleIdRoom(e.guid);
                  }}
                  className="bg-transparent d-block border-0 fs-12"
                >
                  Room {e.guid}
                </Button>
              ))}
              <Button
                onClick={() => {
                  setStatus(!status);
                  handleCreateRoom();
                }}
                className="bg-transparent d-block border-0"
              >
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
