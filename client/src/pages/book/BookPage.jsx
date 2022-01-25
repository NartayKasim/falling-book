import { useSelector, useDispatch } from "react-redux";
import { withRouter } from "../../app/hocs";
import { purgeNonUser, updateUserBooks } from "../../services/librarySlice";
import { AnimatePresence, motion } from "framer-motion";

import classes from "./BookPage.module.css";

import Cover from "../../components/book/cover/Cover";
import Authors from "../../components/book/authors/Authors";
import Rating from "../../components/book/ratings/Rating";
import AddToBooklist from "../../components/book/booklist/AddToBooklist";
import Description from "../../components/book/description/Description";
import Reviews from "../../components/book/reviews/Reviews";

const leftOuterVariant = {
   hidden: {
      boxShadow: "none",
   },
   shown: {
      boxShadow: "var(--box-shadow--emboss)",
      transition: { delay: 0.2, duration: 0.5 },
   },
};

const leftInnerVariant = {
   hidden: {
      opacity: 0,
   },
   shown: {
      opacity: 1,
      transition: { delay: 0.7, duration: 0.25 },
   },
};

const useAcquireTargetBook = (author, title) => {
   const dispatch = useDispatch();
   const userBooks = useSelector((state) => state.library.userBooks);
   const filterUserBooks = userBooks.filter(
      (book) => book.author === author && book.title === title
   );

   if (filterUserBooks.length === 1) {
      return filterUserBooks[0];
   }
   dispatch(purgeNonUser("id"));
};

const BookPage = (props) => {
   const { author, title } = props;
   const book = useAcquireTargetBook(author, title);
   const dispatch = useDispatch();
   const isLoggedIn = useSelector((state) => state.library.isLoggedIn);

   const updateBook = (bookObj) => {
      dispatch(updateUserBooks(bookObj));
   };

   return (
      <div className={classes.bookPageWrapper}>
         <>
            {book && (
               <div className={classes.bookPage}>
                  <div className={classes.bookPageLeftWrapper}>
                     <AnimatePresence>
                        <motion.div
                           variants={leftOuterVariant}
                           initial="hidden"
                           animate="shown"
                           id={classes.disableShadow}
                           className={classes.bookPageLeft}
                        >
                           <motion.div
                              variants={leftInnerVariant}
                              initial="hidden"
                              animate="shown"
                              className={classes.bookPageLeftContent}
                           >
                              <div className={classes.coverWrapper}>
                                 <Cover
                                    imageLinks={
                                       book && book.volume_info.imageLinks
                                    }
                                    size={"large"}
                                 />
                              </div>
                              <div className={classes.titleWrapper}>
                                 {book.title}
                              </div>
                              <div className={classes.authorsWrapper}>
                                 <Authors
                                    authors={book && book.volume_info.authors}
                                 />
                              </div>

                              <div className={classes.ratingsWrapper}>
                                 <Rating
                                    average_rating={book.average_rating}
                                    rating_count={book.rating_count}
                                 />
                                 {isLoggedIn && (
                                    <Rating
                                       isActive={true}
                                       book={book}
                                       setBook={updateBook}
                                    />
                                 )}
                              </div>
                              {isLoggedIn && (
                                 <div className={classes.booklistsWrapper}>
                                    <AddToBooklist
                                       book={book && book}
                                       setBook={updateBook}
                                    />
                                 </div>
                              )}
                           </motion.div>
                        </motion.div>
                     </AnimatePresence>
                  </div>
                  <AnimatePresence>
                     <motion.div
                        variants={leftInnerVariant}
                        initial="hidden"
                        animate="shown"
                        className={classes.bookPageRight}
                     >
                        <Description
                           description={book.volume_info.description}
                        />
                        <div className={classes.bookPageRightSeparator}></div>
                        <div className={classes.reviewsWrapper}>
                           <Reviews book={book} updateBook={updateBook} />
                        </div>
                     </motion.div>
                  </AnimatePresence>
               </div>
            )}
         </>
      </div>
   );
};

export default withRouter(BookPage);
