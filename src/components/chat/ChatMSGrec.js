import React from 'react'
import './ChatMSGrec.css'
function ChatMSGrec({name , msg ,time}) {
    return (
        <div>
            <p className='chat_resever'>
                <span className='chat_name'> {name} </span>
                {msg}
                <span className='chat_time'>{time}</span>
            </p>
            
        </div>
    )
}

export default ChatMSGrec
