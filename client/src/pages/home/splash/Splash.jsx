import { motion, AnimatePresence } from "framer-motion";

import reviewSplash from "../../../assets/reviewSplash.png";
import searchSplash from "../../../assets/searchSplash.png";
import booklistSplash from "../../../assets/booklistSplash.png";

import classes from "./Splash.module.css";

const resolveBody = {
   initial: {
      opacity: 0,
   },
   animate: {
      opacity: 1,
      transition: { duration: 0.75, staggerChildren: 0.5 },
   },
   exit: {
      opacity: 0,
      transition: { duration: 0.75 },
   },
};

const moveUp = {
   initial: {
      y: "-60vh",
   },
   animate: {
      y: "9vh",
      transition: {
         delay: 0.75,
         duration: 1.5,
         ease: "easeInOut",
         type: "spring",
         stiffness: 25,
      },
   },
};

const moveDown = {
   initial: {
      y: "60vh",
   },
   animate: {
      y: "-5vh",
      transition: {
         delay: 0.75,
         duration: 1.5,
         ease: "easeInOut",
         type: "spring",
         stiffness: 25,
      },
   },
};

const resolveText = {
   initial: { opacity: 0 },
   animate: { opacity: 1, transition: { duration: 1 } },
};

export default function Splash() {
   return (
      <AnimatePresence>
         <motion.div
            variants={resolveBody}
            initial="initial"
            animate="animate"
            exit="exit"
            className={classes.body}
         >
            <div className={classes.bodyColumnLeft}>
               <div className={classes.bodyRow}>
                  <motion.div
                     variants={resolveText}
                     className={classes.bodyRowHeader}
                  >
                     Search
                  </motion.div>
                  <motion.div
                     variants={resolveText}
                     className={classes.bodyRowContent}
                  >
                     Search for books powered by Google Books Search API.
                  </motion.div>
               </div>

               <div className={classes.bodyRow}>
                  <motion.div
                     variants={moveUp}
                     initial="initial"
                     animate="animate"
                     className={classes.moveUp}
                  >
                     <img
                        src={reviewSplash}
                        className={classes.splash}
                        alt=""
                     />
                  </motion.div>
               </div>

               <div className={classes.bodyRow}>
                  <motion.div
                     variants={resolveText}
                     className={classes.bodyRowHeader}
                  >
                     Booklists
                  </motion.div>
                  <motion.div
                     variants={resolveText}
                     className={classes.bodyRowContent}
                  >
                     Keep your reading organized by adding books to custom
                     booklists.
                  </motion.div>
               </div>
               <div className={classes.bodyRow} />
            </div>
            <div className={classes.bodyColumnRight}>
               <div className={classes.bodyRow}>
                  <motion.div
                     variants={moveDown}
                     initial="initial"
                     animate="animate"
                     className={classes.moveDown}
                  >
                     <img
                        src={searchSplash}
                        className={classes.splash}
                        alt=""
                     />
                  </motion.div>
               </div>
               <div className={classes.bodyRow}>
                  <div className={classes.bodyRowHeader}>Rate & Review</div>
                  <div className={classes.bodyRowContent}>
                     Rate, discuss and review your favorites!
                  </div>
               </div>
               <div className={classes.bodyRow}>
                  <motion.div
                     variants={moveDown}
                     initial="initial"
                     animate="animate"
                     className={classes.moveDown}
                  >
                     <img
                        src={booklistSplash}
                        className={classes.splash}
                        alt=""
                     />
                  </motion.div>
               </div>
            </div>
         </motion.div>
      </AnimatePresence>
   );
}
