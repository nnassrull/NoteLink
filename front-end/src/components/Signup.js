import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState("");
  const navigate = useNavigate();

  const handleBlur = (e) => {
    if (e.target.value === "") {
      setStep("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sign up successful");

    try {
      const response = await axios.post(
        "/signup",
        {
          email: email,
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        console.log("user created");
        navigate("/login");
      }
    } catch (err) {
      console.log("Error creating user");
    }

    // Handle the sign-up logic here, e.g., sending data to your server

    // After sign-up, you might want to redirect to the login page or the tasks page
    navigate("/login"); // or navigate("/tasks");
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <section className="login-page">
      <div className="login-container">
        <h1>Create your NoteLink ID</h1>
        <p>One NoteLink ID is all you need to store all your notes. </p>
        <p>
          Already have a NoteLink ID ? <Link to="/login">Sign in</Link>
        </p>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="name-div">
            <div
              className={`input-container ${
                step === "first-name" ? "focused" : ""
              }`}
            >
              <label className="input-label">First Name</label>
              <input
                type="text"
                value={firstName}
                onBlur={handleBlur}
                onFocus={() => setStep("first-name")}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div
              className={`input-container ${
                step === "last-name" ? "focused" : ""
              }`}
            >
              <label className="input-label">Last Name</label>
              <input
                type="text"
                value={lastName}
                onBlur={handleBlur}
                onFocus={() => setStep("last-name")}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div
            className={`input-container ${step === "email" ? "focused" : ""}`}
          >
            <label className="input-label">Email</label>
            <input
              type="email"
              value={email}
              onBlur={handleBlur}
              onFocus={() => setStep("email")}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div
            className={`input-container ${
              step === "password" ? "focused" : ""
            }`}
          >
            <label className="input-label">Password</label>
            <input
              type="password"
              value={password}
              onBlur={handleBlur}
              onFocus={() => setStep("password")}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-container">
            <button type="submit" className="signup-btn">
              Sign Up
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
