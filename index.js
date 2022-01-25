const express = require("express");
const massive = require("massive");
const cookieSession = require("cookie-session");
const path = require("path");

const userController = require("./controllers/userController");
const libraryController = require("./controllers/libraryController");
const searchController = require("./controllers/searchController");

require("dotenv").config({ path: "./.env" });
const { SERVER_PORT, CONNECTION_STRING } = process.env;

const app = express();

app.use(express.json());
app.use(express.static(path.join("public")));

massive({
   connectionString: CONNECTION_STRING,
   ssl: {
      rejectUnauthorized: false,
   },
})
   .then((db) => {
      app.set("db", db);
      console.log("database connected");
   })
   .catch((err) => console.log(err));

app.use(
   cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      maxAge: 24 * 60 * 60 * 1000,
   })
);

const rejectUnauthorized = (req, res, next) => {
   if (!req.session.user) {
      return res.sendStatus(401);
   }
   next();
};

if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

app.get("/api/auth/get-session", userController.getSession);
app.post("/api/auth/login", userController.login);
app.delete("/api/auth/logout", userController.logout);
app.post("/api/auth/register", userController.register);

app.get("/api/search/:query", searchController.search);

app.get("/api/library", rejectUnauthorized, libraryController.getUserBooks);
app.post("/api/library/rate", rejectUnauthorized, libraryController.rateBook);
app.get("/api/library/get-reviews/:book_id", libraryController.getReviews);
app.post(
   "/api/library/review",
   rejectUnauthorized,
   libraryController.reviewBook
);
app.post(
   "/api/library/review/delete",
   rejectUnauthorized,
   libraryController.deleteReview
);

app.get(
   "/api/library/booklist/:booklist_name",
   libraryController.getBooklistId
);
app.get(
   "/api/library/booklist-names",
   rejectUnauthorized,
   libraryController.getBooklistNames
);
app.put(
   "/api/library/booklist-add",
   rejectUnauthorized,
   libraryController.addToBooklist
);
app.post(
   "/api/library/booklist-create",
   rejectUnauthorized,
   libraryController.createBooklist
);
app.post(
   "/api/library/booklist/remove",
   rejectUnauthorized,
   libraryController.removeFromBooklist
);
app.put(
   "/api/library/booklist/rename",
   rejectUnauthorized,
   libraryController.renameBooklist
);
app.post(
   "/api/library/booklist/delete",
   rejectUnauthorized,
   libraryController.deleteBooklist
);

app.use((req, res, next) => {
   res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(SERVER_PORT, () => console.log("Server Port: " + SERVER_PORT));
