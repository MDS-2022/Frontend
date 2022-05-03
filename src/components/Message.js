import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import './message.scss'

const Message = (props) => {

    const deleteMessage = async () => {
        const url = 'http://localhost/api/messages/' + props.id;
        await axios({
            method: 'DELETE',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("delete");
            window.location.reload();
        }, (error) => {
            console.log(error);
        })
    }

    const highlightMessage = async () => {
        let high = ''
        if (props.highlight === "true") {
            high = "false"
        } else {
            high = "true"
        }
        await axios({
            method: 'PUT',
            url: 'http://localhost/api/messages',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                "id": props.id,
                "body": props.body,
                "highlight": high
            }
        }).then((response) => {
            console.log("highlight")
            window.location.reload();
        }, (error) => {
            console.log(error);
        });

    }

    return (
        <div key={props.id} className={props.highlight === 'true' ? 'HighMessage' : 'Message'}>
            <div className='text'>
                <p className='timestamp'>{props.timestamp.substring(0, 10)} {props.timestamp.substring(12, 19)}</p>
                <p className='sender'>{props.sender === localStorage.getItem("username") ? "" : props.sender + ":"} {props.body}</p>
            </div>
            <div className='icons'>
                {localStorage.getItem("role") === "USER" ? <div/> :
                    <IconButton className='icon_delete' aria-label="delete" onClick={deleteMessage}>
                        <DeleteIcon/>
                    </IconButton>
                }

                {props.highlight === 'true' ? <input className='checkbox' type="checkbox" onClick={highlightMessage} checked/> :
                    <input className='checkbox' type="checkbox" onClick={highlightMessage} />}

            </div>
        </div>
    );
}

export default Message
