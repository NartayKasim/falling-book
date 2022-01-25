import Splash from "./splash/Splash";
import classes from "./HomePage.module.css";

const HomePage = () => {
   return (
      <div className={classes.homePageWrapper}>
         <Splash />
      </div>
   );
};

export default HomePage;
