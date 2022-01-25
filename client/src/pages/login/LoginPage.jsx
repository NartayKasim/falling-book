import { useState } from "react";
import classes from "./LoginPage.module.css";
import Login from "./login/Login";
import Register from "./register/Register";

const LoginPage = () => {
   const [displayState, setDisplayState] = useState("login");

   return (
      <div className={classes.loginPageWrapper}>
         <div className={classes.loginInner}>
            <div className={classes.header}>
               <div
                  onClick={() => setDisplayState("login")}
                  className={
                     displayState === "login"
                        ? classes.selected
                        : classes.unselected
                  }
               >
                  Login
               </div>
               <div
                  onClick={() => setDisplayState("register")}
                  className={
                     displayState === "register"
                        ? classes.selected
                        : classes.unselected
                  }
               >
                  Sign Up
               </div>
            </div>
            <div className={classes.body}>
               {displayState === "login" ? <Login /> : <Register />}
            </div>
         </div>
      </div>
   );
};

export default LoginPage;
