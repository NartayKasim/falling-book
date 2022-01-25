import classes from "./Login.module.css";
import Button from "../../../components/common/button/Button";
import emailIcon from "../../../assets/email.png";
import passwordIcon from "../../../assets/password.png";

import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getUserBooks, toggleIsLoggedIn } from "../../../services/librarySlice";

export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorState, setErrorState] = useState("");

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const onLoginClick = async () => {
      if (email.length === 0 || password.length === 0) {
         return setErrorState("Please enter an email and password.");
      }
      try {
         await axios.post("/api/auth/login", {
            email,
            password,
         });
         dispatch(getUserBooks());
         dispatch(toggleIsLoggedIn());
         navigate("/library");
      } catch (e) {
         setErrorState(e.response.data);
      }
   };

   return (
      <div className={classes.loginWrapper}>
         <div className={classes.loginBody}>
            <div className={classes.labels}>Email</div>
            <div className={classes.inputWrapper}>
               <img className={classes.inputIcon} src={emailIcon} alt="" />
               <input
                  className={classes.input}
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className={classes.labels}>Password</div>
            <div className={classes.inputWrapper}>
               <img className={classes.inputIcon} src={passwordIcon} alt="" />
               <input
                  className={classes.input}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className={classes.errors}>{errorState || null}</div>
         </div>
         <div className={classes.loginButtons}>
            <Button onClickFunc={onLoginClick}>Login</Button>
         </div>
      </div>
   );
}
