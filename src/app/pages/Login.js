import React, {useState, useCallback} from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from "../firebase";

const Login = ({setUserId}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();

  const login = useCallback(
    (e) => {
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
        .then(result => {
          setUserId(result.user.uid);
          history.push('/dashboard');
        })
        .catch(error => {
          setError("Error signing in with password and email!");
        }
      );
    },
    [email, password, history, setUserId],
  );

  const handleChange = useCallback((e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "input-email")
      setEmail(value);
    else if (name === "input-password")
      setPassword(value);
  }, []);

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={login}>
        <div className="input-item-wrapper">
          <label>Email</label>
          <input
            type="email"
            className="input"
            name="input-email"
            onChange={handleChange}
            value={email}
            required
          />
        </div>
        <div className="input-item-wrapper">
          <label>Password</label>
          <input
            type="password"
            className="input"
            name="input-password"
            onChange={handleChange}
            value={password}
            required
          />
        </div>
        <p className="error">{error}</p>
        <div className="input-submit-wrapper">
          <input
            type="submit"
            className="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  )
}

export default Login;