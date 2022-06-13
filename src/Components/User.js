import React, { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Card, ListGroup, Col, Badge, Stack } from "react-bootstrap";
import logo from '../profile.png'

const User = ({ chatusr, selectUser, user1 }) => {
  const logoStyle = {
    resizeMode: "cover",
    maxHeight: '2rem',
    maxWidth: '2rem'
  }
  const style = {
    display: "inline-block",
    maxWidth: "50%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  const user2 = chatusr.uid;
  const [data, setData] = useState("")
  useEffect(() => {
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    let unsub = onSnapshot(doc(db, "lastchat", id), (doc) => {
      setData(doc.data());
    });
    return () => unsub()
  }, []);
  //console.log(data);
  //console.log(chatusr);
  return (
    <>      <Stack style={{ width: '10rem' }} className="my-3" >
      <div className="bg-dark border" style={{ borderRadius: '5px' }} onClick={() => selectUser(chatusr)}>
        <Card.Img className='px-1 py-1 ' variant="top" src={logo} style={logoStyle} />
        <span>{chatusr ? (chatusr.fname) : ("")}</span>
        {data ? (!data.is_read && data.to == user1 ? (<Badge bg="info">New</Badge>) : ("")) : ("")}
        <br />
        {
          <div style={style}>
            {data ? (data.text) : ("")}
          </div>
        }
      </div>

    </Stack>

    </>
  );
};

export default User;
