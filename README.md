
# Bookstore Project

## Introduction
Welcome to the Bookstore project. This application provides a platform for users to browse and purchase books online, offering a wide range of titles and genres.

## Features
- **User Accounts**: Separate roles for administrator, registered users, and guests with tailored functionalities.
- **Catalog Management**: Admins can add books to the catalog.
- **Search and Filter**: Users can choose books and purchase them through the website.
- **Order Processing**: Registered users can place orders and track their status.

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd bookstore-project
   ```
3. Install the necessary dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   npm start
   ```
5. Open your web browser and navigate to `http://localhost:3000` to view the application.

## Directory Structure

- `controllers/`: Routing logic with files like `AdminController.js`, `UserController.js`, etc.
- `models/`: Data models including `book.js`, `order.js`, `user.js`, and `DB_Log.js`.
- `models/data/`: Contains JSON data files like `books.json`.
- `server/`: Server configuration, utility functions, middleware, and logs.
- `views/`: Front-end HTML written in EJS, CSS, and JavaScript files.

## Technologies Used

- **Node.js** and **Express.js**: For backend development.
- **MongoDB**: As the database for storing book and user data.
- **Bootstrap**: For front-end development and design.
- **jQuery**: Used to simplify HTML DOM tree traversal and manipulation, such as adding books as an admin.

## Contributing

Contributions to the Bookstore project are welcome. Please fork the repository, make your changes, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
