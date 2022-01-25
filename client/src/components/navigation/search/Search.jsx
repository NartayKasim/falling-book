import { useNavigate } from "react-router";
import { useState } from "react";

import searchIcon from "../../../assets/search.png";

import classes from "./Search.module.css";

export default function Search() {
   const [searchInput, setSearchInput] = useState("");
   const navigate = useNavigate();

   const onSearchClick = () => {
      if (searchInput.length > 0) {
         navigate(`/search?=${searchInput}`);
      }
   };

   return (
      <div className={classes.searchWrapper}>
         <input
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search for titles or authors..."
            type="text"
            className={classes.searchInput}
         />
         <button
            className={classes.searchButton}
            onClick={() => onSearchClick()}
         >
            <img src={searchIcon} className={classes.searchIcon} alt="" />
         </button>
      </div>
   );
}
