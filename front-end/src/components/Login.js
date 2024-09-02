import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [step, setStep] = useState("email");

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setIsFocused(false);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === "email") {
      if (email) {
        setStep("password");
      } else {
        alert("Please enter a valid email address.");
      }
    } else if (step === "password") {
      if (password) {
        console.log("Logging in with: ", { email, password });
        onLogin({ email: email, password: password });
        console.log("login successful");

        // Redirect to /tasks after login
        navigate("/tasks");
      } else {
        alert("Please enter your password. ");
      }
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };

  return (
    <section className="login-page">
      <div className="login-container">
        <h1>Sign in with NoteLink ID</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {step === "email" ? (
            <div className={`input-container ${isFocused ? "focused" : ""}`}>
              <label className="input-label">Email or Phone Number</label>
              <input
                type="email"
                value={email}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="arrow-button">
                →
              </button>
            </div>
          ) : (
            <div className={`input-container ${isFocused ? "focused" : ""}`}>
              <label className="input-label">Password</label>
              <input
                type="password"
                value={password}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="arrow-button">
                →
              </button>
            </div>
          )}
        </form>

        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <label>
            <input type="checkbox" />
            Keep me signed in
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Link to="https://google.com">Forgotten your password?</Link>
        </div>

        <div style={{ marginTop: "10px" }}>
          <Link to="/signup">Create NoteLink ID</Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
