    import React from "react";
    import { useNavigate } from "react-router-dom";
    import Button from '@mui/material/Button';
    import "../App.css"


    const Welcome = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login"); 
    };

    const handleRegisterClick = () => {
        navigate("/register"); 
    };

    return (
        <div className="container">
        <div className="welcome-section">
            <h1>Welcome to the Employee Shift Planning System</h1>
        </div>

        <div className="button-section">
            <Button variant="contained" size="large" onClick={handleLoginClick}>
            Login
            </Button>
            <Button variant="contained" size="large" onClick={handleRegisterClick}>
            Register
            </Button>
        </div>
        </div>
    );
    };

    export default Welcome;
