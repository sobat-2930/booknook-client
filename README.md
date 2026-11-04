# BookNook – A Small Online Library

**Live site:** https://booknook-client-mauve.vercel.app

BookNook is a small online library. Add a book, borrow a book, return a book.

## Features

- Browse all books with live search and category filter
- Add books with a cover image uploaded to imgbb
- Borrow a book for 14 days, with live copy tracking and no double borrowing
- My Books page to edit or delete your own books, with a confirm modal
- My Borrows page to see and return borrowed books
- Email and Google login with BetterAuth, with private routes that survive page reload
- JWT-protected API with owner checks on edit and delete
- Dark and light theme, Framer Motion animations and a fully responsive layout

## Tech Stack

- Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui
- BetterAuth with MongoDB adapter
- Express.js and MongoDB (separate server repository)
- Swiper.js, Framer Motion
