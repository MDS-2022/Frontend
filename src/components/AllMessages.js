import React, {useEffect, useState} from 'react'
import axios from "axios";
import Message from "./Message";
import './allMessages.scss'

const AllMessages = () => {
    const[state, setState] = useState({"messages" : []})

    const getMessages = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost/api/messages',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        }).then((response) => {
            const lst = response.data.map(obj => ({id: obj.id, sender: obj.sender, timestamp: obj.timestamp,
                highlight: obj.highlight, body: obj.body}));
            setState({"messages" : lst})
        }, (error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getMessages();
    }, [])

    return (
        <div className='allMessages'>
            {state.messages.map(ms => {
                return <Message id={ms.id.toString()} sender={ms.sender.toString()} timestamp={ms.timestamp.toString()} highlight={ms.highlight.toString()} body={ms.body.toString()}/>
            })}
        </div>
    );
}

export default AllMessages
