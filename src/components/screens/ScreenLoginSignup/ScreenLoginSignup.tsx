import styles from "./ScreenLoginSignup.module.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { Lock, Mail, User } from "lucide-react";

const ScreenLoginSignup = () => {
  const [action, setAction] = useState("Login");

  return (
    <>
      <div className={styles.screenBackground}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.text}>{action}</div>
            <div className={styles.logo}>
              <img src={logo} alt="Logo" />
            </div>
          </div>

          <div className={styles.inputs}>
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className={styles.input}>
                <User />
                <input type="text" placeholder="Name" />
              </div>
            )}

            <div className={styles.input}>
              <Mail />
              <input type="email" placeholder="Email" />
            </div>

            <div className={styles.input}>
              <Lock />
              <input type="password" placeholder="Password" />
            </div>
            {action === "Login" ? (
              <div> </div>
            ) : (
              <div className={styles.input}>
                <Lock />
                <input type="password" placeholder="Confirm Password" />
              </div>
            )}
          </div>

          {action === "Sign Up" ? (
            <div></div>
          ) : (
            <div className={styles.forgot_password}>
              Lost Password? <span>Click Here!</span>
            </div>
          )}

          <div className={styles.submit_container}>
            <div
              className={
                action === "Login" ? styles.submit_gray : styles.submit
              }
              onClick={() => setAction("Sign Up")}
            >
              Sign Up
            </div>

            <div
              className={
                action === "Sign Up" ? styles.submit_gray : styles.submit
              }
              onClick={() => setAction("Login")}
            >
              Login
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenLoginSignup;
