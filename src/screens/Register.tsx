import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const apiUrl = import.meta.env.VITE_API_URL;

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ username: string; email: string; password: string; credentials: string }>({ username: '\t', email: '\t', password: '\t', credentials: '\t' });
    const [isUsernameFocused, setUsernameFocused] = useState(false);
    const [isEmailFocused, setEmailFocused] = useState(false);
    const [isPasswordFocused, setPasswordFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [errorVisible, setErrorVisible] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (errorVisible) {
            const timer = setTimeout(() => {
                setErrors({ username: '\t', email: '\t', password: '\t', credentials: '\t' });
                setErrorVisible(false);
            }, 2000);

            // Cleanup timer
            return () => clearTimeout(timer);
        }
    }, [errorVisible]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitting Registration Form");

        // Perform validation
        const error = { username: '', email: '', password: '', credentials: '' };
        if (!email.trim() && !password.trim() && !username.trim()) {
            error.email = "Email, Username and Password required";
            error.username = '\t';
            error.password = '\t';
            error.credentials = '\t';

        } else {
            if (!username.trim()) {
                error.username = 'Username is required';
                error.email = '\t';
            error.password = '\t';
            error.credentials = '\t';
            }
            if (!email.trim()) {
                error.email = 'Email is required';
                error.username = '\t';
            error.password = '\t';
            error.credentials = '\t';
            }
            if (!password.trim()) {
                error.password = 'Password is required';
                error.username = '\t';
            error.email = '\t';
            error.credentials = '\t';
            }
        }
        setErrors(error);

        if (error.username || error.email || error.password) {
            setErrorVisible(true);
        }

        // If there are no errors, you can proceed with form submission
        if (!error.username && !error.email && !error.password && !error.credentials) {
            try {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);

                const response = await fetch(`${apiUrl}/register_user`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                
                if (response.ok) {
                    console.log("User registered successfully:", data);
                    // Save the token to local storage
                    localStorage.setItem('token', data.token);
                    navigate('/agree-terms');
                } else {
                    console.error("Failed to register user:", data);
                    setErrors({ ...errors, credentials: data.message || 'Registration failed. Please try again.' });
                    setErrorVisible(true);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                setErrors({ ...errors, credentials: 'Registration failed. Please try again.' });
                setErrorVisible(true);
            }
        }
    };

    return (
        <div className='main-container'>
            <div className='flex-container'>
                <form className='auth-form' onSubmit={handleSubmit}>
                    <p>Version 2.025</p>
                    {errors.credentials && <span className="auth-error credentials-error">{errors.credentials}</span>}
                    {errors.username && <span className="auth-error">{errors.username}</span>}
                    {errors.email && <span className="auth-error">{errors.email}</span>}
                    {errors.password && <span className="auth-error">{errors.password}</span>}
                    <div className='auth-input'>
                        <label className={isUsernameFocused ? "label-focused" : "label-hidden"}>Username</label>
                        <input
                            type='text'
                            value={username}
                            placeholder='Username'
                            onFocus={() => setUsernameFocused(true)}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                setErrors({ ...errors, username: '\t', credentials: '\t' });
                            }}
                            style={{ backgroundColor: errorVisible && errors.username ? 'lightgrey' : 'white' }} // Change background color
                        />
                    </div>

                    <div className='auth-input'>
                        <label className={isEmailFocused ? "label-focused" : "label-hidden"}>Email</label>
                        <input
                            type='email'
                            value={email}
                            placeholder='Email'
                            onFocus={() => setEmailFocused(true)}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: '\t', credentials: '\t' });
                            }}
                            style={{ backgroundColor: errorVisible && errors.email ? 'lightgrey' : 'white' }} // Change background color
                        />
                    </div>

                    <div className='auth-input'>
                        <label className={isPasswordFocused ? "label-focused" : "label-hidden"}>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            value={password}
                            placeholder='Password'
                            onFocus={() => setPasswordFocused(true)}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: '\t', credentials: '\t' });
                            }}
                            style={{ backgroundColor: errorVisible && errors.password ? 'lightgrey' : 'white' }} // Change background color
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility state
                            className="toggle-password"
                        >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />} 
                        </span>
                    </div>

                    <button type="submit" className="signin-button">
                        Register
                    </button>

                    <Link className="login-link" to="/login">
                        Login
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;

