import { Avatar, IconButton } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import "./Chat.css";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MicIcon from '@material-ui/icons/Mic';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { useParams } from "react-router-dom";
import db from './firebase.js'
import { useStateValue } from './StateProvider';
import firebase from "firebase";


function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState("");
    const { roomId } = useParams();
    const [roomName, setroomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection("rooms").doc(roomId).onSnapshot((snapshot) => {
                setroomName(snapshot.data().name);

                db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map((doc) => {
                        return (
                            doc.data()
                        );
                    }))
                })
            });
        }

    }, [roomId])

    console.log("Mesg", messages.message);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");
    }
 



    return (
        <div className="chat">

            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString() }</p>
                </div>

                <div className="chat__headerRight">

                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>
            </div>


            <div className="chat__body">
                {messages.map((message) => {
                    return (
                        <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                    );
                })}
            </div>



            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={(e) => {
                        setInput(e.target.value)
                    }} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>

            </div>

        </div>
    )
}

export default Chat;
