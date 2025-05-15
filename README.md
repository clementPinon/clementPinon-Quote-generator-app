# Motivational Quote Generator

A simple and elegant random quote generator built with Next.js and Tailwind CSS. The application fetches motivational quotes from the Quotable API and displays them with a clean UI.

## Features

- Fetches random motivational quotes from an external API
- Fallback to predefined quotes if API fails
- Clean and responsive UI with Tailwind CSS
- Loading state animation
- One-click quote refresh
- Dynamic backgrounds from Unsplash with photo attribution

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Unsplash API

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Setting up Unsplash API

1. Create a free Unsplash developer account at https://unsplash.com/developers
2. Click on "Your apps" and then "New Application"
3. Accept the terms and give your application a name and description
4. Once created, copy your Access Key (not the Secret key)
5. Create a `.env.local` file in the root directory of the project
6. Add your Unsplash Access Key to the `.env.local` file:
   ```
   NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key_here
   ```
   Important: Do not include quotes around your API key

#### Troubleshooting the Unsplash API

If your background images aren't changing:
- Make sure your `.env.local` file exists in the project root
- Verify you've entered your API key correctly with no quotes
- Restart the development server after creating/updating the `.env.local` file
- Check the browser console for any API-related errors
- Look for the colored status indicator at the bottom of the quote box:
  - 🟢 Green: API is working correctly
  - 🔴 Red: API error - check your API key

### Running the application

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How it Works

The application fetches motivational quotes from the Quotable API. If the API fails or is unavailable, it uses a fallback list of curated quotes. For each quote, a random background image is fetched from Unsplash.

You can generate a new quote and background by clicking the "New Quote" button.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Quotable API](https://github.com/lukePeavey/quotable) 
- [Unsplash API](https://unsplash.com/documentation)

## Step by Step

This project was created as part of the Coursera "Aesthetic Front-End Development with React" course. Here's the step-by-step process followed to build this application:

### Step 1: Project Setup
1. Create a new Next.js project with TypeScript:
   ```bash
   npx create-next-app quote-generator-app --typescript
   ```
2. Install additional dependencies like Tailwind CSS:
   ```bash
   npm install tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. Configure Tailwind CSS in the project by updating `tailwind.config.js` to scan your app directory for components.

### Step 2: Configure Base Styles
1. Set up the `globals.css` file with Tailwind CSS directives
2. Create custom component classes for reusable elements like cards and buttons
3. Add basic styling for the body element including fallback background color

### Step 3: Create Component Structure
1. Design the main quote generator component with the following features:
   - Quote display area
   - Author attribution
   - "New Quote" button
   - Loading state indicator

### Step 4: Implement Core Functionality
1. Create the interface for Quote objects with text and author properties
2. Set up React state hooks for:
   - Current quote
   - Loading state
   - Background image URL
3. Implement the quote fetching functionality using the Quotable API
4. Add a fallback mechanism using a predefined list of quotes in case API calls fail

### Step 5: Add Visual Enhancement with Dynamic Backgrounds
1. Set up Unsplash API integration to fetch high-quality background images
2. Implement proper attribution for Unsplash photographers as required by their API terms
3. Add image preloading to ensure smooth transitions between backgrounds
4. Apply the dynamic background to the body element with proper styling

### Step 6: Implement UI Refinements
1. Add a loading spinner for better user experience while fetching new quotes
2. Apply backdrop blur effect to the quote container for improved text readability
3. Implement responsive design with Tailwind for mobile and desktop views
4. Add subtle animations and hover effects for interactive elements

### Step 7: Error Handling and Testing
1. Implement proper error handling for API calls
2. Test the application across different devices and screen sizes
3. Verify the fallback quote mechanism works correctly

### Step 8: Deployment
1. Build the optimized production version of the app
2. Deploy to a hosting service of your choice (Vercel, Netlify, etc.)

This step-by-step process demonstrates how to build a complete, visually appealing web application using modern front-end technologies while implementing proper error handling and user experience considerations. 