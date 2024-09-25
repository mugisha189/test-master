# Django and React Authentication with JWT and HTTP-Only Cookies

This project implements a user authentication system using Django and React. It includes user registration, login, logout, and fetching user data. Authentication is handled using JWT (JSON Web Tokens) and HTTP-only cookies for improved security. The application's frontend is styled using Bootstrap.

The project consists of two directories: 

- `client`: Contains the React application
- `server`: Contains the Django backend

## Installation

To run this project on your local machine, follow the steps below:

### Prerequisites

Ensure you have the following installed on your local machine:

- Python 3.8 or higher
- Node.js v14.15.0 or higher
- npm 6.14.9 or higher

### Setup

1. Clone the repository:
    ```
    git clone https://github.com/iwantcustomgift-lab/test.git
    ```
2. Change into the directory:
    ```
    cd test
    ```

### Server Setup

Follow these steps to set up the server:

1. **Navigate to the `server` directory:**
    ```bash
    cd server
    ```

2. **Create a SQLite database file:**
    - In the `server` directory, create a new file named `.dbsqlite3`. You can use the following command:
      ```bash
      touch db.sqlite3
      ```

3. **Create a `.env` file:**
    - In the same directory, create a new file named `.env`:
      ```bash
      touch .env
      ```

4. **Add the `INFURA_PROJECT_ID` to the `.env` file:**
    - Open the `.env` file in a text editor and add the following line, replacing `your_infura_project_id` with your actual Infura Project ID:
      ```env
      INFURA_PROJECT_ID=your_infura_project_id
      ```

5. **Install Django and other dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

6. **Run the server:**
    ```bash
    python manage.py runserver
    ```

### Client

1. Navigate to the `client` directory:
    ```
    cd ../client
    ```
2. Install all the dependencies:
    ```
    npm install
    ```
3. Run the client:
    ```
    npm start
    ```

Now, your application should be running at `localhost:3000`.

Note:
- The Django server should be running at the same time as the React application for the system to function properly.
- The application uses the email field instead of the username field for user identification.



