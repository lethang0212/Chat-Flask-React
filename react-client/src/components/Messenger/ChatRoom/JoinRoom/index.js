import { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { instance } from "../../../../api/config";

export const JoinZoom = () => {
  const [id, setId] = useState("");
  const [room, setRoom] = useState("");
  const handleJoinRoom = () => {
    setRoom(id);
  };
  useEffect(async () => {
    await instance
      .post(`api/join/${room}`)
      .then((response) => {
        console.log("thang", response);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }, [room]);
  return (
    <>
      <Col className="d-flex mt-2" xs={12}>
        <Col className="pl-0" xs={8}>
          <input
            className="w-100 h-100 pl-2 bg-transparent text-light"
            onChange={(e) => setId(e.target.value)}
            placeholder="Search ID Room"
          />
        </Col>
        <Col xs={4}>
          <Button onClick={handleJoinRoom}>Join</Button>
        </Col>
      </Col>
    </>
  );
};
