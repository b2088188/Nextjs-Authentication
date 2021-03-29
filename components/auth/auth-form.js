import { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./auth-form.module.css";
import { signIn } from "next-auth/client";

function AuthForm() {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (isLogin) {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    } else
      dispatch({
        type: "CREATE_USER_REQUESTED",
        payload: {
          data: {
            email,
            password,
          },
        },
      });
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
