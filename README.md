# Library Management Web Application

## System Overview
It is an application designed to manage library operations for librarians. It offers functionalities to:
+ Maintain Library Resources:
  - Librarians can create, update, delete (CRUD) information on Books (including stock levels).
  - Manage Member information (CRUD).
+ Manage Book Circulation:
  - Issue books to members.
  - Process book returns from members.
+ Search for Resources:
  - Search for Books by title and author.
+ Manage Fines:
  - Charge rental fees upon book return.
  - Track member outstanding debts and prevent borrowing if exceeding KES.500.

## Technologies used
+ Front-end: React JS + Bootstrap
* Back-end: Flask + Python
+ ORM: SQLAlchemy
- Db: MySQL

## Database Schema
1. Books:
  - id (INT, PRIMARY KEY): Unique identifier for the book.
  - title (VARCHAR(255)): Title of the book.
  - author (VARCHAR(255)): Author of the book.
  - isbn (VARCHAR(13), UNIQUE): International Standard Book Number.
  - description (TEXT): Description of the book.
  - publication_year (INT): Year the book was published.
  - genre (VARCHAR(50)): Genre of the book.
  - publisher (VARCHAR(255)): Publisher of the book.
  - quantity (INT): Total number of copies available.
  - available (INT): Number of copies currently available for borrowing.
2. Members:
  - id (INT, PRIMARY KEY): Unique identifier for the member.
  - name (VARCHAR(255)): Full name of the member.
  - contact_number (VARCHAR(20)): Phone number of the member.
  - email (VARCHAR(255), UNIQUE): Email address of the member.
  - address (TEXT): Address of the member.
  - outstanding_debt (DECIMAL(10,2)): Current outstanding balance for book rentals.
3. Transactions:
  - id (INT, PRIMARY KEY): Unique identifier for the transaction.
  - book_id (INT, FOREIGN KEY REFERENCES Books(id)): References the book involved in the transaction.
  - member_id (INT, FOREIGN KEY REFERENCES Members(id)): References the member involved in the transaction.
  - type (ENUM('issue', 'return')): Type of transaction (issue or return).
  - date (DATE): Date of the transaction.
  - rent_fee (DECIMAL(10,2)): Amount charged for the book rental (applicable only to issue transactions).
### Models Relationships
- A Book can have many Transactions, but each Transaction belongs to one Book.
- A Member can have many Transactions, but each Transaction belongs to one Member.


## System Screenshots
<img width="932" alt="m1" src="https://github.com/James-Njeru/LibraryManagementSystem/assets/56454626/8b032b94-ea27-496d-badb-91d611c49835">

<img width="200" alt="m2" src="https://github.com/James-Njeru/LibraryManagementSystem/assets/56454626/e33417ad-e327-4754-ae36-c66e913a4824">

<img width="875" alt="b1" src="https://github.com/James-Njeru/LibraryManagementSystem/assets/56454626/888d6ea0-aa76-4fc2-a55b-8211eff5bbdd">

<img width="935" alt="ib" src="https://github.com/James-Njeru/LibraryManagementSystem/assets/56454626/de0615f5-2960-4a50-84a4-cb90a1b7535c">

<img width="942" alt="Screenshot 2024-02-27 220318" src="https://github.com/James-Njeru/LibraryManagementSystem/assets/56454626/42a7c5d5-7431-42f3-93cf-91255b1f40a0">
