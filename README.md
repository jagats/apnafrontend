Learning Platform Frontend
This is the frontend of a learning platform built with React and Vite, designed to allow users to browse programming topics, mark subtopics as completed, and track their progress. The frontend communicates with a Node.js/Express backend to fetch and update data. It is deployed on Vercel for fast and scalable hosting.
Features

View a list of programming topics with expandable subtopics.
Filter subtopics by difficulty level (Easy, Medium, Hard).
Mark subtopics as completed with checkboxes.
Display user profile information.
Track completed topics in a progress dashboard.
Responsive design with Tailwind CSS and animations using Framer Motion.

Tech Stack

React: Frontend library for building UI components.
Vite: Build tool for fast development and production builds.
Axios: For making HTTP requests to the backend API.
Tailwind CSS: Utility-first CSS framework for styling.
Framer Motion: For animations and transitions.
Vercel: Hosting platform for deployment.

Prerequisites

Node.js and npm.
A GitHub account for version control and deployment.
A Vercel account for deployment.
Access to the backend API (deployed or running locally).

Setup Instructions

Clone the Repository:
git clone https://github.com/jagats/dsafrontend.git
cd your-repo/client


Install Dependencies:
npm install


Configure Environment Variables:Create a .env file in the client folder with the following:
VITE_API_URL=http://localhost:5000


Run the Development Server:
npm run dev

Open http://localhost:5173 in your browser to view the app.

Build for Production:
npm run build

This generates a dist folder with static files.

Preview the Build:
npm run preview



Deployment to Vercel

Push Code to GitHub:Ensure your code is committed and pushed to a GitHub repository:
git add .
git commit -m "Prepare frontend for Vercel deployment"
git push origin main


Create a Vercel Project:

Log in to vercel.com and click Add New > Project.
Import your GitHub repository (select the client folder if in a monorepo).
Configure the project:
Framework Preset: Vite.
Root Directory: client (if monorepo).
Build Command: npm run build.
Output Directory: dist.




Environment Variables

VITE_API_URL: The URL of the backend API (e.g., http://localhost:5000 for local development).


Troubleshooting

CORS Errors: Ensure the backend’s CORS configuration allows the Vercel URL (set FRONTEND_URL in the backend).
API Failures: Verify VITE_API_URL is correct and the backend is running.
Build Issues: Check Vercel build logs for missing dependencies or configuration errors.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/your-feature).
Commit changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a pull request.

