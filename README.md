# TMS
Task Management Board
This project is a full-stack task management board application that allows users to efficiently organize and track tasks across different stages. With intuitive drag-and-drop functionality, users can easily move tasks between "To Do", "In Progress", and "Done" columns. The application supports creating, editing, and deleting tasks, with all changes persisted through a backend API.

✨ Features
Task Organization: View tasks neatly arranged in "To Do", "In Progress", and "Done" columns.

CRUD Operations: Easily create, update, and delete tasks.

Drag-and-Drop Interface: Seamlessly move task cards between columns using a modern drag-and-drop interaction.

State Persistence: All task status and content changes are saved via a backend API.

🛠️ Technical Stack
This project is built using a combination of modern web technologies for both the frontend and backend.

Frontend
React: A declarative, component-based JavaScript library for building user interfaces.

Vite: A lightning-fast build tool that provides an instant development server and optimizes for production builds.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs directly in your HTML.

react-beautiful-dnd: A robust and accessible drag-and-drop library for React.

Note: This project is configured to use React 18.2.0 to ensure full compatibility with react-beautiful-dnd, as it has known issues with React 19.

lucide-react: A collection of beautiful and customizable open-source icons for React projects.

Backend
Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.

Express.js: A fast, unopinionated, minimalist web framework for Node.js, used for building the RESTful API.

uuid: A library for generating universally unique identifiers (UUIDs) for tasks.

cors: A Node.js package that provides a Connect/Express middleware to enable Cross-Origin Resource Sharing (CORS) for your API.

🚀 Setup Instructions
Follow these steps to set up and run the project on your local machine.

Prerequisites
Ensure you have the following installed on your system:

Node.js: Download & Install Node.js (which includes npm).

Verify installation by running:

node -v
npm -v

1. Clone the Repository
Start by cloning the project repository to your local machine:

git clone <your-repo-url> # Replace <your-repo-url> with your GitHub repository URL
cd task-board-app

2. Backend Setup
Navigate into the backend directory, install its dependencies, and start the Node.js server.

cd backend
npm init -y                  # Initializes package.json if not already present
npm install express cors uuid # Install backend dependencies
node server.js               # Start the backend server

The backend server will start on http://localhost:3001. Keep this terminal window open as the frontend will communicate with this server. You should see a confirmation message in your console.

3. Frontend Setup
Open a new terminal window and navigate into the frontend directory. It's crucial to clean up any previous installations and caches to avoid dependency conflicts.

cd ../frontend # Go back to the project root and then into the frontend directory

# IMPORTANT: Clean up any previous installations and cache to avoid conflicts.
# Use ONLY ONE of the following commands based on your OS/shell:
# For Linux/macOS (Bash/Zsh):
rm -rf node_modules
# For Windows (PowerShell):
# Remove-Item -Recurse -Force node_modules
# For Windows (Command Prompt):
# rmdir /s /q node_modules

rm package-lock.json        # Delete the existing lock file
npm cache clean --force     # Clears the npm cache forcefully

# Optional: Update npm itself to the latest version for best compatibility
npm install -g npm

# 3.1. Initialize Vite project with React
# This command scaffolds the basic React project structure and installs initial react/react-dom.
# Use '.' to scaffold into the current 'frontend' directory.
npm create vite@latest . -- --template react

# 3.2. Explicitly install React 18.2.0 and React DOM 18.2.0 for compatibility.
# Use --force if npm reports peer dependency conflicts during this step.
npm install react@18.2.0 react-dom@18.2.0 --force

# 3.3. Install core development dependencies.
# This includes Tailwind CSS, PostCSS, Autoprefixer, and Vite's React plugin.
npm install -D tailwindcss@latest postcss autoprefixer @vitejs/plugin-react@^4.0.0

# 3.4. Initialize Tailwind CSS configuration files.
# IMPORTANT: Use ONLY ONE of the following commands based on your OS/shell:
# For Linux/macOS (Bash/Zsh):
npx tailwindcss init -p
# If the above fails, try:
# node_modules/.bin/tailwindcss init -p

# For Windows (PowerShell):
npx tailwindcss init -p
# If the above fails, try:
# & ".\node_modules\.bin\tailwindcss" init -p

# For Windows (Command Prompt):
npx tailwindcss init -p
# If the above fails, try:
# .\node_modules\.bin\tailwindcss init -p

# 3.5. Install other runtime dependencies.
npm install react-beautiful-dnd lucide-react

# 3.6. Finally, run a general npm install to ensure all dependencies are correctly linked.
# This step is crucial after modifying dependencies and for linking executables.
npm install

npm run dev # Start the React development server

The frontend development server will typically run on http://localhost:5173 (or another available port). Your browser should automatically open to this address, displaying the task board.

🏃 Running the Application
To run the complete application, ensure both the backend and frontend servers are active:

Start Backend: In your first terminal (in the backend directory), run node server.js.

Start Frontend: In your second terminal (in the frontend directory), run npm run dev.

🌐 Deployment Notes:-

Frontend Deployment (React App)
The React frontend is a static single-page application and can be easily deployed to platforms like Vercel 

Vercel deployment link:-https://tms-nine-sable.vercel.app/
