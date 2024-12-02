
# Game Forum Frontend

This repository contains the frontend for the **Game Forum** project, built using Vue.js. The application provides a platform to browse games, developers, and user-generated content, with separate functionalities for users, developers, and admins.

## Features

- **Vue Router**: Navigation between pages.
- **Axios**: HTTP requests to the backend.
- **Pinia Store**: State management for global variables and notifications.
- **Vee-Validate**: Input validation for forms.
- **Responsive UI**: Designed with modular components to enhance user experience.
- **Role-Based Access**:
  - **Not logged in**: Can view most of the information.  
  - **User**: Can leave comments, edit their profile, and logout.
  - **Developer**: Can manage their developer profile and games.
  - **Admin**: Full control to manage users, games, and comments.

---

## Project Structure

### Directories
- **`components/`**: Modular components used across the application (e.g., game cards, user profile, etc.).
- **`enums/`**: Contains an enum file for shared constants.
- **`services/`**: 
  - `AuthService`: Handles authentication logic.
  - `APIService`: Handles generic API requests.
  - `AxiosResponseHandlerService`: Processes and standardizes Axios responses.
- **`views/`**: Pages of the application, including:
  - `/` - Home page.
  - `/games` - Lists all games.
  - `/games/:id` - Displays game details and associated comments.
  - `/developers/:id` - Shows developer information and their games.
  - `/users` - Admin page displaying a user table.
  - `/dev` - Developer page for managing developer details.
- **`stores/`**: Pinia stores for global state management.
  - `AuthStore`: Manages authentication state.
  - `NotificationStore`: Handles notifications.
  - `ModalStore`: Manages modal state for edit/create modals.
- **`composables/`**: Utility functions for data fetching and posting.
- **`types/`**: Defines TypeScript types for variables to ensure type safety.
- **`router/`**: Defines the projects routes.
---

## Key Functionalities

### Navigation and Display
- **Home Page (`/`)**: Welcomes users to the forum.
- **Games List (`/games`)**: Displays all available games.
- **Game Details (`/games/:id`)**: Shows game information and its comments. Users can create new comments.
- **Developer Details (`/developers/:id`)**: Displays a developer’s information and associated games.
- **Developer Management (`/dev`)**: Allows developers to edit their profiles and add games.
- **User Management (`/users`)**: Allows admin to edit and create new users.
- **Register Page (`/register`)**: Allows a new user to create an account.
- **Login Page (`/login`)**: Allows the user to log in.

### User Roles and Capabilities
- **User that has not logged in**
   - Can view games, developers and comments.
   - Can register and login to become a guest. 
- **Guest**:
  - Can leave comments on games.
  - Can edit their own profile.
  - Can edit their own comments.
- **Developer**:
  - Can manage their developer profile.
  - Can add/edit their games.
- **Admin**:
  - Can manage all content (users, games, and comments).

### Modals
- Modals are used for editing and creating fields, managed through `ModalStore`.
- Custom modal components ensure a consistent and responsive UI.

### Backend Communication
- Authentication and session management are handled via cookies.

### WebSite Showcase

![image](https://github.com/user-attachments/assets/bfab97db-b903-40e1-a888-33094cd91fa7)

![image](https://github.com/user-attachments/assets/3ce04c7e-1743-40e1-a416-ad823cdc6cec)

---

## Deployment

The application is deployed on **Vercel** for seamless access.

---

## Getting Started

### Prerequisites
- Node.js
- Vue CLI

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd game-forum-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```


### Build
Create a production-ready build:
```bash
npm run build
```

### Deployment
Deploy the application to Vercel or any hosting service of your choice.

---

## Contributions

Contributions are welcome! Feel free to submit a pull request or report issues.

---

## License

This project is licensed under the [MIT License](LICENSE).

--- 
