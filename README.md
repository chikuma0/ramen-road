# RamenJourney.app

RamenJourney.app is an interactive web application that helps ramen enthusiasts discover their taste preferences, explore ramen lineages, and track their journey through the ramen world.

## Project Overview

RamenJourney.app follows the concept of "点と点を線でつなぐ" (connecting dots with lines) by helping users understand both their personal taste preferences and the historical connections between ramen shops. The application focuses initially on IEKEI (家系) ramen, with plans to expand to other styles in the future.

## Core Features

### 1. Interactive Family Tree Visualization

- Visual representation of ramen shop lineages
- Interactive nodes that display shop information when clicked
- Filtering options to focus on specific lineages
- Highlighting connections between shops

### 2. Taste Profile System

- Interactive quiz to determine user preferences
- Algorithm to map preferences to specific ramen styles
- Personalized dashboard showing taste profile
- Recommendation engine based on taste preferences

### 3. Educational Journey

- Structured learning path about IEKEI ramen
- Knowledge cards that users can collect
- Progress tracking through different lessons
- Basic (free) and Deep Dive (premium) content tiers

### 4. Shop Database

- Comprehensive listing of ramen shops
- Detailed information pages for each shop
- Search and filtering capabilities
- Option for users to mark shops as visited

### 5. Achievement System

- Progress tracking across all app features
- Achievement badges for completing different tasks
- "IEKEI Expert Certification" generation
- Social media sharing functionality

## Technical Stack

- **Frontend**: Next.js with App Router
- **Styling**: Tailwind CSS
- **State Management**: React Context API, Zustand
- **Database**: Supabase
- **Authentication**: Supabase Auth with Google provider
- **Visualization**: D3.js, React-Force-Graph
- **Internationalization**: next-intl
- **Payment Processing**: Stripe

## Project Structure

```
src/
├── app/
│   ├── [locale]/                  # Internationalization routes
│   │   ├── page.tsx               # Home page
│   │   ├── family-tree/           # Family tree visualization
│   │   ├── taste-profile/         # Taste profile quiz and results
│   │   ├── journey/               # Educational journey
│   │   ├── shop/                  # Shop details
│   │   └── profile/               # User profile
├── components/                    # Reusable components
│   ├── ui/                        # UI components
│   ├── family-tree/               # Family tree components
│   ├── taste-profile/             # Taste profile components
│   ├── journey/                   # Journey components
│   └── shop/                      # Shop components
├── lib/                           # Utility functions and libraries
│   ├── supabase/                  # Supabase client
│   ├── hooks/                     # Custom hooks
│   ├── utils/                     # Utility functions
│   └── types/                     # TypeScript types
├── store/                         # State management
└── i18n/                          # Internationalization
    ├── en/                        # English translations
    └── ja/                        # Japanese translations
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ramen-journey.git
   cd ramen-journey
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Internationalization

RamenJourney.app supports both English and Japanese languages. The language is automatically detected based on the user's browser settings, but can also be manually selected.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Data sources for IEKEI ramen research
- Contributors to the project

## Deployment

### Deploying to Vercel

This project is configured for easy deployment to Vercel. You can deploy it in two ways:

#### Option 1: GitHub Integration

1. Push your code to a GitHub repository
2. Connect your Vercel account to GitHub
3. Import the repository in Vercel
4. Configure the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

The GitHub Actions workflow will automatically deploy your application whenever you push to the main branch.

#### Option 2: Vercel CLI

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Navigate to the app directory:
   ```
   cd app
   ```

3. Deploy to Vercel:
   ```
   vercel
   ```

4. Follow the prompts to configure your project

### Environment Variables

Make sure to set the following environment variables in your Vercel project:

- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key

### Custom Domains

You can configure a custom domain for your application in the Vercel dashboard:

1. Go to your project in the Vercel dashboard
2. Navigate to "Settings" > "Domains"
3. Add your custom domain
4. Follow the instructions to configure DNS settings