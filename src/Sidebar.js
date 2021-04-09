import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import { Avatar, IconButton, recomposeColor } from "@material-ui/core";
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from "./firebase";
import { useStateValue } from './StateProvider';




function Sidebar() {
    const [rooms, setrooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection("rooms")
            .onSnapshot((snapshot) => {
                setrooms(snapshot.docs.map((doc) => {
                    return ({
                        id: doc.id,
                        data: doc.data()
                    });
                }))
            });

        return () => {
            unsubscribe();
        }

    }, []);

    console.log(rooms);


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL}/>
                <div className="sidebar__headerRight">

                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">

                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input type="text" placeholder="Search or start  new chat" />
                </div>

            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => {
                    return (
                        <SidebarChat
                            key={room.id}
                            id={room.id}
                            name={room.data.name}

                        />
                    );
                })
                }

            </div>
        </div>
    )
}

export default Sidebar;
