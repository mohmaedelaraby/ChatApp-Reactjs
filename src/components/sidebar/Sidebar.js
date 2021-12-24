import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import { IconButton , Avatar } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
//import img1 from '../../images/x.jpg'
import SidebarChat from './SidebarChat';
//import db from '../../firebase';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

function Sidebar() {
    const [rooms,setRooms]=useState([]);
    const [{user}, dispatch] = useStateValue();
    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )

            ))
        ));

        return () => {
            unsubscribe();
        }
    },[]); 
   
    return (
        <div className='sidebar'>
            <div className='side_bar_header'>
                <Avatar src={user?.photoURL} className='photo_avatar'></Avatar>
                <div className='side_bar_header_right'>
                    <IconButton><ChatIcon className='icon'></ChatIcon></IconButton>
                    <IconButton> <DonutLargeIcon className='icon'></DonutLargeIcon> </IconButton>
                    <IconButton><MoreVertIcon className='icon'></MoreVertIcon></IconButton>
                </div>
              
            </div>
            <div className='side-bar-search'>
                <div className='search_bar_cont'>
                    <SearchOutlinedIcon></SearchOutlinedIcon>
                    <input type='text' placeholder='search for room'></input>
                </div>      
            </div>    
            <div className='side_bar_caht'>
                <SidebarChat addnewChat></SidebarChat>
                {rooms.map(room=> (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                ))}
                
            </div>  
        </div>
    )
}

export default Sidebar
