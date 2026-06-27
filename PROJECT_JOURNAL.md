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

---

# Lesson 7 - SQL Injection Detection

## Objective

Detect SQL Injection attacks from parsed Apache logs.

## Completed

- Created SQL Injection detection module
- Implemented regex-based SQL Injection signatures
- Integrated detection engine with Apache parser
- Enriched parsed logs with:
  - Threat Status
  - Threat Type
  - Severity
  - MITRE ATT&CK Technique
  - Description

## Detection Rules

- OR 1=1
- UNION SELECT
- SELECT FROM
- INSERT INTO
- UPDATE SET
- DELETE FROM
- DROP TABLE
- EXEC
- SLEEP()

## MITRE ATT&CK

T1190 – Exploit Public-Facing Application

## APIs

POST /api/logs/upload

## Skills Learned

- Security Regex
- Threat Detection
- Log Enrichment
- MITRE ATT&CK Mapping

---

# Lesson 8 - Directory Traversal Detection

## Objective

Detect Directory Traversal attacks from parsed Apache logs.

## Completed

- Created Directory Traversal detection module
- Added regex-based traversal signatures
- Integrated detection into log analysis
- Added MITRE ATT&CK mapping (T1006)

## Detection Rules

- ../
- ..\
- /etc/passwd
- /etc/shadow
- windows/system32
- boot.ini
- win.ini

## APIs

POST /api/logs/upload

## Skills Learned

- Directory Traversal Detection
- Security Regex
- Log Enrichment
- MITRE ATT&CK Mapping

---

# Lesson 9 - Detection Engine Refactoring

## Objective

Centralize all threat detection logic into a single Detection Engine.

## Completed

- Created detection/index.js
- Refactored SQL Injection detection
- Refactored Directory Traversal detection
- Simplified logController.js
- Implemented centralized threat analysis

## Skills Learned

- Clean Architecture
- Separation of Concerns
- Single Responsibility Principle (SRP)
- Scalable Detection Design


## Git Commits

- Initial project setup
- Implement user registration with JWT authentication
- Implement user login with JWT authentication
- Add JWT authentication middleware and protected routes
- Implement secure log upload using Multer
- Implement Apache log parser with regex
- Add SQL Injection detection engine
- Add Directory Traversal detection engine
- Refactor threat detection into centralized detection engine
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