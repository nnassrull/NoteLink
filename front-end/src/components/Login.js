import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("login successful");

    const user = {
      email: email,
      password: password,
    };

    onLogin(user);

    // Redirect to /tasks after login
    navigate("/tasks");
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // };

  const handleSignup = () => {
    //Redirect to /signup when sign up button is clicked
    navigate("signup");
  };

  return (
    <section className="login-page">
      <form className="login-container" onSubmit={handleSubmit}>
        <input
          type="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="signup-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <span>Don't have an account? Sign up</span>
      <button className="sign-up-btn" onClick={handleSignup}>
        Sign up
      </button>
    </section>
  );
};

export default Login;
