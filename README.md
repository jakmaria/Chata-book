# Chata-book
This is a web application that allows users to register, login, and book events at a common family place. It will provide role-based access control, where users will have different roles with varying permissions, including "basic," "guest," "user," and "admin" roles. The events will be displayed in a list on the events page, later on I would like to connect it with a calendar, where it should be visibla how avaiable the place is and when.

## Features

### Registration
Everyone can register for a new account using their email and password.

### Login
Registered users can log in to their account using their email and password. Users with the "basic" role can only access the main page.

### Events
Users with the "guest" role will only be able to view events, while users with the "user" role will be able to create, edit, and delete events they created. Users with the "admin" role will be able to create, edit, and delete events, including events created by other users.

### User Profile
Except from the roles 'basic' and 'guest', roles 'user' and 'admin' will have profiles. Users with the "user" role can view and edit their own profile, while users with the "admin" role can view and edit profiles of all users.

### Role-based Access Control
The app will implement role-based authorization, where different roles will have different permissions and access levels.

### Firebase Authentication
The app uses Firebase Authentication to handle user authentication and role management.

## Technologies used

- NEXT.js
- Typescript
- GraphQL
- Tailwind CSS
- Prisma
- MySQL
- Firebase






