import React, { useState, useEffect } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import "../../pages/Account/account.css";
import { useLiveItems } from "../../App";

function RegistrationForm() {
  const { setIsActive } = useLiveItems();
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3308/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleF_nameChange = (e) => {
    setF_name(e.target.value);
  };
  const handleL_nameChange = (e) => {
    setL_name(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      setPasswordError("Passwords do not match. Please try again");
    } else if (users.some((user) => user.email === email)) {
      setPasswordError("Email already registred");
      setPassword("");
      setPasswordCheck("");
    } else {
      setPasswordError("");
      try {
        const response = await fetch("http://localhost:3308/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ f_name, l_name, email, password }),
        });
        console.log(f_name, l_name, email, password);
        if (response.ok) {
          console.log("User registered successfully");
          alert("User registered successfully");
          setEmail("");
          setPassword("");
          setPasswordCheck("");
          setIsActive(true);
        } else {
          const data = await response.json();
          console.error("Error registering user:", data.error);
          setPasswordError("Error registering user");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        setPasswordError("Error registering user");
      }
    }
  };

  return (
    <div className="accountRegist">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="f_name"></label>
          <input
            type="text"
            id="f_name"
            placeholder="Enter your name"
            value={f_name}
            onChange={handleF_nameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="l_name"></label>
          <input
            type="text"
            id="l_name"
            placeholder="Enter your surname"
            value={l_name}
            onChange={handleL_nameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={handleTogglePasswordVisibility}
            >
              {showPassword ? <RiEyeLine /> : <RiEyeCloseLine />}
            </button>
          </div>
          <div className="password-input">
            <input
              type={showPassword2 ? "text" : "password"}
              id="password2"
              placeholder="Enter your password again"
              value={passwordCheck}
              onChange={handlePasswordCheckChange}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={handleTogglePasswordVisibility2}
            >
              {showPassword2 ? <RiEyeLine /> : <RiEyeCloseLine />}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
        <button type="submit" className="loginBtn">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;
