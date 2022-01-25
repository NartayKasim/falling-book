import classes from "./Book.module.css";
import Cover from "./cover/Cover";
import Authors from "./authors/Authors";
import Description from "./description/Description";
import Rating from "./ratings/Rating";
import { useFormatWithUserBooks } from "../../app/hooks";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { updateUserBooks } from "../../services/librarySlice";

export default function Book({ searchResult }) {
   const isLoggedIn = useSelector((state) => state.library.isLoggedIn);
   const formatResult = useFormatWithUserBooks(searchResult);
   const [book, setBook] = useState(formatResult);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const onBookTitleClick = () => {
      dispatch(updateUserBooks(book));
      navigate(
         `/book/?author=${book.author.replaceAll(
            " ",
            "+"
         )}&title=${book.title.replaceAll(" ", "+")}`
      );
   };

   return (
      <>
         <div className={classes.bookWrapper}>
            <div className={classes.bookHeader}>
               <div
                  className={classes.titleWrapper}
                  onClick={() => onBookTitleClick()}
               >
                  {book.title}
               </div>
               <div className={classes.authorsWrapper}>
                  <Authors authors={book.volume_info.authors} />
               </div>
            </div>
            <div className={classes.bookBody}>
               <div className={classes.bookBodyLeft}>
                  <Cover
                     imageLinks={book.volume_info.imageLinks}
                     size={"small"}
                  />
               </div>
               <div className={classes.bookBodyRight}>
                  <div className={classes.ratingsWrapper}>
                     <Rating
                        average_rating={book.average_rating}
                        rating_count={book.rating_count}
                     />
                     {isLoggedIn && (
                        <Rating isActive={true} book={book} setBook={setBook} />
                     )}
                  </div>
                  <div className={classes.descriptionWrapper}>
                     <Description description={book.volume_info.description} />
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}
