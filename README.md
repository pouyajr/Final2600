
# Pouya's Bookstore Project 

## Introduction
Welcome to the Pouya's Bookstore project. This application provides a platform for users to browse and purchase books online, offering a wide range of titles and genres.

## Features
- **User Accounts**: Separate roles for administrator, registered users, and guests with tailored and different functionalities.
- **Catalog Management**: Admins can add books to the catalog and view orders of customers.
- **Search and Filter**: Users can choose books and purchase them through the website through a variety of options.
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


## Admin View
To enter as an admin and add books for the users you can find the credentials of admin in the config file in the server directory folder


## Technologies Used

- **Node.js** and **Express.js**: For backend development.
- **MongoDB**: As the database for storing book and user data.
- **Bootstrap**: For front-end development and design.
- **jQuery**: Used to simplify HTML DOM tree traversal and manipulation, such as adding books as an admin.

## Requirements of Project 

All the below requirements that were mentiond in the project pdf file has been used

- **GUI Design Patterns**:  such as navigation bar, grid layout, card, responsive design, slider and modal window
- **Programming Design Patterns** : such as module, singleton and factory method that are mentiond in the comments 
- **MVC**: Used appropriate modules for each directory
- **AAA** : user, admin and guest view for the clients and the admin. In addition, the project can connect to either local or remote database and can see the log file (accountability) in MongoDB
- **Web APIs** : both client-side and server-side restful apis are used in this project and are commented in the files
- **MongoDB** : connection to both local and remote database and also the implementation of CRUD operations which are commented
- **Git VCS** : all the contributions are for one person (Mohammad Pouya Jafari) and all the notes and comments are either written in the commits or in the README file

## Contributers

- MohammadPouyaJafari

## Contributing

Contributions to the Bookstore project are welcome. Please fork the repository, make your changes, and submit a pull request for review.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.
