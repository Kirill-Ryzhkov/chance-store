import React, { useState, useEffect } from "react";
import { useLoginMutation, useVerifyMutation } from "../../services/redux/apiSlice";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [login] = useLoginMutation();
    const [verify] = useVerifyMutation();

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get('token');
            if (token) {
                const result = await verify({ token });
                if (result?.data) {
                    navigate("/")
                } else {
                    Cookies.remove('token');
                }
            }
        }
        checkToken();
    }, [verify, navigate]);
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const result = await login({ email: username, password }).unwrap();
            if (result && result.token) {
                Cookies.set('token', result.token, { expires: 3 })
                navigate("/")
            }
        } catch (err) {
            console.error(err);
            setError("Wrong email or password");
        }
    };

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex justify-center">
            <div className="max-w-md w-full rounded-lg p-8">
                <h1 className="text-3xl regular-bold-font text-center mb-6">
                    Sign In
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <label className="block font-semibold mb-2">Login</label>
                    <input
                        type="text"
                        placeholder="Login"
                        className="w-full px-4 py-2 border rounded text-colorSecond focus:outline-none focus:ring-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    </div>
            
                    <div>
                    <label className="block font-semibold mb-2">Password</label>
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-2 border rounded text-colorSecond focus:outline-none focus:ring-2"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    </div>
            
                    {error && <p className="text-red-500 regular-not-bold-font text-sm">{error}</p>}
            
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-500 font-semibold rounded transition duration-200"
                    >
                    Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}