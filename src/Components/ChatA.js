import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Button, Form, Col, Row, Card } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";

import Message from './MessageForm'
import Msg from "./Message";

// Import Firestore database
import { db, auth } from "../firebase";
import {
    query, setDoc, collection, getDocs, getDoc, where, addDoc, Timestamp, onSnapshot, orderBy, collectionGroup, update, updateDoc, arrayUnion, doc,
} from "firebase/firestore";

function Chat() {
    const navigate = useNavigate();
    const location = useLocation();
    const [info, setInfo] = useState([]);
    const [text, setText] = useState("");
    const [fnames, setFnames] = useState(['']);
    const [user, loading, error] = useAuthState(auth);
    const [user1, setUid1] = useState("");
    const [user2, setUid2] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [flag, setflag] = useState(1);

    const Fetchdata = async () => {
        try {

            setUid1(user.uid);
            setUid2(location.state.posted_by);
            const id = user.uid > location.state.posted_by ? `${user.uid + location.state.posted_by}` : `${location.state.posted_by + user.uid}`;

            const msgsRef = collection(db, "messages", id, "chat");
            const q3 = query(msgsRef, orderBy("createdAt", "asc"));
            onSnapshot(q3, async (querySnapshot) => {
                let msgs = [];
                querySnapshot.forEach((doc) => {
                    msgs.push(doc.data());
                });
                const docSnap = await getDoc(doc(db, "lastchat", id));
                if (docSnap.data())
                    console.log(docSnap.data().to);
                console.log(user.uid);
                if (docSnap.data() && docSnap.data().to == user.uid) {
                    // update last message doc, set is_read to true
                    await updateDoc(doc(db, "lastchat", id), { is_read: true });
                }

                // if last message exists and message is from selected user

                setMsgs(msgs);
            });
        } catch (err) {
            console.error(err);
        }
    }


    const handleSubmit = async e => {
        e.preventDefault()

        if (text.length === 0) return;

        if (flag == 1) {
            const msgforRef = doc(db, 'Msgfor', user1);
            setDoc(msgforRef, { from: user1 }, { merge: true });
            await updateDoc(msgforRef, {
                msgTo: arrayUnion(user2)
            });
            const msgforRef1 = doc(db, 'Msgfor', user2);
            setDoc(msgforRef1, { from: user2 }, { merge: true });
            await updateDoc(msgforRef1, {
                msgTo: arrayUnion(user1)
            });
            setflag(0);
        }

        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
        });
        //setText("");
        //}

        await setDoc(doc(db, "lastchat", id), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            is_read: false,
        });

        /* in last collect when "to" == user.uid the is_read=true*/

        setText("");
    }
    useEffect(() => {
        Fetchdata();
        if (!user) return navigate("/Login");
    }, [user, location]);

    return (
        <Container className="py-3">
            <div className="messages_container">
                <div className="messages">
                    {msgs.length
                        ? msgs.map((msg, i) => (
                            <Msg key={i} msg={msg} user1={user1} />
                        ))
                        : null}
                </div>
                <Message handleSubmit={handleSubmit}
                    text={text}
                    setText={setText}
                    user11={user1}
                    user22={location.state.seconduser}
                    posted_by={location.state.posted_by} />
            </div>
        </Container>
    );
}

export { Chat };
