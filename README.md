# Falling Book
### A social book search, review, and rating aggregator with custom booklist-making functionality.

[LIVE SITE](https://www.fallingbook.com)

## Stack:
- React
- Express
- PostgreSQL

## Relevant Miscellaneous Technologies:
- Redux Toolkit (state management)
- FramerMotion (animation / transitions)

## Premise: 
The most popular go-to website for book lovers is GoodReads. 

In addition to its useful booklist-creation functionality, GoodReads catalogues books and allows users to review and rate books they've read.

My initial plan was to create a clone, piggy-backing off of the Goodreads API, but, I was about a year too late, as GoodReads stopped issuing API keys about a year before I set off on this project. 

**I didn't want to start from scratch and create my own book database. Starting out with an empty books table would mean that I would need to code book-adding functionality to for the users and, since this is a portfolio projet, there were no users available, anyway. After trying several premium and free book databases, I decided on a kind of hybrid book db, augmented by the GoogleBooks API (elaboration below).**

## MVP / full functionality break-down:
1. GoogleBooks API functionality for book searches.
2. User creation.
3. User book rating.
4. User book review composition.
5. Custom booklist creation.
6. When a GoogleBooks search result is either rated, reviewed, or added to a user-created booklist, that result gets saved unto the appropriate table. Form then on, Any time that book turns up as a search result, the information related to it is now retrieved from the db, instead of GoogleBooks.

