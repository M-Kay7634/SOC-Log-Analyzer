# 📘 SOC Log Analyzer - Project Journal

---

# Lesson 1 - Project Setup

**Date:** 27 June 2026

## Objective
Set up the project architecture and development environment.

### Completed
- ✅ Created frontend using React + Vite
- ✅ Created backend using Node.js + Express
- ✅ Connected MongoDB Atlas
- ✅ Configured environment variables
- ✅ Created professional folder structure
- ✅ Initialized Git repository
- ✅ Created GitHub repository
- ✅ Renamed project folders to lowercase (`frontend` and `backend`)

### Outcome
Project foundation completed successfully and pushed to GitHub.

---

# Lesson 2 - User Authentication (Register)

**Date:** 27 June 2026

## Objective
Build user registration with secure authentication.

### Completed
- ✅ Created User model
- ✅ Implemented Register API
- ✅ Connected MongoDB
- ✅ Password hashing using bcrypt
- ✅ Generated JWT token after successful registration
- ✅ Tested API successfully using Postman

### Concepts Learned
- MongoDB Models
- Password Hashing
- JWT Token Generation
- REST API Design

### Outcome
Secure user registration completed.

---

# Lesson 3 - Login API

**Date:** 27 June 2026

## Objective
Authenticate registered users.

### Completed
- ✅ Implemented Login API
- ✅ Email validation
- ✅ Password verification using bcrypt.compare()
- ✅ JWT token generation
- ✅ Invalid credential handling
- ✅ Tested success and failure cases

### Concepts Learned
- Authentication Flow
- Password Verification
- JWT Login Process

### Outcome
User login functionality completed successfully.

---

# Lesson 4 - JWT Authentication Middleware

**Date:** 27 June 2026

## Objective
Protect backend routes using JWT.

### Completed
- ✅ Created authentication middleware
- ✅ Verified JWT token
- ✅ Protected API routes
- ✅ Extracted user information from token
- ✅ Tested protected routes with and without token

### Concepts Learned
- Authorization
- Protected Routes
- Express Middleware
- Bearer Token Authentication

### Outcome
Secure backend authentication implemented successfully.

---

# Lesson 5 - Secure Log Upload

**Date:** 27 June 2026

## Objective
Implement secure log file upload functionality for authenticated users.

### Completed
- ✅ Configured Multer for file uploads
- ✅ Created upload middleware
- ✅ Implemented log upload controller
- ✅ Created upload route
- ✅ Protected upload API using JWT middleware
- ✅ Created uploads folder for storing log files
- ✅ Tested file upload successfully using Postman

### APIs
POST /api/logs/upload

### Concepts Learned
- Multer File Upload
- File Upload Middleware
- Multipart Form Data
- Secure File Handling
- Protected File Upload API

### Outcome
Secure log upload functionality implemented successfully.

---

---

## Lesson 6 - Apache Log Parser

### Objective

Convert raw Apache log files into structured JSON objects.

### Completed

- Created Apache log parser
- Read uploaded log files using fs
- Parsed Apache Common Log Format using Regular Expressions
- Converted log entries into structured JSON
- Integrated parser with upload API

### APIs

POST /api/logs/upload

### Skills Learned

- File Reading with Node.js
- Regular Expressions (Regex)
- Apache Common Log Format
- Log Parsing
- JSON Transformation


## Git Commits

- Initial project setup
- Implement user registration with JWT authentication
- Implement user login with JWT authentication
- Add JWT authentication middleware and protected routes
- Implement secure log upload using Multer
- Implement Apache log parser with regex
---

## Current Progress

- [x] Project Setup
- [x] Register API
- [x] Login API
- [x] JWT Middleware
- [x] Log Upload
- [x] Log Parser
- [ ] MongoDB Log Storage
- [ ] Detection Engine
- [ ] Dashboard API
- [ ] React Dashboard
- [ ] Charts
- [ ] Real-Time Monitoring
- [ ] GeoIP Integration
- [ ] AbuseIPDB Integration
- [ ] MITRE ATT&CK Mapping
- [ ] Docker Deployment