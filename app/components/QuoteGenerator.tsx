'use client';

import { useState, useEffect } from 'react';

// Define the quote type
interface Quote {
  text: string;
  author: string;
}

// List of motivational quotes as fallback
const FALLBACK_QUOTES: Quote[] = [
  {
    text: "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs"
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  }
];

// List of curated Unsplash architectural image IDs
const ARCHITECTURE_IMAGE_IDS = [
  'Yd59eQJVYwo', // Modern facade
  '2gDwlIim3Uw', // Interior staircase
  'phIFdC6lA4E', // City skyline
  'gREquCUXQLI', // Modern building exterior
  'hTv8aaPziOQ', // Geometric architecture
  '7lvzopS8mUQ', // Spiral staircase
  'HYQvV8wWX18', // Minimalist building
  'OBok3F8buKY', // Modern glass building
  'eDu5FXZaUPw', // White structure
  'nqlX2ik1JGw', // Skyscraper
  'vP6z0sPeK_s', // Classic European building
  '-FG5fermNjw', // Modern corridor
  'c0I4ahyGIkA', // Historic columns
  'VWcPlbHglYc', // Night skyline
  'r4IyB-hZ95c'  // Modern design
];

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');

  // Function to get a direct URL for a random architecture image from Unsplash
  const getDirectUnsplashImage = () => {
    // Get a random image ID from our curated list
    const randomIndex = Math.floor(Math.random() * ARCHITECTURE_IMAGE_IDS.length);
    const imageId = ARCHITECTURE_IMAGE_IDS[randomIndex];
    
    // Create a direct URL to the image
    // The timestamp is added as a cache-busting parameter to ensure we get a new image each time
    const timestamp = new Date().getTime();
    return `https://images.unsplash.com/photo-${imageId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80&t=${timestamp}`;
  };

  useEffect(() => {
    // Set initial background image
    const imageUrl = getDirectUnsplashImage();
    setBackgroundImage(imageUrl);
  }, []);

  useEffect(() => {
    // Apply the background to the body element when backgroundImage changes
    const updateBodyBackground = () => {
      if (backgroundImage) {
        // Create a new Image object to preload the image
        const img = new Image();
        
        img.onload = () => {
          // Only set the background once the image has loaded
          document.body.style.backgroundImage = `url('${backgroundImage}')`;
          document.body.style.backgroundSize = 'cover';
          document.body.style.backgroundPosition = 'center';
          document.body.style.backgroundRepeat = 'no-repeat';
          document.body.style.backgroundAttachment = 'fixed';
        };
        
        img.src = backgroundImage;
      }
    };

    updateBodyBackground();
  }, [backgroundImage]);

  // Function to fetch a new quote
  async function fetchQuote() {
    setLoading(true);
    
    // Update the background image before fetching a new quote
    const imageUrl = getDirectUnsplashImage();
    setBackgroundImage(imageUrl);
    
    try {
      // Try to fetch from the API
      const response = await fetch('https://api.quotable.io/random?tags=inspirational,motivational');
      
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      
      const data = await response.json();
      setQuote({
        text: data.content,
        author: data.author
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      // Use a random quote from our fallback list
      const randomIndex = Math.floor(Math.random() * FALLBACK_QUOTES.length);
      setQuote(FALLBACK_QUOTES[randomIndex]);
    } finally {
      setLoading(false);
    }
  }

  // Load a quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="max-w-md w-full backdrop-blur-md bg-white/40 p-8 rounded-xl shadow-xl">
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          <blockquote className="text-2xl italic text-center mb-6 text-gray-800 font-serif">
            "{quote.text}"
          </blockquote>
          <p className="text-right self-end font-semibold text-gray-700 mb-8">
            — {quote.author}
          </p>
          <button 
            onClick={fetchQuote}
            className="btn bg-blue-500 hover:bg-blue-600 text-white mx-auto block"
          >
            New Quote
          </button>
        </>
      )}
    </div>
  );
} 