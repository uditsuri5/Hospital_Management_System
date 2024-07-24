import { useNavigate } from "react-router-dom";

const useSignUp = () => {
    const navigate = useNavigate();

    const signup = async ({ name, email, password }) => {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/signup`, {
                method: "POST",
                body: JSON.stringify({ name, email, password }),
                headers: { "Content-Type": "application/json" }
            });

            // Check if the response is OK
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            // Attempt to parse JSON response
            const data = await res.json();
            console.log(data);

            if (data.status === "success") {
                navigate("/");
            } else {
                throw new Error(data.message || "Sign Up Failed");
            }
        } catch (error) {
            console.log(error.message);
            alert("Sign Up Failed: " + error.message);
        }
    };

    return { signup };
};

export default useSignUp;
