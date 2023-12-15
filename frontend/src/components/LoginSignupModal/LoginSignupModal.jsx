import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./LoginSignupModal.css"
import baseUrl from '../../../util/baseUrl';

const LoginSignupModal = () => {
    // For login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // For Signup
    const [signUpPassword, setSignupPassword] = useState("");
    const [signUpEmail, setSignupEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setuserName] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
    const [signupStatus, setsignupStatus] = useState('');

    const navigate = useNavigate()

// Sets page title
useEffect(() => {
        document.title = 'Login or Sign Up';
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
    if (response.status === 201) {
      // GOOD NEWS.
        console.log("token");
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        navigate('/');
    } else {
      // BAD NEWS.
        setErrorMessage("Email or Password incorrect, please try again")
    }
}


//Signs user up
const handleSignUpSubmit = async (event) => {
    event.preventDefault();

    // Step 1: Sign Up
    let signUpResponse = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ firstName: firstName, lastName: lastName, email: signUpEmail, password: signUpPassword, username: username })
    });

    // Step 2: Log In
    if (signUpResponse.status === 201) {
    // GOOD NEWS.
    setsignupStatus("You have signed up succesfully, please login")
    } else {
    setErrorMessage("An error has occured, please try again")
    }
}

// For login
const handleEmailChange = (event) => {
    setEmail(event.target.value)
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value)
}

// For Signup
const handleSignupEmailChange = (event) => {
    setSignupEmail(event.target.value)
}

const handleSignupPasswordChange = (event) => {
    setSignupPassword(event.target.value)
}

const handleFirstNameChange = (event) => {
    setfirstName(event.target.value)
}

const handleLastNameChange = (event) => {
    setlastName(event.target.value)
}

const handleUserNameChange = (event) => {
    setuserName(event.target.value)
}

    return (
    <>
        <div className="form-container-sign-up-container">
            <form onSubmit={handleSignUpSubmit}>
            <h1 >Create Account</h1>
            <input id="first-name" type="text" placeholder="First Name" value={ firstName } onChange={handleFirstNameChange} />
            <input id="last-name" type="text" placeholder="Last Name" value={ lastName } onChange={handleLastNameChange} />
            <input id="user-name" type="text" placeholder="Username" value={ username } onChange={handleUserNameChange} />
            <input id="sign-up-email" type="email" placeholder="Email" value={ signUpEmail } onChange={handleSignupEmailChange} />
            <input id="sign-up-password" type="password" placeholder="Password" value={ signUpPassword } onChange={handleSignupPasswordChange} />
            {signupStatus && (
            <div className="error-message">

                <p >{signupStatus}</p>
            </div>
            )}
            <button id="sign-up-submit" type="submit">Sign Up</button>
            </form>
        </div>

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

            <button id="login-submit" type="submit">Login</button>
            </form>
        </div>
        </>
);
};

export default LoginSignupModal;