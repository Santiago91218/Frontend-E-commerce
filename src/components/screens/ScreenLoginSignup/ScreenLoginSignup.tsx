import styles from "./ScreenLoginSignup.module.css";

import user_icon from "./assets/person.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import { useState } from "react";

const ScreenLoginSignup = () => {

  const [action, setAction] = useState("Login")

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.text}>{action}</div>
          <div className={styles.underline}></div>
        </div>
        <div className={styles.inputs}>
          {action === "Login"?<div></div>:<div className={styles.input}>
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>}
          
          <div className={styles.input}>
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" />
          </div>
          <div className={styles.input}>
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" />
          </div>
        </div>
        {action === "Sign Up"?<div></div>:<div className={styles.forgot_password}>Lost Password? <span>Click Here!</span></div>}
        
        <div className={styles.submit_container}>
          <div className={action==="Login"? styles.submit_gray : styles.submit} onClick={()=>{setAction("Sign Up")}}>Sign Up</div>
          <div className={action==="Sign Up"? styles.submit_gray : styles.submit} onClick={()=>{setAction("Login")}}>Login</div>
        </div>
      </div>
    </>
  );
};

export default ScreenLoginSignup;
