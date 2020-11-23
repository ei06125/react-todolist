import React, { useState } from 'react';

const RegisterPage = ({ setUserInfo }) => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const result = await fetch(`/api/auth/register`, {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        });
        console.log(result);
        const body = await result.json();
        console.log(body);
        setUserInfo(body);
    };

    return (
        <>
        <div id="add-comment-form">
            <h3>Register</h3>
            <label>
                Username:
                <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button onClick={() => handleRegister()}>Register</button>
        </div>
        </>
    );
}

export default RegisterPage;
