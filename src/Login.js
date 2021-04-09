import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core"
import { auth, provider } from './firebase';
import {useStateValue} from "./StateProvider";
import { actionTypes } from './reducer';

function Login() {
    const [{ }, dispatch] = useStateValue();

    const signIn = () => {
        auth.signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => {
                alert(error.message)
            })
    };

    return (
        <div className="login">

            <div className="login__container">

                <img src="https://cdn4.iconfinder.com/data/icons/social-media-flat-7/64/Social-media_Whatsapp-256.png" alt="" />


                <div className="login__text">
                    <h1>Sign In to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign In with Google
                </Button>

            </div>

        </div>
    )
}

export default Login
