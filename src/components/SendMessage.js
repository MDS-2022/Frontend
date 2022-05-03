import React, {useState} from 'react'
import './sendMessage.scss'
import axios from "axios";

const SendMessage = () => {
    const[state, setState] = useState({"body" : ""})

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await axios({
            method: 'POST',
            url: 'http://localhost/api/messages',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                "sender": localStorage.getItem("username"),
                "body": state.body,
            }
        }).then((response) => {
            console.log("send")
            window.location.reload();
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <div className='sendMessage'>
            <form className="form" onSubmit={handleFormSubmit}>
                <input required name="Message" onChange={e => setState({...state, body: e.target.value})} value={state.body}/>
                <button type="submit">{parseInt(localStorage.getItem("language")) === 0 ? "Send" : "Trimite"}</button>
            </form>
        </div>
    );
}

export default SendMessage
