import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "../../app/hocs";
import { useNavigate } from "react-router";
import { toggleIsLoggedIn, clearBooklists } from "../../services/librarySlice";
import { clearBookState } from "../../services/volumeInfoSlice";

import homeIcon from "../../assets/home.png";
import settingsIcon from "../../assets/settings.png";
import libraryIcon from "../../assets/library.png";
import signUpIcon from "../../assets/signUp.png";
import loginIcon from "../../assets/login.png";
import logoutIcon from "../../assets/logout.png";

import classes from "./Navigation.module.css";
import Search from "./search/Search";

const Navigation = (props) => {
   const navigate = useNavigate();
   const location = props.location.pathname;
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state) => state.library.isLoggedIn);

   const onLogoutClick = () => {
      navigate("/");
      sessionStorage.removeItem("persist:root");
      axios.delete("/api/auth/logout");
      dispatch(toggleIsLoggedIn());
      dispatch(clearBookState());
      dispatch(clearBooklists([]));
   };

   return (
      <div className={classes.header}>
         <div className={classes.headerTop}>
            <div className={classes.logo}>Falling Book</div>
         </div>
         <div className={classes.navigationWrapper}>
            <Search />
            <div className={classes.navigation}>
               <div
                  className={classes.navLink}
                  id={
                     location === "/"
                        ? classes.currentLocation
                        : classes.default
                  }
                  onClick={() => navigate("/")}
               >
                  <img src={homeIcon} className={classes.icon} alt="" />
                  Home
               </div>
               {isLoggedIn && (
                  <div
                     className={classes.navLink}
                     id={
                        location === "/settings"
                           ? classes.currentLocation
                           : classes.default
                     }
                     onClick={() => navigate("/settings")}
                  >
                     <img src={settingsIcon} className={classes.icon} alt="" />
                     Settings
                  </div>
               )}
               {isLoggedIn && (
                  <div
                     className={classes.navLink}
                     id={
                        location === "/library"
                           ? classes.currentLocation
                           : classes.default
                     }
                     onClick={() => navigate("/library")}
                  >
                     <img src={libraryIcon} className={classes.icon} alt="" />
                     Library
                  </div>
               )}

               {!isLoggedIn && (
                  <div
                     className={`${classes.navLink} ${classes.signUp}`}
                     id={
                        location === "/login"
                           ? classes.currentLocation
                           : classes.default
                     }
                     onClick={() => navigate("/login")}
                  >
                     <img src={signUpIcon} className={classes.icon} alt="" />
                     Sign Up
                  </div>
               )}

               {!isLoggedIn && (
                  <div
                     className={classes.navLink}
                     id={
                        location === "/login"
                           ? classes.currentLocation
                           : classes.default
                     }
                     onClick={() => navigate("/login")}
                  >
                     <img src={loginIcon} className={classes.icon} alt="" />
                     Login
                  </div>
               )}

               {isLoggedIn && (
                  <div
                     className={classes.navLink}
                     onClick={() => onLogoutClick()}
                  >
                     <img src={logoutIcon} className={classes.icon} alt="" />
                     Logout
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default withRouter(Navigation);
