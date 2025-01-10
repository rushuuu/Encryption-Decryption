# **Encrytion/Decryption Microservice**

This microservice provides user management functionality, including adding, retrieving, filtering, and deleting users. It follows clean coding principles, modular design, and best practices for Node.js and Sequelize with MySQL.



## **Features**
- **Add User:** Create a new user with name, email, and role (Admin, Editor, Viewer).
- **Fetch All Users:** Retrieve all users, with optional role-based filtering.
- **Delete User:** Remove a user by their unique ID.


## **Setup and Run**

### **1. Prerequisites**
- Node.js (v16 or later)
- Docker

### **2. Clone Repository**
```bash
git clone https://github.com/rushuuu/Encryption-Decryption
cd NODEJS-OS
```

### **3. Configure Environment**
Create a `.env` file in the root directory:
```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=<your-password>
DB_NAME=user_management
DB_PORT=3306
PORT=3000
```

### **4. Start the Application**
Using Docker:
```bash
docker-compose up --build
```

### **5. Access the API**
- Base URL: `http://localhost:3000`
- Example Endpoints:
  - `POST /api/users` - Add a user
  - `GET /api/users` - Fetch all users
  - `GET /api/users?role=Admin` - Fetch users with a particular role
  - `DELETE /api/users?id=<userId>` - Delete a user


## **Project Structure**

```
.env
.gitignore
app.js
config/
  database.js
controllers/
  userController.js
docker-compose.yml
Dockerfile
models/
  user.js
package.json
private_key.pem
public_key.pem
readme.md
routes/
  userRoutes.js
services/
  userService.js
tests/
  userModule.test.js
utils/
  encryption.js
  rsaMethod.js
  pgpMethod.js
```

### **File Descriptions**

- **app.js**: Entry point of the application. Sets up the Express server and routes.
- **config/database.js**: Configures and initializes the Sequelize connection to the MySQL database.
- **controllers/userController.js**: Handles user-related HTTP requests and responses.
- **docker-compose.yml**: Docker Compose configuration for setting up the application and MySQL database.
- **Dockerfile**: Dockerfile for building the application image.
- **models/user.js**: Defines the User model and its hooks for encryption and decryption.
- **routes/userRoutes.js**: Defines the routes for user-related operations.
- **services/userService.js**: Contains business logic for user operations.
- **tests/userModule.test.js**: Test suite for the User Management API using Jest and Supertest.
- **utils/encryption.js**: Utility functions for encrypting and decrypting user data.
- **.gitignore**: Specifies files and directories to be ignored by Git.
- **package.json**: Contains metadata about the project and its dependencies.
- **readme.md**: Documentation for the project.

## **Working Mechanism**

### **1. Adding a User**
- The client sends a `POST` request to `/api/users` with user details.
- The `userController` validates the input and calls `userService` to add the user.
- The `userService` encrypts the user data using RSA encryption and stores it in the database.

### **2. Fetching Users**
- The client sends a `GET` request to `/api/users`.
- The `userController` calls `userService` to fetch users.
- The `userService` retrieves encrypted user data from the database, decrypts it, and returns it to the client.

### **3. Deleting a User**
- The client sends a `DELETE` request to `/api/users?id=<userId>`.
- The `userController` calls `userService` to delete the user by ID.



## **Data Encryption and Decryption**

### **Algorithm**
- **RSA Encryption**: The application uses RSA encryption for securing user data. RSA is an asymmetric cryptographic algorithm that uses a pair of keys: a public key for encryption and a private key for decryption.

### **Process**
- **Encryption**: When adding a user, the `userService` uses the public key (`public_key.pem`) to encrypt the user's name, email, and role before storing it in the database.
- **Decryption**: When fetching users, the `userService` uses the private key (`private_key.pem`) to decrypt the user data retrieved from the database.

### **Encryption Utility**
- The `utils/encryption.js` file contains functions for encrypting and decrypting data using the RSA algorithm.

## **Comparison: RSA vs PGP**

| Feature                | RSA Encryption                          | PGP Encryption                          |
|------------------------|-----------------------------------------|-----------------------------------------|
| **Algorithm Type**     | Asymmetric                              | Hybrid (combines symmetric and asymmetric) |
| **Key Pair**           | Public and Private Key                  | Public and Private Key                  |
| **Encryption Speed**   | Slower due to asymmetric nature         | Faster due to symmetric encryption for data |
| **Data Size**          | Limited to small data sizes             | Can handle larger data sizes            |
| **Use Case**           | Secure key exchange, digital signatures | Secure email communication, file encryption |
| **Complexity**         | Simpler, uses only asymmetric keys      | More complex, uses both symmetric and asymmetric keys |

---

## **Testing**
Run test cases with Jest:
```bash
npm run test
```


## **Security**
- **Encryption**: User data (name, email, role) is encrypted before being stored in the database and decrypted when retrieved. Encryption is handled using RSA keys stored in `public_key.pem` and `private_key.pem`.


## **Environment Variables**
- **DB_HOST**: Database host.
- **DB_USER**: Database user.
- **DB_PASSWORD**: Database password.
- **DB_NAME**: Database name.
- **DB_PORT**: Database port.
- **PORT**: Application port.


## **Dependencies**
- **body-parser**: Middleware for parsing request bodies.
- **crypto**: Node.js built-in module for cryptographic functions.
- **dotenv**: Loads environment variables from a `.env` file.
- **express**: Web framework for Node.js.
- **joi**: Data validation library.
- **mysql2**: MySQL client for Node.js.
- **sequelize**: ORM for Node.js.
- **jest**: Testing framework.
- **nodemon**: Utility for automatically restarting the server during development.
- **supertest**: HTTP assertions for testing.

## **Acknowledgements**
Code completion, minor bug fixes, and comments documentation were assisted by GitHub Copilot.