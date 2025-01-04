# Dissertation Registration Web Application

This web application was developed as an individual project for the seminar of the Web Technologies class by Zara Laura, class E1101, at the Faculty of Cybernetics, Statistics and Economic Informatics (CSIE), part of the Bucharest University of Economic Studies (ASE), during the 2024-2025 academic year. The application is designed to streamline the dissertation registration process for students and professors.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Database Structure](#database-structure)
- [Technologies Used](#technologies-used)
- [License](#license)
- [Contact](#contact)

## Project Overview

Developed individually, this project applies and enhances the skills learned in the Web Technologies class. Although created for academic purposes, the code is open-source and available for anyone interested in exploring or expanding the application.

## Features

- **Student Dashboard:**
  - Register and log in with an `@stud.ase.ro` email domain.
  - Submit preliminary and final dissertation requests.
  - Assign and view supervising professors.

- **Professor Dashboard:**
  - Register and log in with an `@csie.ase.ro` email domain.
  - Manage dissertation sessions and student request approvals.
  - Oversee and manage student requests.

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or Yarn

### Steps

1. Clone the repository:
2. npm install
3. npm start

### Usage

User Authentication:
Access /auth to register or log in as a student or professor.



Navigate to Dashboards:

Use /dashboard/student or /dashboard/professor for comprehensive management functionalities after authentication.


File Upload Management:

Utilize the integrated file handling system powered by Multer for uploading relevant documents according to user role.



### Database Structure

Models and Relationships:

Student related to Professor for supervision links.
EnrollmentSession entities for managing active academic sessions.
PreliminaryRequest and FinalRequest models for managing the dissertation request lifecycle.



### Technologies Used

Frontend: React, Tailwind CSS, React Router
Backend: Node.js, Express.js utilizing Sequelize ORM
Database: SQLite
Authentication: JWT (Json Web Tokens)

### License
This project is licensed under the MIT License, making it free for use and modification by anyone. Refer to the LICENSE.md for details.

### Contact
For further inquiries or suggestions:

Developer: Zara Laura
Faculty: CSIE, ASE Bucharest
GitHub Repository: GitHub
