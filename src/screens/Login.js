import React, { useState } from 'react';
import '../App.css';
import { signIn } from '../services/UserAuthService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('Please Enter Email Address');
    const [passwordError, setPasswordError] = useState('Please Enter Password');

    // displayErrors is used so errors won't be displayed until the user has attempted to log in.
    // I find this to be less annoying to the user
    const [displayErrors, setDisplayErrors] = useState(false);
    const [logInResult, setLogInResult] = useState('');

    const logInUser = async () => {
        setDisplayErrors(true);
        validateEmail(email);
        validatePassword(password)
        if (passwordError !== '' || emailError !== '') {
            return;
        }
        const result = await signIn(email, password);
        if(!result) {
            setLogInResult('User Not Found')
        } else {
            setLogInResult('Successfully Logged In!')
        }
    }

    const handleEmail = event => {
        let value = event.target.value
        setEmail(value);
        validateEmail(value)
    }

    

    const validateEmail = email => {
        if (email === '') {
            setEmailError('Please Enter Email Address');
            return;
        }
        const validationRe = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        if (!validationRe.test(email)) {
            setEmailError('Must Be Valid Email Format');
        }else {
            setEmailError('')
        }
    }

    const handlePassword = event => {
        let value = event.target.value;
        setPassword(value);
        validatePassword(value)
    }

    const validatePassword = password => {
        if (password === '') {
            setPasswordError('Please Enter Password')
        } else {
            setPasswordError('');
        }
    }

    return (
        <div className='input-form' >
            <h1>Login</h1>
            {
                logInResult !== '' &&
                <h2>
                    {logInResult}
                </h2>
            }
            <label>
                Email:
            </label>
            {displayErrors &&
                <div id='emailError'>{emailError}</div>
            }
            <input value={email} onChange={handleEmail} className='text-input' type='text' placeholder='Email' />

            <label >
                Password:
            </label>
            {displayErrors && 
                <div id='passwordError'>{passwordError}</div>
            }
            <input value={password} onChange={handlePassword} className='text-input' type='password' placeholder='Password' />
            <button  onClick={() => logInUser()} className='submit-button'>Sign In</button>
        </div>
    )

}

export default Login;