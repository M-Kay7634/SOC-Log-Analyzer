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

---

# Lesson 10 - Threat Scoring System

## Objective

Assign numerical risk scores and priorities to detected threats.

## Completed

- Created threat scoring module
- Assigned scores to each threat type
- Added priority levels
- Integrated scoring with Detection Engine

## Skills Learned

- Risk Scoring
- Threat Prioritization
- Security Analytics
- Modular Backend Design

## APIs

POST /api/logs/upload

---

# Lesson 11 - Failed Login Detection

## Objective

Detect failed login attempts from Apache logs.

## Completed

- Created Failed Login detection module
- Added behavior-based detection
- Integrated with Detection Engine
- Assigned MITRE ATT&CK Technique T1110
- Added threat scoring and priority

## Detection Logic

- HTTP Method = POST
- URL contains "login"
- Status Code = 401

## APIs

POST /api/logs/upload

## Skills Learned

- Behavior-Based Detection
- Authentication Monitoring
- MITRE ATT&CK Mapping
- Detection Engine Integration

---

# Lesson 12 - Correlation Engine & Brute Force Detection

## Objective

Detect brute-force attacks by correlating multiple failed login events.

## Completed

- Created correlation module
- Implemented Brute Force correlation
- Refactored analysis pipeline into:
  - Parsing
  - Detection
  - Correlation
  - Threat Scoring
- Converted repeated failed logins into Brute Force alerts

## Skills Learned

- Event Correlation
- Multi-event Detection
- SIEM Pipeline Design
- Layered Backend Architecture

## APIs

POST /api/logs/upload
---

---

# Lesson 13 - MongoDB Security Event Storage

## Objective

Persist enriched security events into MongoDB.

## Completed

- Created Log model
- Stored analyzed events using insertMany()
- Linked events with authenticated users
- Saved threat score, priority, MITRE mapping, and descriptions
- Built persistent security event storage

## APIs

POST /api/logs/upload

## Skills Learned

- MongoDB Bulk Insert
- Mongoose Schema Design
- Audit Trail
- Persistent Security Event Storage

---

# Lesson 14 - Dashboard Summary API

## Objective

Create an API that provides high-level SOC statistics.

## Completed

- Created Dashboard Controller
- Created Dashboard Routes
- Added JWT Protection
- Generated Security Dashboard Summary

## API

GET /api/dashboard/summary

## Response

- Total Logs
- Total Threats
- Critical Threats
- High Threats
- Medium Threats
- Low Threats

## Skills Learned

- MongoDB Aggregation using countDocuments()
- Dashboard API Design
- Security Metrics
- JWT Protected APIs

---

# Lesson 15 - Threat Distribution API

## Objective

Create an API to return the distribution of detected threat types.

## Completed

- Implemented MongoDB aggregation pipeline
- Grouped logs by threat type
- Sorted threat counts
- Added generatedAt timestamp

## API

GET /api/dashboard/threat-distribution

## Skills Learned

- MongoDB Aggregation Framework
- Data Grouping
- Dashboard Analytics
- Backend API Design

---

# Lesson 16 - Top Attacking IPs API

## Objective

Create an API to identify the most active attacker IP addresses.

## Completed

- Built Top Attacking IP API
- Used MongoDB aggregation
- Ranked IPs by attack count
- Limited results to top 10

## API

GET /api/dashboard/top-ips

## Skills Learned

- MongoDB Aggregation
- Grouping Data
- Dashboard Analytics
- Security Event Reporting

---

# Lesson 17 - Threat Timeline API

## Objective

Create an API to visualize threats over time.

## Completed

- Built Threat Timeline API
- Grouped threat events by timestamp
- Sorted timeline chronologically
- Added generatedAt metadata

## API

GET /api/dashboard/timeline

## Skills Learned

- MongoDB Aggregation
- Time-Series Data
- Dashboard Analytics

---

# Lesson 18 - Frontend API Layer

## Objective

Create a centralized API layer for frontend-backend communication.

## Completed

- Configured Axios instance
- Added JWT interceptor
- Created Dashboard Service
- Updated Authentication Service
- Updated Log Upload Service
- Added environment configuration

## Skills Learned

- Axios Interceptors
- API Layer Architecture
- Environment Variables
- Service-Based Design

---

# Frontend Lesson 1 - API Constants

## Objective

Centralize frontend API endpoints for maintainability.

## Completed

- Created API constants file
- Refactored Auth Service
- Refactored Dashboard Service
- Refactored Log Service
- Removed hardcoded API endpoints

## Skills Learned

- Centralized Configuration
- Maintainable API Layer
- Clean Architecture

---

# Frontend Lesson 2 - Authentication Context

## Objective

Create a centralized authentication system.

## Completed

- Created AuthContext
- Added login/logout methods
- Added authentication state
- Created ProtectedRoute
- Protected Dashboard route

## Skills Learned

- React Context API
- Protected Routes
- Authentication State Management

---

# Frontend Lesson 3 - Authentication Completed

## Objective

Build a complete frontend authentication system.

## Completed

- Login page created
- Connected frontend with backend
- JWT stored using AuthContext
- Protected dashboard route
- Automatic redirection after login
- Successfully authenticated user

## Skills Learned

- JWT Authentication
- React Context API
- Axios API Integration
- Protected Routes
- State Management

---
---

# Frontend Lesson 4 - Dashboard Layout

## Objective

Build the common dashboard layout for authenticated pages.

## Completed

- Created DashboardLayout
- Built Navbar
- Built Sidebar
- Added protected navigation
- Added Logout functionality
- Created placeholder pages

## Skills Learned

- Shared Layout Pattern
- React Router Navigation
- Component Composition
- Reusable UI Architecture

---

# Frontend Lesson 5 - Dashboard Summary Cards

## Objective

Display live dashboard statistics from the backend.

## Completed

- Created reusable SummaryCard component
- Connected Dashboard to Summary API
- Displayed live security metrics
- Added loading state with spinner

## Skills Learned

- React useEffect
- API Integration
- Reusable Components
- Dashboard Widgets

# Frontend Lesson 6 - Threat Distribution Chart

## Objective

Visualize detected threats using a pie chart.

## Completed

- Added Threat Distribution API integration
- Created reusable ThreatChart component
- Displayed threat statistics using Chart.js
- Connected frontend with MongoDB aggregation results

## Skills Learned

- Chart.js
- react-chartjs-2
- Data visualization
- API integration

# Frontend Lesson 7 - Threat Timeline Chart

## Objective

Visualize threat activity over time.

## Completed

- Created TimelineChart component
- Connected Timeline API
- Displayed live threat activity using Chart.js

## Skills Learned

- Line Charts
- Time-series visualization
- Chart.js datasets

# Frontend Lesson 8 - Top Attacking IPs

## Objective

Display the most active malicious IP addresses.

## Completed

- Created TopIPs component
- Connected Top IPs API
- Displayed ranked IP table
- Added severity badges

## Skills Learned

- Chakra UI Tables
- Dynamic Lists
- API Integration

# Frontend Lesson 9 - Recent Threats Table

## Objective

Display recent threats detected by the SOC engine.

## Completed

- Created ThreatTable component
- Connected Recent Threats API
- Added priority badges
- Displayed MITRE ATT&CK techniques
- Displayed timestamps

## Skills Learned

- Advanced Chakra Tables
- Conditional Badge Styling
- API Integration

# Frontend Lesson 10 - Upload Logs Module

## Objective

Allow users to upload Apache log files from the frontend.

## Completed

- Created Upload Logs page
- Connected upload API
- Added file selection
- Added upload button
- Added success/error toast notifications
- Implemented automatic redirect to Dashboard
- Dashboard refreshes with newly analyzed logs

## Skills Learned

- File uploads with FormData
- Multipart/form-data requests
- React file input handling
- Navigation after successful API calls

# Lesson 11 - Upload Logs Module

## Objective
Implement a frontend interface for uploading Apache log files.

## Completed
- Created Upload Logs page
- Connected frontend to upload API
- Added file selection
- Added upload summary
- Added success/error notifications
- Added navigation back to dashboard

## Skills Learned
- Multipart form uploads
- FormData
- React file handling
- API integration

# Backend Lesson 12 - Threat Management API

## Objective

Create a dedicated API for threat management.

## Completed

- Created threatController
- Created threatRoutes
- Added GET /api/threats
- Protected route with JWT
- Returned all detected threats

## Skills Learned

- REST API design
- Feature-based architecture
- Separation of concerns

# Lesson 13 - Threat Management

## Completed

- Dedicated Threats page
- Threat API integration
- Search by IP and threat type
- Priority filter
- Threat details modal
- Threat summary cards

## Skills Learned

- Feature-based architecture
- Client-side filtering
- Reusable components
- Modal state management


# Lesson 14 - Users Management (Phase 1)

**Date:** 28 June 2026

## Objective
Build the Users Management module to display registered users and user statistics.

### Completed
- ✅ Created User Management API (`GET /api/users`)
- ✅ Protected API using JWT authentication
- ✅ Created User Service
- ✅ Built Users page
- ✅ Added User Statistics cards
- ✅ Displayed registered users in a table
- ✅ Added role badges (Admin/Analyst)
- ✅ Displayed account creation date
- ✅ Maintained responsive and professional UI

### Skills Learned
- Protected API integration
- MongoDB field projection using `.select()`
- React API data fetching with Axios
- Dashboard statistics implementation
- Reusable component architecture

# Lesson 15 - Role-Based Access Control (RBAC)

**Date:** 28 June 2026

## Objective
Implement Role-Based Access Control (RBAC) and allow Admins to manage user roles.

### Completed
- ✅ Created Update User Role API
- ✅ Protected API using Admin middleware
- ✅ Implemented RBAC (Admin-only access)
- ✅ Added role dropdown for Admin users
- ✅ Displayed role badges for Analyst users
- ✅ Updated roles dynamically without page reload
- ✅ Added success/error toast notifications

### Skills Learned
- Role-Based Access Control (RBAC)
- Protected Express routes
- React state updates
- Dynamic UI rendering
- JWT authorization


# Lesson 16 - User Registration Module

**Date:** 28 June 2026

## Objective

Implement a secure user registration system integrated with the authentication module.

### Completed

- ✅ Created Register page
- ✅ Integrated Register API
- ✅ Added client-side form validation
- ✅ Added Confirm Password validation
- ✅ Linked Login and Register pages
- ✅ Restricted new users to Analyst role
- ✅ Prevented users from self-registering as Admin
- ✅ Added success and error toast notifications
- ✅ Redirected users to Login after successful registration

### Skills Learned

- React form handling
- API integration with Axios
- Client-side validation
- Secure user registration
- Navigation using React Router
- Role-based user creation

# Lesson 17 - Password Recovery with Email OTP

**Date:** 28 June 2026

## Objective

Implement a secure password recovery system using Email OTP.

### Completed

- ✅ Configured Nodemailer with Gmail SMTP
- ✅ Created reusable email utility
- ✅ Designed professional HTML email template
- ✅ Generated 6-digit OTP
- ✅ Stored OTP with 10-minute expiration
- ✅ Implemented Forgot Password API
- ✅ Implemented Verify OTP API
- ✅ Implemented Reset Password API
- ✅ Cleared OTP after successful password reset
- ✅ Tested complete password recovery flow

### Skills Learned

- Email integration using Nodemailer
- OTP generation and validation
- Password reset workflow
- Secure password hashing with bcrypt
- Backend security best practices


# Lesson 18 - Frontend Password Recovery

**Date:** 28 June 2026

## Objective

Implement the complete frontend password recovery workflow using Email OTP.

### Completed

- ✅ Created Forgot Password page
- ✅ Integrated Forgot Password API
- ✅ Created Verify OTP page
- ✅ Implemented 6-digit OTP input UI
- ✅ Integrated Verify OTP API
- ✅ Created Reset Password page
- ✅ Integrated Reset Password API
- ✅ Added form validation
- ✅ Added success/error toast notifications
- ✅ Completed end-to-end password reset workflow

### Skills Learned

- React Router state management
- Multi-step authentication flows
- OTP verification UI
- API integration with Axios
- Secure password reset implementation

# Lesson 19 - Settings Module & Authentication Enhancement

**Date:** 28 June 2026

## Objective

Build a professional Settings module and complete the authenticated password management feature.

### Completed

- ✅ Implemented Change Password API
- ✅ Added Change Password functionality in Settings
- ✅ Verified current password before updating
- ✅ Securely hashed new password using bcrypt
- ✅ Added Account Information card
- ✅ Modularized Settings page into reusable components
- ✅ Created AccountCard component
- ✅ Created ChangePasswordCard component
- ✅ Implemented application-wide Dark/Light Theme using Chakra UI Color Mode
- ✅ Updated dashboard and pages to support theme switching
- ✅ Improved Settings page architecture for future expansion

### Skills Learned

- Chakra UI Color Mode
- Theme-aware component design
- Component modularization
- Secure password management
- JWT-protected API integration
- React component organization


# Lesson 20 - Reports Module (Part 1)

**Date:** 28 June 2026

## Objective

Build the foundation of the Reports module and prepare it for professional report generation.

### Completed

- ✅ Created Reports page
- ✅ Designed modular Reports architecture
- ✅ Built Report Summary component with live backend data
- ✅ Created Report Filters UI
- ✅ Added Export section (CSV, Excel, PDF placeholders)
- ✅ Planned reusable backend filtering using query parameters
- ✅ Reused Dashboard Summary API to avoid duplicate logic

### Skills Learned

- API reuse and modular backend design
- Query parameter filtering
- Modular React component architecture
- Report generation workflow design


# Lesson 21 - Reports Module & Export Features

**Date:** 29 June 2026

## Objective

Develop a professional reporting module with filtering and export capabilities.

### Completed

- ✅ Created Reports page with modular architecture
- ✅ Implemented Report Summary using live dashboard data
- ✅ Added report filter interface
- ✅ Built reusable report service
- ✅ Implemented CSV export
- ✅ Implemented Excel (.xlsx) export
- ✅ Implemented PDF report generation
- ✅ Added support for exporting filtered report data

### Skills Learned

- File generation (CSV, Excel, PDF)
- Blob downloads in React
- Backend report generation
- Query parameter filtering
- ExcelJS integration
- PDFKit integration


# Lesson 22 - Reports Module Completion

**Date:** 29 June 2026

## Objective

Complete the reporting system with export functionality and prepare the project for deployment.

### Completed

- ✅ Designed professional Reports page
- ✅ Implemented report filtering
- ✅ Added CSV export
- ✅ Added Excel (.xlsx) export
- ✅ Added PDF report generation
- ✅ Connected report exports with backend APIs
- ✅ Improved reporting workflow for SOC analysis

### Skills Learned

- CSV file generation
- Excel report creation using ExcelJS
- PDF generation using PDFKit
- File downloads in React
- Report filtering using query parameters
- Backend file streaming

# Lesson 23 - Secure Log Deletion (Part 1)

**Date:** 29 June 2026

## Objective

Implement secure log deletion with role-based access control.

### Completed

- ✅ Created Delete Log API
- ✅ Added role-based authorization
- ✅ Admin can delete any log
- ✅ Analyst can delete only their own uploaded logs
- ✅ Added confirmation dialog before deletion
- ✅ Integrated delete functionality into Threat Management
- ✅ Automatically refreshed the threat list after deletion
- ✅ Displayed success and error toast notifications

### Skills Learned

- Secure CRUD operations
- MongoDB document deletion
- Role-Based Access Control (RBAC)
- React AlertDialog
- API integration with protected routes
- Frontend state refresh after deletion

# Lesson 23 - Threat Management & Log Lifecycle

**Date:** 29 June 2026

## Objective

Enhance the Threat Management module by implementing secure log deletion features with role-based access control and bulk operations.

---

## Features Completed

### Single Log Deletion
- Implemented Delete Log API
- Added frontend Delete button
- Added confirmation dialog
- Auto-refresh after deletion
- Success and error toast notifications

### Role-Based Access Control (RBAC)
- Admin can delete any log
- Analyst can delete only logs uploaded by them
- Backend authorization for secure deletion
- Frontend permission-based controls

### Bulk Delete
- Added row selection using checkboxes
- Implemented Select All functionality
- Bulk Delete API
- Delete Selected button
- Auto-refresh after deletion

### Delete My Uploaded Logs
- Added API to delete only the current user's uploaded logs
- Frontend button integration
- Success notification with deleted log count
- Automatic table refresh

### Delete All Logs (Admin Only)
- Admin-only API
- Frontend visibility restricted to Admin users
- Confirmation before deletion
- Dashboard and Threat list refresh

---

## Security Improvements

- Implemented Role-Based Access Control (RBAC)
- Protected all delete APIs with JWT authentication
- Backend authorization validation
- Frontend permission-based UI
- Prevented analysts from deleting other users' logs
- Defense-in-depth security approach

---

## UI Improvements

- Threat Details Modal
- Confirmation dialogs for destructive actions
- Bulk selection
- Permission-aware controls
- Toast notifications
- Auto-refresh after operations

---

## APIs Added

DELETE /api/logs/:id

DELETE /api/logs/bulk

DELETE /api/logs/my

DELETE /api/logs/all

---

## Skills Learned

- MongoDB deleteOne() and deleteMany()
- Secure REST API design
- Role-Based Access Control (RBAC)
- React state management
- Bulk operations
- Confirmation dialogs
- Protected backend routes
- Frontend authorization
- Defensive programming

---

## Challenges Solved

- Fixed "Cannot access 'log' before initialization" error
- Fixed frontend permission issue for bulk delete
- Protected bulk delete using backend validation
- Implemented role-aware UI rendering

---

# Lesson 24.1 - Real-Time Communication Setup

**Date:** 29 June 2026

## Objective

Integrate Socket.IO to enable live communication between the backend and frontend.

## Completed

- ✅ Installed Socket.IO
- ✅ Installed Socket.IO Client
- ✅ Created modular socket manager
- ✅ Integrated Socket.IO with Express HTTP server
- ✅ Established frontend connection
- ✅ Fixed WebSocket connection issues
- ✅ Fixed Express CORS middleware configuration

## Skills Learned

- HTTP Server vs Express Server
- Socket.IO architecture
- Real-time client/server communication
- WebSocket debugging
- CORS configuration
- Event-driven programming

# Lesson 24.2 - First Live Event

**Date:** 29 June 2026

## Objective

Broadcast a real-time event when a new log file is uploaded.

### Completed

- ✅ Backend emits "newLog" event
- ✅ Frontend listens for "newLog"
- ✅ Displayed live toast notification
- ✅ Verified end-to-end real-time communication

### Skills Learned

- Socket.IO event emission
- Socket.IO event listeners
- Real-time notifications
- Event-driven architecture

# Lesson 24.2 - Live Monitoring UI

**Objective**

Create the user interface for continuous log monitoring.

## Features

- Live Monitoring page
- Monitoring status card
- Log source information
- Start/Stop controls
- Recent monitoring activity
- Sidebar navigation

## Skills Learned

- Dashboard design
- Reusable component architecture
- Status indicators
- Monitoring interface design

# Lesson 24.5.2 – Monitoring Statistics

## Objective
Create a statistics section for the Live Monitoring dashboard.

### Features
- Lines Processed card
- Threats Detected card
- Events/Minute card
- System Health card
- Responsive layout
- Dark mode support

### Skills Learned
- Chakra UI Stat components
- Responsive card layouts
- Dashboard metrics visualization


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
- Add threat scoring system
- Add Failed Login detection
- Add correlation engine and brute force detection
- Store analyzed security events in MongoDB
- Add dashboard summary API
- Add threat distribution dashboard API
- feat: add top attacking IP dashboard API
- feat: add threat timeline dashboard API
- feat: create frontend API service layer
- refactor: centralize frontend API endpoints
- feat: add authentication context
- feat: complete frontend authentication
- feat: create dashboard layout with navbar and sidebar
- feat: add dashboard summary cards
- feat: add threat distribution pie chart
- feat: add threat timeline chart- feat: add top attacking IPs widget
- feat: add recent threats table
- feat: add upload logs module
- feat: implement upload logs module
- feat: add threat management api
- feat: implement threat management module
- feat: implement users management 
- feat: implement RBAC and user role management
- feat: implement secure user registration
- feat: implement email OTP password recovery
- feat: implement frontend password recovery flow
- feat: implement settings module with theme support and change password
- feat: build reports module foundation
- feat: implement reports module with CSV, Excel and PDF export
- feat: complete reports module with export functionality
- feat: implement secure single log deletion
- feat: implement complete threat management with secure log lifecycle
- feat: integrate socket.io for live monitoring
- feat: broadcast live log upload events
- feat: add live monitoring interface
- feat: add live monitoring statistics cards
---

## Current Progress

- [x] Project Setup
- [x] Register API
- [x] Login API
- [x] JWT Middleware
- [x] Log Upload
- [x] Log Parser
- [x] MongoDB Log Storage
- [x] Detection Engine
- [x] Dashboard API
- [x] React Dashboard
- [x] Charts
- [ ] Real-Time Monitoring
- [ ] GeoIP Integration
- [ ] AbuseIPDB Integration
- [ ] MITRE ATT&CK Mapping
- [ ] Docker Deployment