# AI Task Evaluation App

An application that uses AI to evaluate coding tasks and UI/UX implementations based on provided code snippets or screenshots.

## Youtube Demo
https://youtu.be/45ZvnWdBUEI

## Features

- Submit tasks with code snippets or screenshots for AI evaluation
- Receive detailed feedback and scores on your submissions
- View history of previous evaluations
- Responsive design that works on all devices

## Tech Stack

### Frontend
- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- React Router for navigation
- React Hot Toast for notifications

### Backend
- Node.js with Express
- TypeScript for type safety
- Prisma ORM with MySQL database
- Google's Gemini AI API for task evaluation
- Multer for file uploads

## Getting Started

### Prerequisites
- Node.js 16.x or later
- MySQL database
- Google AI API key (for Gemini)

### Installation

1. Clone the repository:
```
git clone https://github.com/yourusername/ai-task-evaluation-app.git
cd ai-task-evaluation-app
```

2. Install frontend dependencies:
```
npm install
```

3. Install backend dependencies:
```
cd backend
npm install
```

4. Configure environment variables:
   - Create a `.env` file in the frontend directory with:
     ```
     VITE_API_URL=http://localhost:3001/api
     ```
   - Update the `.env` file in the backend directory with your database and Google API credentials:
     ```
     DATABASE_URL="mysql://username:password@localhost:3306/task_evaluation"
     GOOGLE_API_KEY="your-google-api-key"
     PORT=3001
     NODE_ENV="development"
     ```

5. Initialize the database:
```
cd backend
npx prisma migrate dev --name init
```

### Running the Application

1. Start the backend server:
```
cd backend
npm run dev
```

2. Start the frontend development server:
```
cd ../
npm run dev
```

3. Access the application at [http://localhost:5173](http://localhost:5173)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
