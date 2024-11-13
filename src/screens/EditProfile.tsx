import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditProfile: React.FC = () => {
    const navigate = useNavigate();
    const [focus, setFocus] = useState({
        username: false,
        password: false,
        confirmPassword: false,
    });

    const handleFocus = (field: string) => {
        setFocus({ ...focus, [field]: true });
    };

    const handleBlur = (field: string) => {
        if ((document.getElementById(field) as HTMLInputElement).value === "") {
            setFocus({ ...focus, [field]: false });
        }
    };

    const labelStyle = (focused: boolean): React.CSSProperties => ({
        position: 'absolute',
        top: focused ? '-20px' : '50%',
        left: '10px',
        transform: focused ? 'translateY(0)' : 'translateY(-50%)',
        color: focused ? 'red' : '#aaa',
        fontSize: focused ? '12px' : 'inherit',
        pointerEvents: 'none' as 'none',
        fontWeight: focused ? 'bold' : 'normal',
        transition: 'all 0.3s',
    });

    const inputStyle = (focused: boolean): React.CSSProperties => ({
        borderColor: focused ? 'red' : '#ccc',
        backgroundColor: '#f0f0f0',
        transition: 'border-color 0.3s, background-color 0.3s',
    });

    return (
        <div className='home-container'>
            <div className="edit-profile">
                <div className='edit-profile-left'>
                    <div className="edit-profile-input" style={{ position: 'relative', marginBottom: '20px', width: '250px' }}>
                        <label 
                            htmlFor="username" 
                            style={labelStyle(focus.username)}
                        >
                            New Username:
                        </label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            required 
                            onFocus={() => handleFocus('username')}
                            onBlur={() => handleBlur('username')}
                            style={inputStyle(focus.username)}
                        />
                    </div>
                    <div className="edit-profile-input" style={{ position: 'relative', marginBottom: '20px', width: '250px' }}>
                        <label 
                            htmlFor="password" 
                            style={labelStyle(focus.password)}
                        >
                            New Password:
                        </label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            required 
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            style={inputStyle(focus.password)}
                        />
                    </div>
                    <div className="edit-profile-input" style={{ position: 'relative', marginBottom: '20px', width: '250px' }}>
                        <label 
                            htmlFor="confirm_password" 
                            style={labelStyle(focus.confirmPassword)}
                        >
                            Confirm New Password:
                        </label>
                        <input 
                            type="password" 
                            id="confirm_password" 
                            name="confirm_password" 
                            required 
                            onFocus={() => handleFocus('confirmPassword')}
                            onBlur={() => handleBlur('confirmPassword')}
                            style={inputStyle(focus.confirmPassword)}
                        />
                    </div>
                    <button className='green-button'>Save new Details</button>
                </div>
                <div className='edit-profile-right'>
                    <button className='red-small-button'
                        onClick={() => navigate('/user/home')}
                    >Back</button>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;
