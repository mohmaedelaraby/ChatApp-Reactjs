import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import ChatMSG from './ChatMSG';
import ChatMSGrec from './ChatMSGrec';
import Footer from '../footer/Footer';
import { useParams } from 'react-router-dom';
import db from '../../firebase';
//import userEvent from '@testing-library/user-event';
import { useStateValue } from '../../StateProvider';

function Chat() {
    const {roomId}= useParams(); 
    const [roomName, setRoomName] = useState("");
    const [messages,setMassegs] =useState([])
    const [{user}, dispatch] = useStateValue();

    console.log("old" , roomId)

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('massages').orderBy('timestamp' ,'asc').
            onSnapshot(snapshot=>(
                setMassegs(snapshot.docs.map(doc=>doc.data()))
            ))

        }
      

    },[roomId])

    console.log("room name" ,roomName)
    console.log("room id",roomId)
    //const data = new Date()
    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar className='ava'/>
                <div className='chat_header_info'>
                    <h3>{roomName} </h3>
                    <p>last seen at {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className='chat_header_icon'>
                    <IconButton><SearchOutlinedIcon/></IconButton>
                    <IconButton><AttachFileOutlinedIcon/></IconButton>
                      <IconButton><MoreVertOutlinedIcon/></IconButton>

                </div>
        </div>
        <div className='body_chat'>
            {messages.map((msgg)=>(msgg.name=== user.displayName?
            (<ChatMSGrec name={msgg.name} msg={msgg.message} time={new Date(msgg.timestamp?.toDate()).toUTCString()}/>):
            (<ChatMSG name={msgg.name} msg={msgg.message} time={new Date(msgg.timestamp?.toDate()).toUTCString()}/>)
            ))}
            
        </div>
        <Footer ></Footer>
        </div>
    )
}

export default Chat
