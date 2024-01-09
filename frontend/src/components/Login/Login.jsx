import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import Button from '../Button/Button';
import baseUrl from '../../../util/baseUrl';

const Login = () => {
    // For login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

// Sets page title
useEffect(() => {
        document.title = 'Login';
    }, []);

//Logs user in
const handleLoginSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ email: email, password: password })
    });
    if (response.status === 200) {
      // GOOD NEWS.
        console.log("login successful");
        let data = await response.json();
        console.log(data)
        window.localStorage.setItem("token", data.token);
        window.localStorage.setItem("userId", data.userId);
        window.localStorage.setItem("username", data.username);
        navigate('/');
    } else {
      // BAD NEWS.
        setErrorMessage("Email or Password incorrect, please try again")
    }
}

// For login
const handleEmailChange = (event) => {
    setEmail(event.target.value)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}

    return (
    <>
        {/* This is the login form */}
        <div className="form-container sign-in-container">
            <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <input id="login-email" type="email" placeholder="Email" value={ email } onChange={handleEmailChange} />
            <input id="login-password" type="password" placeholder="Password" value={ password } onChange={handlePasswordChange} />
            {errorMessage && (
            <div className="error-message">

                <p>{errorMessage}</p>
            </div>
            )}

            <Button 
            id="login-submit" 
            type="submit"
            ariaLabel="Login"
            className="btn">
                Login
            </Button>
            </form>
        </div>
        </>
);
};

export default Login;