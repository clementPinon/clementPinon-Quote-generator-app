# Motivational Quote Generator

A simple and elegant random quote generator built with Next.js and Tailwind CSS. The application fetches motivational quotes from the Quotable API and displays them with a clean UI.

## Features

- Fetches random motivational quotes from an external API
- Fallback to predefined quotes if API fails
- Clean and responsive UI with Tailwind CSS
- Loading state animation
- One-click quote refresh

## Technologies

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How it Works

The application fetches motivational quotes from the Quotable API. If the API fails or is unavailable, it uses a fallback list of curated quotes. 

You can generate a new quote by clicking the "New Quote" button.

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Quotable API](https://github.com/lukePeavey/quotable) 