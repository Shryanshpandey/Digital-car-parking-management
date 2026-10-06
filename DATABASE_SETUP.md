# Database Setup Guide

## Admin Account Credentials

```
Email: admin@parkingmanagement.com
Password: Admin@123456
Role: Admin
```

---

## Installation Steps

### 1. Install MongoDB

#### Option A: Local Installation
- Download MongoDB Community from: https://www.mongodb.com/try/download/community
- Install and start MongoDB service

#### Option B: MongoDB Atlas (Cloud)
- Create account at: https://www.mongodb.com/cloud/atlas
- Create a cluster and get connection string

### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB connection string
# MONGODB_URI=mongodb://localhost:27017/parking-management
```

### 3. Seed Admin Account

```bash
# Run seeding script
npm run seed
```

This will create the admin account in your database.

### 4. Start Backend Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server will run on: `http://localhost:5000`

---

## API Endpoints

### Authentication Endpoints

#### Register
- **POST** `/api/auth/register`
- Body: `{ name, email, password, phone?, vehicleLicense? }`

#### Login
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Returns: `{ token, user }`

#### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer {token}`

#### Logout
- **POST** `/api/auth/logout`
- Headers: `Authorization: Bearer {token}`

---

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/parking-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

---

## Database Schema

### User Collection

```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed, required),
  role: String (enum: ['user', 'admin'], default: 'user'),
  phone: String (optional),
  vehicleLicense: String (optional),
  isActive: Boolean (default: true),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## Login Instructions

### For Users (Frontend)

1. Visit: `http://localhost:5173` (or your frontend URL)
2. Click "Login" or "Register"
3. Use admin credentials or create new account:
   - **Email:** admin@parkingmanagement.com
   - **Password:** Admin@123456

### For Developers (API Testing)

```bash
# Login request
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@parkingmanagement.com","password":"Admin@123456"}'

# Will return JWT token in response
```

---

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running on your system
- Check MONGODB_URI in .env file
- Verify connection string format

### JWT Token Issues
- Make sure JWT_SECRET is set in .env
- Check token expiry (default: 7 days)
- Include Bearer token in Authorization header

### CORS Issues
- Update CLIENT_URL in .env if frontend is on different port
- Ensure CORS middleware is properly configured

### Admin Account Not Created
- Run `npm run seed` command
- Check MongoDB connection
- Verify models are properly exported

---

## Next Steps

1. Update `.env` with your actual MongoDB connection string
2. Run `npm install` in server directory
3. Run `npm run seed` to create admin account
4. Run `npm run dev` to start backend server
5. Start frontend: `npm run dev` in root directory
6. Login with admin credentials

---

## Production Checklist

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use MongoDB Atlas for production database
- [ ] Set NODE_ENV=production
- [ ] Update CLIENT_URL to production frontend URL
- [ ] Enable HTTPS/SSL
- [ ] Set up proper error logging
- [ ] Implement rate limiting
- [ ] Use environment-specific configurations
