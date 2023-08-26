import React, { useState, useEffect } from "react";
import { RiEyeLine, RiEyeCloseLine } from "react-icons/ri";
import "../../pages/Account/account.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import emailjs from "emailjs-com";
import { useLiveItems } from "../../App";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [users, setUsers] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [isActiveReset, setIsActiveReset] = useState(false);
  const [isActiveResetForm, setIsActiveResetForm] = useState(false);
  const [emailPswReset, setEmailPswReset] = useState("");
  const [otp, setOtp] = useState("");
  const [userOtp, setUserOtp] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const { setIsLogged, setCurrentUser } = useLiveItems();

  const emailServiceId = "service_2jv32ww";
  const emailTemplateId = "template_k9bx5y9";
  const emailUserId = "x6Px43Exo_7uIlR9P";

  useEffect(() => {
    fetch("http://localhost:3308/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const handlePswResetEmailChange = (e) => {
    setEmailPswReset(e.target.value);
  };

  const handeleUserOtp = (e) => {
    setUserOtp(e.target.value);
  };
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleNewPasswordConfirmChange = (e) => {
    setNewPasswordConfirm(e.target.value);
  };

  let redirectToPage = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const user = users.find((user) => user.email === email);
  
    if (!user) {
      console.log("User not found");
      setPasswordError("User not found!");
      setPassword("");
      return;
    }
  
    bcrypt.compare(password, user.password, async (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return;
      }
  
      if (result) {
        console.log("Password match");
        setIsLogged(true);
        setCurrentUser(user);
        user?.role_id === 1 ? redirectToPage("/admin") : redirectToPage("/");
        setEmail("");
        setPassword("");
  
        try {
          const response = await fetch("http://localhost:3308/api/access-logs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id: user.id_user }),
          });
  
          if (response.ok) {
            console.log("Access log updated successfully");
          } else {
            console.error("Failed to update access log");
          }
        } catch (error) {
          console.error("Error updating access log:", error);
        }
      } else {
        console.log("Password does not match");
        setPasswordError("The password is incorrect");
        setPassword("");
      }
    });
  };
  
  function sendEmail() {
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setOtp(generatedOtp);
    console.log(generatedOtp);
    console.log(emailPswReset);
    emailjs
      .send(
        emailServiceId,
        emailTemplateId,
        {
          to_email: emailPswReset,
          to_name: "User",
          OTP: generatedOtp,
          message: "Hello, this is a test email!",
        },
        emailUserId
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  }

  const handlePasswordReset = () => {
    sendEmail();
    setIsActiveResetForm(true);
    setShowOtpForm(true);
    setDisableBtn(true);
    setRemainingTime(30);

    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);

    setTimeout(() => {
      setDisableBtn(false);
      clearInterval(interval);
    }, 30000);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === userOtp) {
      console.log("OTP matched");
      setUserOtp("");
      setPasswordError("");
      setShowOtpForm(false);
    } else {
      console.log("OTP does not match");
    }
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    const user = users.find((user) => user.email === emailPswReset);

    if (!user) {
      console.log("User not found");
      setPasswordError("User not found!");
      setEmailPswReset("");
      return;
    }
    if (newPassword !== newPasswordConfirm) {
      setPasswordError("Passwords do not match. Please try again");
    } else {
      fetch("http://localhost:3308/api/reset-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailPswReset,
          newPassword: newPassword,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Password updated successfully");
            setNewPassword("");
            setNewPasswordConfirm("");
            setIsActiveResetForm(false);
            setIsActiveReset(false);
            setPasswordError("");
          } else {
            console.error("Error updating password");
            setPasswordError("Error updating password");
          }
        })
        .catch((error) => {
          console.error("Error updating password:", error);
        });
    }
  };
  return (
    <div className="accountLogin">
      {showOtpForm === false && isActiveResetForm === false ? (
        <form onSubmit={handleSubmit}>
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
            {passwordError && <p className="error-message">{passwordError}</p>}
            <h4
              className="pswForget"
              onClick={() => setIsActiveReset(!isActiveReset)}
            >
              Did you forget your password?
            </h4>
          </div>

          <button type="submit" className="loginBtn">
            Login
          </button>
        </form>
      ) : showOtpForm ? (
        <form className="otpForm" onSubmit={handleOtpSubmit}>
          <label htmlFor="otp">Enter OTP</label>
          <input
            type="text"
            id="otp"
            placeholder="Enter OTP"
            value={userOtp}
            onChange={handeleUserOtp}
            required
          />
          <button type="submit" className="loginBtn">
            Submit
          </button>
        </form>
      ) : (
        // Resetting password form JSX code
        <form onSubmit={handleResetPasswordSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={handleNewPasswordChange}
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
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your new password"
                value={newPasswordConfirm}
                onChange={handleNewPasswordConfirmChange}
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
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <button type="submit" className="loginBtn">
            Reset Password
          </button>
        </form>
      )}
      <div className={`resetPswContainer ${isActiveReset ? "active" : ""}`}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="emailPswReset"
          placeholder="Enter your email"
          value={emailPswReset}
          onChange={handlePswResetEmailChange}
          required
        />
        <button
          onClick={handlePasswordReset}
          className="loginBtn"
          disabled={disableBtn}
        >
          Send
        </button>
        {disableBtn && <p>Resend OTP in {remainingTime} seconds</p>}
        <p>You shortly will recive a code to reset the password </p>
      </div>
    </div>
  );
}

export default LoginForm;
