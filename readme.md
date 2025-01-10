### **User Management Microservice**

This microservice provides user management functionality, including adding, retrieving, filtering, and deleting users. It follows clean coding principles, modular design, and best practices for Node.js and Sequelize with MySQL.

---

### **Features**
- **Add User:** Create a new user with name, email, and role (Admin, Editor, Viewer).
- **Fetch All Users:** Retrieve all users, with optional role-based filtering.
- **Delete User:** Remove a user by their unique ID.

---

### **Setup and Run**

#### **1. Prerequisites**
- Node.js (v16 or later)
- Docker

#### **2. Clone Repository**
```bash
git clone https://github.com/dbtalaviya/assignment02
cd assignment02
```

#### **3. Configure Environment**
Create a `.env` file in the root directory:
```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=<your-password>
DB_NAME=user_management
DB_PORT=3306
PORT=3000
```

#### **4. Start the Application**
Using Docker:
```bash
docker-compose up --build
```

#### **5. Access the API**
- Base URL: `http://localhost:3000`
- Example Endpoints:
  - `POST /api/users` - Add a user
  - `GET /api/users` - Fetch all users
  - `GET /api/users?role=Admin` - Fetch users with particular role
  - `DELETE /api/users?id=<userId>` - Delete a user

---

### **Testing**
Run test cases with Jest:
```bash
npm run test
```
