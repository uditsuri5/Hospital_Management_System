import { useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useLogin();

    const handleSubmit = () => {
        const validation = true;
        if (validation) {
            login({ email, password });
        }
        else {
            alert("Validation failed");
        }
    }

    return (
        <>
            <Navbar style={{ button: { display: 'none' } }} />
            <div className="auth-container">
                <div className="auth-box">
                    <label htmlFor="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={handleSubmit}>Login</button>
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                </div>
            </div>
        </>
    )
}

export default LoginPage;