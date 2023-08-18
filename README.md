# SYPlaytus
This project is primarily for SY-Playtus developers to learn and is not for actual production use.

# Setting Up a Node.js Backend Service

To set up a Node.js backend service, you need to follow the steps below:

## To Run the Backend
```
npm install
npm start
```
## 1. Setting Up the Project:

```
mkdir mern-auth
cd mern-auth
npm init -y #installing node
npm install express mongoose bcryptjs jsonwebtoken cors
```

We're installing:
- `express` for our server
- `mongoose` for MongoDB interactions
- `bcryptjs` for password hashing
- `jsonwebtoken` for JWT authentication
- `cors` to handle CORS (Cross-Origin Resource Sharing)

## 2. Connect to MongoDB:

We'll use MongoDB Atlas (a cloud MongoDB service) for simplicity.

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project and cluster.
3. Whitelist your IP address (or allow access from anywhere for testing).
4. Get your connection string.

### MongoDB Atlas:

MongoDB Atlas is a Database-as-a-Service (DBaaS) offering from MongoDB, Inc., which lets you run MongoDB in the cloud without managing the underlying infrastructure.

- **Project:** In MongoDB Atlas, a project is a logical grouping of your MongoDB clusters (databases). Within a project, you can manage users, track activities, set up alerts, etc. Think of a project like a workspace where you have one or more databases.
- **Cluster:** A cluster in MongoDB Atlas refers to the actual MongoDB database deployment. Clusters can be of different types:
    - **Shared Clusters (M0, M2, M5 tiers)**: These are low-cost or free clusters suitable for learning and testing. They have some limitations and shouldn't be used for production.
    - **Dedicated Clusters (M10 and above)**: These are designed for production use and provide dedicated resources, backups, and other features.

### Whitelisting IP Address:

When setting up a MongoDB Atlas cluster, you'll need to specify which IP addresses are allowed to connect to it. This is a security measure to ensure only authorized sources can access your database.

- **"Where would you like to connect from?"**:
    - **My Local Environment:** If you're working from your local computer, you would choose this. It'll typically detect and suggest your current public IP.
    - **Cloud Environment:** If you have an application or service hosted on a cloud provider (like AWS, Google Cloud, Azure, etc.) that needs to connect to the database, you'd choose this and provide the necessary IPs.

### Recommendation:

If you're just getting started and working from your local machine:
1. Create a project in MongoDB Atlas (name it based on your application or purpose).
2. Within the project, create a new cluster. For learning/testing, a free tier (M0) cluster is usually sufficient.
3. For the IP whitelist, if you're unsure about your IP or frequently switch networks, you can whitelist all IPs temporarily by using `0.0.0.0/0`. Remember, for a production system, you would be more restrictive.
4. Once set up, MongoDB Atlas will provide you with a connection string. You'll use this in your application to connect to the database. Ensure you replace the placeholder in the connection string with your database user's password.

Now, create a `config.js` file:

```javascript
module.exports = {
    MONGO_URI: 'YOUR_MONGODB_CONNECTION_STRING',
    JWT_SECRET: 'YOUR_RANDOM_SECRET_FOR_JWT'
};
```

## 3. Implementing the API:

**models/User.js**:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ... [rest of the code]
```

**server.js**:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// ... [rest of the code]
\```

In RESTful API design, CRUD operations correspond to HTTP methods: **`GET`** for reading, **`POST`** for creating, **`PUT`** or **`PATCH`** for updating, and **`DELETE`** for removing resources.
