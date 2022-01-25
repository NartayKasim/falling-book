import axios from "axios";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Booklist from "../../components/booklist/Booklist";
import classes from "./LibraryPage.module.css";

export default function LibraryPage() {
   const [booklists, setBooklists] = useState(null);

   const getBooklistTitles = async () => {
      const response = await axios.get("/api/library/booklist-names");
      setBooklists(response.data);
   };

   useEffect(() => {
      if (booklists === null) {
         getBooklistTitles();
      }
   }, [booklists]);

   return (
      <div className={classes.libraryPageWrapper}>
         <div className={classes.libraryPageHeader}>YOUR BOOKLISTS</div>
         {booklists &&
            booklists.map((booklistObj) => (
               <Booklist
                  key={uuidv4()}
                  booklistObj={booklistObj}
                  getBooklistTitles={getBooklistTitles}
               />
            ))}
      </div>
   );
}
