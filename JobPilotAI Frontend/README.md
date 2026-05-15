# JobPilot AI Frontend

A modern React application for resume analysis built with Vite, TypeScript, and Shadcn/UI.

## Features

- **File Upload**: Drag-and-drop PDF resume upload
- **Real-time Analysis**: Streaming analysis with live progress updates
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Theme**: Toggle between themes
- **Professional UI**: Clean, modern interface with smooth animations

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Shadcn/UI** for components
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```
   VITE_API_BASE_URL=https://jobpilot-ai-c7ml.onrender.com
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production build:**
   ```bash
   npm run preview
   ```

## Deployment

The frontend is configured to work with the deployed backend API. Simply build and deploy the `dist` folder to any static hosting service.

### Recommended Hosting Platforms:
- **Vercel**: `vercel --prod`
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use GitHub Actions for automated deployment
