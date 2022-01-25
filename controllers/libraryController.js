const createBookInstance = async (req, book) => {
   const db = req.app.get("db");
   const response = await db.library.book.create_book_instance([
      book.volume_info,
      book.title,
      book.author,
   ]);
   return response[0].book_id;
};

const toggleRead = async (req, user_id, book_id) => {
   const db = req.app.get("db");
   const read_id = await db.library.booklists.get_read([user_id]);
   if (read_id.length > 0) {
      const response = await db.library.booklists.add_book([
         book_id,
         read_id[0].booklist_id,
      ]);
      return response[0];
   } else {
      const response = await db.library.booklists.create_read([user_id]);
      const read_id = response[0].booklist_id;
      await db.library.booklists.add_book([book_id, read_id]);
   }
};

const getReviews = async (req, book_id, user_id) => {
   const db = req.app.get("db");
   const response = await db.library.book.get_book_reviews([book_id]);

   if (response.length > 0) {
      if (!user_id) {
         return response;
      } else {
         for (let i = 0; i < response.length; i++) {
            if (response[i].user_id === user_id) {
               response[i] = {
                  ...response[i],
                  isSessionUser: true,
               };
            }
         }
         return response;
      }
   } else {
      return [];
   }
};

const getBookcard = async (req, user_id, title, author) => {
   const db = req.app.get("db");
   if (user_id !== null) {
      const userBooks = await db.library.booklists.get_user_books([user_id]);
      const userBookMatch = userBooks.filter((book) => {
         if (book.title === title && book.author === author) {
            return book;
         }
      });
      if (userBookMatch[0]) {
         return userBookMatch[0];
      } else {
         const response = await db.library.book.get_bookcard([title, author]);
         if (response[0]) {
            return response[0];
         } else return {};
      }
   } else {
      const response = await db.library.book.get_bookcard([title, author]);
      if (response[0]) {
         return response[0];
      } else return {};
   }
};

module.exports = {
   getUserBooks: async (req, res) => {
      const db = req.app.get("db");
      const user_id = req.session.user.user_id;
      const userBooks = await db.library.booklists.get_user_books([user_id]);
      res.status(200).send(userBooks);
   },

   rateBook: async (req, res) => {
      const { book, rating } = req.body;
      const db = req.app.get("db");
      const user_id = req.session.user.user_id;

      if (book.book_id) {
         if (book.user_rating) {
            await db.library.book.update_rating([
               user_id,
               book.book_id,
               rating,
            ]);
         } else {
            await db.library.book.rate_book([user_id, book.book_id, rating]);
            await toggleRead(req, user_id, book.book_id);
         }
      } else {
         const book_id = await createBookInstance(req, book);
         await db.library.book.rate_book([user_id, book_id, rating]);
         await toggleRead(req, user_id, book_id);
      }

      const returnObj = await getBookcard(
         req,
         user_id,
         book.title,
         book.author
      );

      res.status(200).send(returnObj);
   },

   getReviews: async (req, res) => {
      const { book_id } = req.params;
      const user_id = req.session?.user?.user_id;
      const reviews = await getReviews(req, book_id, user_id || null);
      res.status(200).send(reviews);
   },

   reviewBook: async (req, res) => {
      const { book, review } = req.body;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");

      if (review.review_id) {
         await db.library.book.update_review([
            review.review_id,
            review.content,
         ]);
      } else {
         if (book.book_id) {
            await db.library.book.review_book([
               user_id,
               book.book_id,
               review.content,
            ]);
         } else {
            const book_id = await createBookInstance(req, book);
            await db.library.book.review_book([
               user_id,
               book_id,
               review.content,
            ]);
            const newBook = await getBookcard(
               req,
               user_id,
               book.title,
               book.author
            );
            const reviews = await getReviews(req, book_id, user_id);
            return res.status(200).send([reviews, newBook]);
         }
      }

      const reviews = await getReviews(req, book.book_id, user_id);

      res.status(200).send(reviews);
   },

   deleteReview: async (req, res) => {
      const { book, review_id } = req.body;
      const db = req.app.get("db");
      const user_id = req.session.user.user_id;
      await db.library.booklists.delete_review([review_id]);
      const returnObj = await getBookcard(
         req,
         user_id,
         book.title,
         book.author
      );
      res.status(200).send(returnObj);
   },

   getBooklistNames: async (req, res) => {
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");
      const response = await db.library.booklists.get_booklist_names([user_id]);
      const booklists = response[0].json_agg;
      res.status(200).send(booklists !== null ? booklists : []);
   },

   getBooklistId: async (req, res) => {
      const { booklist_name } = req.params;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");
      const response = await db.library.booklists.get_booklist_id([
         user_id,
         booklist_name,
      ]);
      const booklist_id = response[0].booklist_id;
      res.status(200).send({ booklist_id });
   },

   createBooklist: async (req, res) => {
      const { book, newBooklistName } = req.body;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");

      const response = await db.library.booklists.create_booklist([
         user_id,
         newBooklistName,
      ]);
      const booklist_id = response[0].booklist_id;

      if (!book.book_id) {
         const book_id = await createBookInstance(req, book);
         await db.library.booklists.add_to_booklist([book_id, booklist_id]);
      } else {
         await db.library.booklists.add_to_booklist([
            book.book_id,
            booklist_id,
         ]);
      }

      const returnObj = await getBookcard(
         req,
         user_id,
         book.title,
         book.author
      );

      res.status(200).send(returnObj);
   },

   addToBooklist: async (req, res) => {
      const { book, booklist_id } = req.body;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");

      if (book.book_id) {
         await db.library.booklists.add_to_booklist(book.book_id, booklist_id);
      } else {
         const book_id = await createBookInstance(req, book);
         await db.library.booklists.add_to_booklist(book_id, booklist_id);
      }

      const returnObj = await getBookcard(
         req,
         user_id,
         book.title,
         book.author
      );
      res.status(200).send(returnObj);
   },

   removeFromBooklist: async (req, res) => {
      const { book, booklistTitle } = req.body;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");
      const response = await db.library.booklists.get_booklist_id([
         user_id,
         booklistTitle,
      ]);
      const booklist_id = response[0].booklist_id;
      await db.library.booklists.remove_from_booklist([
         book.book_id,
         booklist_id,
      ]);
      res.sendStatus(200);
   },

   renameBooklist: async (req, res) => {
      const { booklist_id, booklistTitle } = req.body;
      const db = req.app.get("db");
      await db.library.booklists.rename_booklist([booklist_id, booklistTitle]);
      res.sendStatus(200);
   },

   deleteBooklist: async (req, res) => {
      const { booklistTitle } = req.body;
      const user_id = req.session.user.user_id;
      const db = req.app.get("db");
      await db.library.booklists.delete_booklist([user_id, booklistTitle]);
      res.sendStatus(200);
   },
};
