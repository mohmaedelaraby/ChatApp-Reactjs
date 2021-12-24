import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import db from '../../firebase';
import './SidebarChat.css'

function SidebarChat({id,name,addnewChat }) {
    const [seeds,setseeds]=useState('')
    const [lastmsg, setLastMsg]=useState('');
    useEffect(()=>{
        setseeds(Math.floor(Math.random()*5000))
    },[]);

    const createchat=()=>{
        const roomName=prompt("add new chat");
        if(roomName){
            db.collection('rooms').add({
                name:roomName
            })

        }
        
    }

    useEffect(()=>{
        if(id){
            db.collection('rooms').doc(id).collection('massages').orderBy('timestamp' ,'desc').
            onSnapshot(snapshot=>(
                setLastMsg(snapshot.docs.map(doc=>doc.data()))
            ))

        }

    },[id])
    return !addnewChat ?(
        <Link to={`/rooms/${id}`}>
            <div className='sidebarchat'>
            <Avatar src={`https://avatars.dicebear.com/api/human/${seeds}.svg`} className='avatar'></Avatar>
            <div className='sidebarchat_info'>
                <h2>{name}</h2>
                <p>{lastmsg[0]?.message}</p>
            </div>
            
        </div>
        </Link>
        
    ):(<div onClick={createchat} className='buttonADD'>
        <h2 className='add'>Add New Chat</h2>

    </div>)
}

export default SidebarChat
