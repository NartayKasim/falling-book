INSERT INTO library (volume_info, title, author) VALUES ($1, $2, $3) RETURNING book_id;