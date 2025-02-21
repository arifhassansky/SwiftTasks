# Task Management Application

## Short Description

This Task Management Application allows users to add, edit, delete, and reorder tasks using a drag-and-drop interface. Tasks are categorized into three sections: To-Do, In Progress, and Done. The app features real-time updates, authentication via Firebase, and a clean, responsive UI.

## Live Links

- **Live Link:** [https://swift-task-sky.netlify.app](#)

## Dependencies

### Frontend

```
@hello-pangea/dnd
@tailwindcss/vite
@tanstack/react-query
axios
firebase
localforage
match-sorter
moment
react
react-dom
react-icons
react-router-dom
react-toastify
tailwindcss
```

### Backend

```
express
cors
dotenv
mongoose
nodemon
```

## Installation Steps

### Frontend Setup

1. Clone the repository:
   ```sh
   git clone <https://github.com/arifhassansky/SwiftTasks.git>
   ```
2. Navigate to the project folder:
   ```sh
   cd client
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

### Backend Setup

1. Clone the backend repository:
   ```sh
   git clone <https://github.com/arifhassansky/SwiftTasks.git>
   ```
2. Navigate to the backend folder:
   ```sh
   cd server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Create a `.env` file and add your MongoDB URI and Firebase credentials.
5. Start the backend server:
   ```sh
   npm run dev
   ```

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Firebase Authentication
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **State Management:** React Query
- **Drag and Drop:** @hello-pangea/dnd
- **Real-time Updates:** WebSockets / MongoDB Change Streams
