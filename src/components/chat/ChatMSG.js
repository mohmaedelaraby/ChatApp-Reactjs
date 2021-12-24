import React from 'react'
import './ChatMSG.css'

function ChatMSG({name , msg ,time}) { 
    return (
        <div>
           
            <p className='chat_msg'>
                <span className='chat_name'> {name} </span>
                {msg}
                <span className='chat_time'>{time}</span>
            </p>
            
            
        </div>
    )
}

export default ChatMSG
