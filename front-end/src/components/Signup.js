import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

  return (
    <section className="signup-page">
      <form className="signup-container" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
};

export default SignUp;
