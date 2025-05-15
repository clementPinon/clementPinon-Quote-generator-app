'use client';

import { useState, useEffect } from 'react';

// Define the quote type
interface Quote {
  text: string;
  author: string;
}

// Define the Unsplash photo type
interface UnsplashPhoto {
  id: string;
  urls: {
    regular: string;
    full: string;
  };
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    }
  };
  links: {
    html: string;
  };
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

// Fallback images in case the Unsplash API fails
const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  'https://images.unsplash.com/photo-1518655048521-f130df041f66',
  'https://images.unsplash.com/photo-1497250681960-ef046c08a56e'
];

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<Quote>({ text: '', author: '' });
  const [loading, setLoading] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [photoCredit, setPhotoCredit] = useState<UnsplashPhoto | null>(null);
  const [counter, setCounter] = useState(0); // Add counter to force image refresh
  const [apiStatus, setApiStatus] = useState<'loading' | 'success' | 'error'>('loading');

  // Function to fetch a random photo from Unsplash
  const fetchRandomPhoto = async () => {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || '';
    
    if (!accessKey || accessKey === 'your_unsplash_access_key_here') {
      console.error("No Unsplash API key found. Check your .env.local file.");
      setApiStatus('error');
      // Set a fallback photo credit for unsplash attribution
      setPhotoCredit({
        id: 'fallback',
        urls: {
          regular: getFallbackImage(),
          full: getFallbackImage()
        },
        user: {
          name: 'Unsplash Contributor',
          username: 'unsplash',
          links: {
            html: 'https://unsplash.com'
          }
        },
        links: {
          html: 'https://unsplash.com'
        }
      });
      return getFallbackImage();
    }
    
    try {
      // Using counter to ensure we get a different image each time
      const response = await fetch(
        `https://api.unsplash.com/photos/random?orientation=landscape&query=nature,architecture&client_id=${accessKey}&t=${timestamp}&count=${counter}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }
      );
      
      if (!response.ok) {
        console.error('Unsplash API error:', response.status, response.statusText);
        setApiStatus('error');
        // Set a fallback photo credit for unsplash attribution
        setPhotoCredit({
          id: 'fallback',
          urls: {
            regular: getFallbackImage(),
            full: getFallbackImage()
          },
          user: {
            name: 'Unsplash Contributor',
            username: 'unsplash',
            links: {
              html: 'https://unsplash.com'
            }
          },
          links: {
            html: 'https://unsplash.com'
          }
        });
        return getFallbackImage();
      }
      
      const data: UnsplashPhoto = await response.json();
      
      // For debugging
      console.log('Fetched new image:', data.id);
      
      setPhotoCredit(data);
      setApiStatus('success');
      return data.urls.regular;
    } catch (error) {
      console.error('Error fetching photo:', error);
      setApiStatus('error');
      // Set a fallback photo credit for unsplash attribution
      setPhotoCredit({
        id: 'fallback',
        urls: {
          regular: getFallbackImage(),
          full: getFallbackImage()
        },
        user: {
          name: 'Unsplash Contributor',
          username: 'unsplash',
          links: {
            html: 'https://unsplash.com'
          }
        },
        links: {
          html: 'https://unsplash.com'
        }
      });
      return getFallbackImage();
    }
  };

  // Get a fallback image if Unsplash API fails
  const getFallbackImage = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
    return `${FALLBACK_IMAGES[randomIndex]}?t=${new Date().getTime()}`;
  };

  // Apply the background image
  useEffect(() => {
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
  }, [backgroundImage]);

  // Function to fetch a new quote
  async function fetchQuote() {
    setLoading(true);
    setCounter(prev => prev + 1); // Increment counter to ensure a new image
    
    // Update the background image before fetching a new quote
    const imageUrl = await fetchRandomPhoto();
    setBackgroundImage(imageUrl);
    
    try {
      // Try to fetch from the API
      const response = await fetch(
        'https://api.quotable.io/random?tags=inspirational,motivational',
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        }
      );
      
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
    <>
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
              className="btn bg-blue-500 hover:bg-blue-600 text-white mx-auto block mb-4"
            >
              New Quote
            </button>
            
            {!photoCredit && (
              <div className="text-xs text-center text-gray-600 mt-4">
                <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ 
                  backgroundColor: apiStatus === 'success' ? '#10b981' : 
                                 apiStatus === 'error' ? '#ef4444' : '#f59e0b'
                }}></span>
                {apiStatus === 'loading' ? 'Loading images...' : 'Image loading...'}
              </div>
            )}
          </>
        )}
      </div>
      
      {/* Photo Credit positioned at bottom right */}
      {photoCredit && (
        <div className="fixed bottom-4 right-4 backdrop-blur-md bg-black/50 text-white px-3 py-2 rounded-lg text-xs shadow-lg z-50">
          Photo by <a 
            href={photoCredit.user.links.html} 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:text-blue-300 transition"
          >
            {photoCredit.user.name}
          </a>{' '}
          <a 
            href={`https://unsplash.com/@${photoCredit.user.username}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:text-blue-300 transition"
          >
            @{photoCredit.user.username}
          </a>{' '}
          / <a 
            href="https://unsplash.com"
            target="_blank" 
            rel="noopener noreferrer"
            className="font-bold hover:text-blue-300 transition ml-1"
          >
            unsplash.com
          </a>
        </div>
      )}
      
      {/* API Key Prompt for developers */}
      {apiStatus === 'error' && (
        <div className="fixed top-4 right-4 backdrop-blur-md bg-amber-500/80 text-white px-3 py-2 rounded-lg text-xs shadow-lg z-50 max-w-xs">
          <p className="font-bold mb-1">⚠️ Missing API Key</p>
          <p>You need to add your Unsplash API key to use high-quality images.</p>
          <ol className="mt-2 list-decimal list-inside">
            <li>Sign up at <a href="https://unsplash.com/developers" target="_blank" rel="noopener noreferrer" className="underline">unsplash.com/developers</a></li>
            <li>Create a new application</li>
            <li>Copy your Access Key</li>
            <li>Add it to <code className="bg-black/20 px-1 rounded">.env.local</code></li>
          </ol>
        </div>
      )}
    </>
  );
} 