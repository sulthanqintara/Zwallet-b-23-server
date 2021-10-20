# **Zwallet Mobile - BACKEND**

Zwallet is a mobile application that is useful as an online wallet to help users save money online and can facilitate transactions with other users easily.

<br>

### **BUILT WITH**

---

- [Node.js (JavaScript Runtime)](https://nodejs.org/en/)
- [Express.js (Back-end Web Application Framework)](https://expressjs.com/)
- [MySQL (Database)](https://www.mysql.com/)
- [Multer (Upload Middleware)](https://www.npmjs.com/package/multer)
- [Socket.io (Realtime)](https://socket.io/docs/v4/server-installation/)
- [Nodemailer (OTP)](https://nodemailer.com/about/)

### **TOOLS**

---

- [Visual Studio Code](https://code.visualstudio.com/)
- [XAMPP](https://www.apachefriends.org/index.html)
- [Postman](https://www.postman.com/)

### **INSTALLATION**

---

STEP 1 : Add this folder in local computer

```
git clone <this repository>
```

STEP 2 : Install module & Package

```
yarn install
```

STEP 3 : Create ENV

```
DB_HOST = "HOST"
DB_USER = "USER"
DB_PASSWORD = ""
DB_DATABASE = "DATABASE"
SECRET_KEY = KEY
SECRET_PORT = PORT
```

### **HOW TO RUN**

---

You'll need to run

```
node index
```

The application will run on the designated port. Since we used the 8000 port to run the backend, it should run on [http://localhost:8000/](http://localhost:8000/).
<br>

### **AVAILABLE ROUTES**

---

link dokumentasi postman
There are four main routes, with each route stemming from the base route in this application.

- [("/")](http://localhost:8000/) is the base route.
- [("/auth")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#5abd0c28-d996-44fe-ae81-69a4087da3a1) is the route which handles anything related to authentication (Login, Register, Logout, Forgot Password).
- [("/users")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#43335b07-61ef-49f1-b64e-585049cb6a2b) handles requests involving user data, such as profile.
- [("/transactions")](https://documenter.getpostman.com/view/16864421/UV5WEJc9#7fafa750-5949-4a58-a228-ffa93edbdc54) manages requests related to the all transaction users.
  <br>

### **RELATED PROJECT(S)**

- [Zwallet Front-end](https://github.com/sulthanqintara/Zwallet-b-23-client)

### **CONTRIBUTORS**

- [Akbar Ramadhan](https://github.com/akbrrmdhn)
- [Berlian Gymnastiar](https://github.com/Berliangymnastiar)
- [Candra Sidik Dermawan](https://github.com/candrasdkd)
- [Muhammad Sultan Qintara Adiwijaya Kusuma](https://github.com/sulthanqintara)
