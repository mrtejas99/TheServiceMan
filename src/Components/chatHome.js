import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

import { useTranslation } from "react-i18next";

import User from "./User";

// Import Firestore database
import { db, auth } from "../firebase";
import {
    query,  collection, getDocs, getDoc, where, 
     onSnapshot, orderBy, updateDoc,  doc,
} from "firebase/firestore";

function ChatHome() {
    const [user, loading, error] = useAuthState(auth);
    const [user1, setUser1] = useState('');
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [msgs, setMsgs] = useState([]);
    const [chat, setChat] = useState("");
    const [to, setTo] = useState([]);
    const { t } = useTranslation("common");

    const [users, setUsers] = useState([]);

    const navigate = useNavigate();
    const fetchmsg = async () => {
        //
        const id = user.uid > chat.uid ? `${user.uid + chat.uid}` : `${chat.uid + user.uid}`;
        console.log(id);
        const msgsRef = collection(db, "messages", id, "chat");
        const q3 = query(msgsRef, orderBy("createdAt", "asc"));
        onSnapshot(q3, (querySnapshot) => {
            let msgs = [];
            querySnapshot.forEach((doc) => {
                msgs.push(doc.data());
                console.log(msgs)
            });
            setMsgs(msgs);
        });
        //
    }
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user.uid));
            if (!q.empty) {
                const doc = await getDocs(q);
                const data = doc.docs[0].data();
                setFname(data.fname);
                setLname(data.lname);
                setUser1(data.uid);
            }
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");
        }


        try {
            const q1 = query(collection(db, "Msgfor"), where("from", "==", user.uid));

            const doc1 = await getDocs(q1);

            if (!doc1.empty) {
                const data1 = doc1.docs[0].data();
                const usersRef = collection(db, "users");
                const q = query(usersRef, where("uid", "in", data1.msgTo));
                const unsub = onSnapshot(q, (querySnapshot) => {
                    let users = [];
                    querySnapshot.forEach((doc) => {
                        users.push(doc.data());
                    });
                    setUsers(users);
                });
                return () => unsub();
            }

        }
        catch (err) {
            console.error(err);
            alert("An error occured while fetching user data");

        }
    };
    const selectUser = async (chatuser) => {

        const id = user.uid > chatuser.uid ? `${user.uid + chatuser.uid}` : `${chatuser.uid + user.uid}`;
        const docSnap = await getDoc(doc(db, "lastchat", id));
        // if last message exists and message is from selected user
        if (docSnap.data() && docSnap.data().to == user1) {
            // update last message doc, set is_read to false
            await updateDoc(doc(db, "lastchat", id), { is_read: true });
        }

        if (user) return navigate(`/chat/${chatuser.uid}`, { state: { posted_by: chatuser.uid, seconduser: chatuser.uid } });


        setChat(chatuser);
        console.log(chatuser);
    }

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/Login");
        fetchUserName();
    }, [user, loading]);

    return (

        <div className="mx-3 mt-3">
            <div><h4>{t('chats')}</h4>
                {
                    users.map((data) => (
                        <User
                            key={user.uid}
                            chatusr={data}
                            selectUser={selectUser}
                            user1={user1}
                        />
                    ))}
            </div>

        </div>
    );
}

export { ChatHome };
