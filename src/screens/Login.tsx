import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginRequest } from "../store/auth/actions";
import { state as RootState } from "../store/rootReducer";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    email: string;
    password: string;
  }>({ email: "\t", password: "\t" });
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if (token) {
      navigate("/agree-terms");
    }
  }, [token]);

  useEffect(() => {
    if (error) {
      console.log("Error triggered: ", error);
      setShowError(true);
      setValidationErrors({ email: "", password: "" });

      const timer = setTimeout(() => {
        setShowError(false);
        setValidationErrors({ email: "\t", password: "\t" });
        console.log("Error cleared");
      }, 2000);

      // Cleanup timer
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = { email: "", password: "" };
    if (!email.trim() && !password.trim()) {
      errors.email = "Email and Password required";
    } else {
      if (!email.trim()) {
        errors.email = "Email is required";
      }
      if (!password.trim()) {
        errors.password = "Password is required";
      }
    }
    setValidationErrors(errors);

    setTimeout(() => setValidationErrors({ email: "\t", password: "\t" }), 2000);

    if (!errors.email && !errors.password) {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      dispatch(loginRequest(formData));
    }
  };

  return (
    <div className="main-container">
      <div className="flex-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <p>Version 2.025</p>
          {showError && <span className="auth-error">{error}</span>}
          {validationErrors.email && (
            <span className="auth-error">{validationErrors.email}</span>
          )}
          {validationErrors.password && (
            <span className="auth-error">{validationErrors.password}</span>
          )}
          <div className={`auth-input ${showError ? "auth-input-error" : ""}`}>
            <label
              className={isEmailFocused ? "label-focused" : "label-hidden"}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onFocus={() => setEmailFocused(true)}
              onChange={(e) => {
                setEmail(e.target.value);
                setValidationErrors({ ...validationErrors, email: "\t" });
              }}
            />
          </div>

          <div className={`auth-input ${showError ? "auth-input-error" : ""}`}>
            <label
              className={isPasswordFocused ? "label-focused" : "label-hidden"}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onFocus={() => setPasswordFocused(true)}
              onChange={(e) => {
                setPassword(e.target.value);
                setValidationErrors({ ...validationErrors, password: "\t" });
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="toggle-password"
            >
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </span>
          </div>

          <button
            type="submit"
            className={`signin-button ${showError ? "error-button" : ""}`}
          >
            {showError ? "" : "Sign in"}
          </button>

          <div className="link-container">
            <Link className="register-link" to="/register">
              Register
            </Link>
            <Link to='http://127.0.0.1:8000/password_reset/' className='forgot-pass-link'>Forgot password?</Link>
                    
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
