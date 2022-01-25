import BooklistFooter from "./footer/BooklistFooter";
import BooklistItem from "./item/BooklistItem";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { updateBooklistName, purgeNonUser } from "../../services/librarySlice";

import classes from "./Booklist.module.css";

export default function Booklist({ booklistObj, getBooklistTitles }) {
   const [books, setBooks] = useState(null);
   const [editTitle, setEditTitle] = useState(false);
   const navigate = useNavigate();

   const userBooks = useSelector((state) => state.library.userBooks);
   const dispatch = useDispatch();

   useEffect(() => {
      if (books === null) {
         dispatch(purgeNonUser());
         setBooks(
            userBooks.filter(
               (book) =>
                  book.booklists &&
                  book.booklists.includes(booklistObj.booklist_title)
            )
         );
      }
   }, [dispatch, booklistObj.booklist_title, userBooks, books]);

   const onBooklistRenameClick = async (newBooklistTitle) => {
      if (
         newBooklistTitle !== booklistObj.booklist_title &&
         newBooklistTitle.length > 0 &&
         newBooklistTitle !== "Read Books"
      ) {
         await axios.put("/api/library/booklist/rename", {
            booklist_id: booklistObj.booklist_id,
            booklistTitle: newBooklistTitle,
         });
         dispatch(
            updateBooklistName({
               oldName: booklistObj.booklist_title,
               newName: newBooklistTitle,
            })
         );
         getBooklistTitles();
      }
      setEditTitle(false);
   };

   const onBooklistDeleteClick = async () => {
      await axios.post("/api/library/booklist/delete", {
         booklistTitle: booklistObj.booklist_title,
      });
      dispatch(
         updateBooklistName({
            type: "delete",
            oldName: booklistObj.booklist_title,
         })
      );

      getBooklistTitles();
   };

   const onExpandEditClick = async () => {
      navigate(
         `/booklist/?id=${booklistObj.booklist_id}&title=${booklistObj.booklist_title}`
      );
   };

   return (
      <>
         {books !== null && (
            <div className={classes.booklist}>
               <div className={classes.body}>
                  {books &&
                     books.map((book) => (
                        <BooklistItem book={book} key={uuidv4()} />
                     ))}
               </div>

               <BooklistFooter
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  onBooklistRenameClick={onBooklistRenameClick}
                  books={books}
                  booklistObj={booklistObj}
                  onBooklistDeleteClick={onBooklistDeleteClick}
                  onExpandEditClick={onExpandEditClick}
               />
            </div>
         )}
      </>
   );
}
