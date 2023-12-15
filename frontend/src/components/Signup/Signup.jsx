import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Signup.css"
import Button from '../Button/Button';
import baseUrl from '../../../util/baseUrl';

const Signup = () => {
    // For Signup
    const [signUpPassword, setSignupPassword] = useState("");
    const [signUpEmail, setSignupEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [username, setuserName] = useState("");
    const [signupStatus, setsignupStatus] = useState('');

    const navigate = useNavigate()

// Sets page title
useEffect(() => {
        document.title = 'Sign Up';
    }, []);

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
    console.log("Signup successful");
    setsignupStatus("Thank you for joining us, we are logging you in. . .");
    setTimeout(() => {
        handleLogin(event);
    }, 2000);
    } else {
    setErrorMessage("An error has occured, please try again");
    }
}

const handleLogin = async (event) => {
    event.preventDefault();

    let response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
    },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword })
    });
    if (response.status === 200) {
      // GOOD NEWS.
        console.log("signup and login successful");
        let data = await response.json();
        window.localStorage.setItem("token", data.token);
        navigate('/');
    } else {
      // BAD NEWS.
        setsignupStatus("Email or Password incorrect, please try again")
    }
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
            <Button 
            id="sign-up-submit" 
            type="submit"
            ariaLabel="Login"
            className="btn">
                Sign Up
            </Button>
            </form>
        </div>

        </>
);
};

export default Signup;