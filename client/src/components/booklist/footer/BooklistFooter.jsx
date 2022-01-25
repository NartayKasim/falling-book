import BooklistTitle from "../title/BooklistTitle";
import classes from "./BooklistFooter.module.css";

export default function BooklistFooter({
   editTitle,
   setEditTitle,
   onBooklistRenameClick,
   books,
   booklistObj,
   onBooklistDeleteClick,
   onExpandEditClick,
   editBooks,
}) {
   return (
      <div className={classes.booklistFooter}>
         <div className={classes.footerTop}>
            <BooklistTitle
               booklist_title={booklistObj.booklist_title}
               editTitle={editTitle}
               setEditTitle={setEditTitle}
               onBooklistRenameClick={onBooklistRenameClick}
            />
         </div>
         <div className={classes.footerBottom}>
            <div className={classes.bookCount}>
               Number of Books: {books.length}
            </div>
            {booklistObj.booklist_title !== "Read Books" && (
               <>
                  <div
                     className={classes.footerItem}
                     onClick={() => setEditTitle(!editTitle)}
                  >
                     Rename Booklist
                  </div>
                  <div
                     className={classes.footerItem}
                     onClick={() => onBooklistDeleteClick()}
                  >
                     Delete Booklist
                  </div>
                  {!editBooks && (
                     <div
                        className={classes.footerItem}
                        onClick={() => onExpandEditClick()}
                     >
                        Edit Books
                     </div>
                  )}
               </>
            )}
            {onExpandEditClick && (
               <div
                  className={classes.footerItem}
                  onClick={() => onExpandEditClick()}
               >
                  Expand Booklist
               </div>
            )}
         </div>
      </div>
   );
}
