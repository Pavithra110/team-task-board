# Team Task Board

A responsive task management application built using React and Vite.

Live Demo: https://team-task-board-six-sable.vercel.app/

GitHub Repository: https://github.com/Pavithra110/team-task-board

## Features

- Three task columns: To Do, In Progress, and Done.
- Create new tasks with title, description, assignee, and due date.
- Edit existing tasks.
- Delete tasks.
- Move tasks between different status columns.
- Search tasks by title.
- Filter tasks by assignee.
- Highlight overdue tasks automatically.
- Persist task data using browser localStorage.
- Responsive interface for desktop and mobile devices.

## Technologies Used

- React
- JavaScript
- HTML5
- CSS3
- Vite
- Browser localStorage

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Navigate to the project directory:

```bash
cd team-task-board
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal.

## Data Storage

The application uses browser localStorage to save task information. Tasks remain available after refreshing the browser in the same browser profile.

## Project Structure

```text
team-task-board/
├── public/
├── src/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

## Future Improvements

- Backend integration with a database.
- User authentication.
- Team collaboration and task assignment.

## Author

Developed as part of the Software Developer Winter Internship task.