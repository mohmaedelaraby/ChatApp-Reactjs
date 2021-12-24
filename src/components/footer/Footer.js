import React, { useState } from 'react'
import './footer.css'
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import { IconButton } from '@mui/material';
import MicOutlinedIcon from '@mui/icons-material/MicOutlined';
import Axios from '../../Axios'

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useStateValue } from '../../StateProvider';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import db from '../../firebase';

function Footer() {
    const [input,setInput]=useState('');
    const {roomId}= useParams(); 
    const [{user}, dispatch] = useStateValue();
// for mongoDB messages
  //  const sendMessages= async (e)=>{
    //    e.preventDefault();

      //  await Axios.post('/messages/new',{
       // message:input,
        //name: "do7a",
        //timestamp: "00:00",
        //received: false
          //  });

            //setinput('')
    
    //}

    // for firebase masseges

    const FBsendMessages =(e)=>{
        e.preventDefault();
        console.log("msg =>" , input)
        db.collection('rooms').doc(roomId).collection('massages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })

        setInput("");
    }
    
    return (
        <div className='chat_footer'>
            <IconButton> <InsertEmoticonOutlinedIcon className='emoji_icon'/></IconButton>
            <form>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Type a message"/>
                <button onClick={FBsendMessages} type='submit'>
                Send
                </button>
            </form>
            <IconButton><MicOutlinedIcon className='mic_icon'/></IconButton>
            
        </div>
    )
}

export default Footer
