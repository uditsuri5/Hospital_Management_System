import { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import useSignUp from "../hooks/useSignUp";

const SignUpPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signup} =useSignUp();

    const handleSubmit = () => {
        const validation = true;

        if (validation) {
        signup({name, email, password});
        }
        else{
            alert("Please fill all the fields");
        }
    }

    return (
        <>
            <Navbar style={{ button: { display: 'none' } }} />
            <div className="auth-container">
                <div className="auth-box">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSubmit}>Sign Up</button>
                    <Link to="/login">Already have an account? Login</Link>
                </div>
            </div>
        </>
    )

}

export default SignUpPage;