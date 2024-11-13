import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'

const Welcome: React.FC = () => {
    const navigate = useNavigate()
    useEffect(() => {
        // Navigate back to the loading page after 2 seconds
        const timeout = setTimeout(() => {
            console.log("hello")
            // window.location.href = '/login';
            navigate('/login')
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className='main-container'>
            <div className='welcome-box'>
            <img src={logo} alt="Brevity Logo" style={{ width: '700px', height: '100px' }} />

                <h3>Welcome to Brevity 1.93</h3>
            </div>
        </div>
    );
}

export default Welcome;
