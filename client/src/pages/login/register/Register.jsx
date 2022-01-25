import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { getUserBooks, toggleIsLoggedIn } from "../../../services/librarySlice";
import classes from "./Register.module.css";
import accountIcon from "../../../assets/account.png";
import emailIcon from "../../../assets/email.png";
import passwordIcon from "../../../assets/password.png";
import Button from "../../../components/common/button/Button";
import axios from "axios";

export default function Register() {
   const [email, setEmail] = useState("");
   const [displayName, setDisplayName] = useState("");
   const [password, setPassword] = useState("");
   const [verifyPassword, setVerifyPassword] = useState("");
   const [errorState, setErrorState] = useState("");

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onRegisterClick = async () => {
      setErrorState("");
      if (password !== verifyPassword) {
         return setErrorState("Password and verify password fields mismatch.");
      } else if (
         password.length === 0 ||
         verifyPassword.length === 0 ||
         displayName.length === 0 ||
         email.length === 0
      ) {
         return setErrorState("Please enter a value for all required fields.");
      }

      const user = {
         displayName,
         email,
         password,
      };

      try {
         await axios.post("/api/auth/register", { user });
         dispatch(getUserBooks());
         dispatch(toggleIsLoggedIn());
         navigate("/library");
      } catch (e) {
         setErrorState(e.response?.data);
      }
   };

   return (
      <div className={classes.registerWrapper}>
         <div className={classes.registerBody}>
            <div className={classes.labels}>Display Name</div>

            <div className={classes.inputWrapper}>
               <img className={classes.inputIcon} src={accountIcon} alt="" />
               <input
                  onChange={(e) => setDisplayName(e.target.value)}
                  className={classes.input}
                  type="text"
               />
            </div>
            <div className={classes.labels}>Email</div>

            <div className={classes.inputWrapper}>
               <img className={classes.inputIcon} src={emailIcon} alt="" />
               <input
                  onChange={(e) => setEmail(e.target.value)}
                  className={classes.input}
                  type="text"
               />
            </div>
            <div className={classes.labels}>Password</div>

            <div className={classes.inputWrapper}>
               <img className={classes.inputIcon} src={passwordIcon} alt="" />
               <input
                  onChange={(e) => setPassword(e.target.value)}
                  className={classes.input}
                  type="text"
               />
            </div>
            <div className={classes.labels}>Verify Password</div>

            <div className={classes.inputWrapper}>
               <img className={classes.inputIcon} src={passwordIcon} alt="" />
               <input
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  className={classes.input}
                  type="text"
               />
            </div>
            <div className={classes.errors}>{errorState}</div>
         </div>
         <div className={classes.registerButtons}>
            <Button onClickFunc={onRegisterClick}>Sign Up</Button>
         </div>
      </div>
   );
}
