import React from 'react'
import {ReactComponent} from '../Tree_swing.svg'
import "./firstPage.scss"

const FirstPage = (props) => {
    return (
        <div className="FirstPage">
            <div className="img"><ReactComponent /></div>
            <div className="lander">
                <h1>FARMACY</h1>
                <p>A place for everybody</p>
                <form>
                    <button onClick={() => {props.history.push('/login');}}>Login</button>
                    <button onClick={() => {props.history.push('/register');}}>Register</button>
                </form>
            </div>
        </div>
    );
}

export default FirstPage
