import React, {useEffect, useState} from 'react'
import axios from "axios";
import User from "./User";

const Users = (props) => {
    const[state, setState] = useState({"users" : []})

    const getUsers = async () => {
        await axios({
            method: 'GET',
            url: 'http://localhost/api/users',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            const lst = response.data.map(obj => ({id: obj.id, username: obj.username, email: obj.email, role_id: obj.role_id}));
            setState({"users": lst})
        }, (error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <div className='users'>
            {state.users.map(user => {
                return <User id={user.id.toString()}  username={user.username.toString()} email={user.email.toString()} role_id={user.role_id.toString()}/>
            })}
        </div>
    );
}

export default Users
