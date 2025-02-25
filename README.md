# MERN Practice Project

## Index
- [Video Reference](https://youtu.be/O3BUHwfHf84?si=xXgrEQRNoWAOISHn)
- [MongoDB Documentation](https://www.mongodb.com/docs/atlas/)

## Project Description
This project is a **MERN** (MongoDB, Express, React, Node.js) stack application built from scratch by following a practice tutorial. The main goal is to learn and reinforce CRUD operations with MongoDB and Express, as well as basic front-end functionality with React. The code is hand-written while following the referenced video to understand each step of the MERN architecture.

Currently, the project demonstrates:
- A simple **Express** server to handle API requests.
- Integration with **MongoDB** for data storage (via **Mongoose**).
- A **React** front end to interact with the API.

## Technologies Used
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Node.js**: JavaScript runtime environment for the server side.
- **Express**: Framework for building RESTful APIs on Node.js.
- **React**: JavaScript library for building the user interface.
- **JavaScript (ES6+)**: Main programming language across the stack.

> **Note**: For detailed instructions on setting up and using MongoDB, refer to the [MongoDB Documentation](https://www.mongodb.com/docs/atlas/).

## Project Structure
The repository is divided into multiple folders for organizational clarity:

- `server` (or `backend`):
  - `models`: Contains Mongoose models representing database entities.
  - `routes` (or `controllers`): Defines the Express routes/endpoints for CRUD operations.
  - `config`: May contain database connection settings or environment configuration.
  - `server.js` (or `index.js`): Entry point for the Node.js server.

- `client` (or `frontend`):
  - `src`:
    - `components`: Contains React components (e.g., forms, tables, lists).
    - `pages`: Contains main application pages or views.
    - `App.js`: Root component that manages routing and global layout.
    - `index.js`: Entry point for the React application.

## Features
1. **Create**: Allows adding new data entries (e.g., user, post, product, etc.) in the database.
2. **Read**: Provides endpoints and UI components to retrieve and display data.
3. **Update**: Enables updating existing records directly from the front end.
4. **Delete**: Allows removing records from the database.

Depending on the tutorial or practice goals, these features may be adapted to specific data models and UI design. 

## Main Components (Example)
### 1. `model/User.js`
- Defines a `User` schema with fields like `name`, `email`, and `password`.
- Uses **Mongoose** to establish the schema and model.

### 2. `routes/userRoutes.js`
- Handles requests such as `GET /users`, `POST /users`, `PUT /users/:id`, and `DELETE /users/:id`.
- Communicates with the `User` model to perform database operations.

### 3. `server.js`
- Sets up the Node.js server using **Express**.
- Connects to MongoDB using **Mongoose**.
- Listens on a specified port (e.g., `localhost:5000`).

### 4. `client/src/App.js`
- Main React component that sets up **React Router** (if applicable).
- Renders different pages or components based on the URL path.

### 5. `client/src/components/UserForm.jsx`
- React component for creating or updating user data.
- Includes form fields and submission logic that calls the Express API.

## Testing the API
You can test the API endpoints with **Postman** or **Thunder Client**, or by making requests directly from the React application:

1. **Create a Record**  
   - **Method**: `POST`  
   - **URL**: `http://localhost:5000/users` (example)  
   - **Body (JSON)**:
     ```json
     {
       "name": "Alice",
       "email": "alice@example.com",
       "password": "securepassword"
     }
     ```
   - **Response**: Returns the newly created object.

2. **Read All Records**  
   - **Method**: `GET`  
   - **URL**: `http://localhost:5000/users`  
   - **Response**: Returns an array of user objects.

3. **Update a Record**  
   - **Method**: `PUT`  
   - **URL**: `http://localhost:5000/users/123` (where `123` is a user ID)  
   - **Body (JSON)**:
     ```json
     {
       "name": "Alice Updated"
     }
     ```
   - **Response**: Returns the updated user object.

4. **Delete a Record**  
   - **Method**: `DELETE`  
   - **URL**: `http://localhost:5000/users/123`  
   - **Response**: Returns a confirmation message or the deleted user object.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/docs/atlas/) account and/or local MongoDB server
- Basic familiarity with JavaScript and React

## Instructions to Run the Project
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   ```
2. **Install Dependencies**:
   - Server:
     ```bash
     cd server
     npm install
     ```
   - Client:
     ```bash
     cd client
     npm install
     ```
3. **Configure the Database**:
   - In `server/config` or `.env` file, add your MongoDB connection string.  
   - For detailed instructions, see the [MongoDB Documentation](https://www.mongodb.com/docs/atlas/).
4. **Run the Server**:
   ```bash
   cd server
   npm start
   ```
   By default, the server might run at `http://localhost:5000` (depending on your setup).
5. **Run the Client**:
   ```bash
   cd client
   npm start
   ```
   The React app typically runs at `http://localhost:3000`.

## Reference Video
This code was created while following the tutorial available at:  
[React Node.js MERN Stack Tutorial](https://youtu.be/O3BUHwfHf84?si=xXgrEQRNoWAOISHn)
