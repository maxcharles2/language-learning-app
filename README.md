# FrenchQuest 🇫🇷

A modern, interactive French language learning application designed for A1-level beginners. Master French vocabulary through engaging multiple-choice quizzes with comprehensive progress tracking and gamification features.

![FrenchQuest](https://img.shields.io/badge/Level-A1%20French-emerald?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

## ✨ Features

### 🎯 Interactive Learning
- **Multiple-choice quizzes** with A1-level French vocabulary
- **Real-time feedback** with immediate answer validation
- **Streak tracking** to encourage consistent learning
- **Gamification elements** including celebration animations

### 📊 Progress Tracking
- **Comprehensive dashboard** with detailed analytics
- **Category-based performance** tracking (greetings, politeness, etc.)
- **Weekly progress charts** showing learning trends
- **Personal statistics** including accuracy rates and best scores
- **Session history** with detailed quiz results

### 🔐 User Management
- **Secure authentication** powered by Supabase Auth
- **User profiles** with personalized progress data
- **Row-level security** ensuring data privacy
- **Session management** with automatic login persistence

### 🎨 Modern UI/UX
- **Responsive design** optimized for all devices
- **Beautiful animations** and micro-interactions
- **Accessible interface** following WCAG guidelines
- **Dark/light mode** support (coming soon)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/frenchquest.git
   cd frenchquest
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**
   
   Run the SQL scripts in order in your Supabase SQL editor:
   \`\`\`bash
   # In Supabase SQL Editor, run these files in order:
   scripts/001_create_questions_table.sql
   scripts/002_create_user_progress_table.sql
   scripts/003_create_quiz_sessions_table.sql
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

\`\`\`
frenchquest/
├── app/                          # Next.js App Router
│   ├── auth/                     # Authentication pages
│   ├── quiz/                     # Quiz interface
│   ├── progress/                 # Progress dashboard
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Homepage
├── components/                   # React components
│   ├── auth/                     # Authentication components
│   ├── quiz/                     # Quiz-related components
│   ├── progress/                 # Progress tracking components
│   └── ui/                       # Reusable UI components
├── lib/                          # Utility libraries
│   ├── supabase/                 # Supabase client configuration
│   ├── constants.ts              # App constants
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # Utility functions
├── scripts/                      # Database migration scripts
├── utils/                        # Helper functions
└── hooks/                        # Custom React hooks
\`\`\`

## 🗄️ Database Schema

### Tables

#### `questions`
Stores French vocabulary questions with multiple-choice options.
- `id` (UUID) - Primary key
- `french_word` (TEXT) - The French word/phrase
- `english_translation` (TEXT) - English translation
- `options` (TEXT[]) - Array of 4 multiple choice options
- `correct_answer` (TEXT) - The correct English translation
- `difficulty_level` (TEXT) - Difficulty level (A1, A2, etc.)
- `category` (TEXT) - Category (greetings, politeness, etc.)

#### `user_progress`
Tracks individual question attempts by users.
- `id` (UUID) - Primary key
- `user_id` (UUID) - Reference to auth.users
- `question_id` (UUID) - Reference to questions table
- `selected_answer` (TEXT) - User's selected answer
- `is_correct` (BOOLEAN) - Whether the answer was correct
- `session_id` (UUID) - Groups answers by quiz session

#### `quiz_sessions`
Groups questions into quiz sessions and tracks overall performance.
- `id` (UUID) - Primary key
- `user_id` (UUID) - Reference to auth.users
- `total_questions` (INTEGER) - Number of questions in session
- `correct_answers` (INTEGER) - Number of correct answers
- `score_percentage` (DECIMAL) - Calculated score percentage
- `started_at` / `completed_at` (TIMESTAMP) - Session timing

## 🎮 How to Use

### Taking a Quiz
1. **Sign up** or **log in** to your account
2. Click **"Start Learning"** or **"Take Quiz"**
3. Answer multiple-choice questions about French vocabulary
4. Get **immediate feedback** on each answer
5. Complete the quiz to see your **detailed results**

### Tracking Progress
1. Navigate to the **Progress** page
2. View your **overall statistics** and **performance metrics**
3. Analyze your **category-specific** performance
4. Review your **recent quiz sessions**
5. Monitor your **weekly learning trends**

### Categories Available
- **Greetings** - Basic French greetings and farewells
- **Politeness** - Please, thank you, excuse me, etc.
- **Numbers** - Basic counting and numbers
- **Colors** - Common color vocabulary
- **Family** - Family member terms
- *More categories coming soon!*

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Package Manager**: pnpm

## 🔧 Configuration

### Quiz Settings
Customize quiz behavior in `lib/constants.ts`:
\`\`\`typescript
export const QUIZ_CONFIG = {
  QUESTIONS_PER_SESSION: 5,
  STREAK_CELEBRATION_THRESHOLD: 3,
  PASSING_SCORE_PERCENTAGE: 70,
}
\`\`\`

### Supabase Configuration
Row Level Security (RLS) policies ensure:
- Users can only access their own progress data
- Questions are read-only for authenticated users
- Secure data isolation between users

## 🚀 Deployment

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Environment Variables for Production
\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
\`\`\`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase** for the excellent backend-as-a-service platform
- **Vercel** for seamless deployment and hosting
- **shadcn/ui** for beautiful, accessible UI components
- **Tailwind CSS** for utility-first styling
- The **French language learning community** for inspiration

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/frenchquest/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/frenchquest/discussions)
- **Email**: maxcharlesdev@gmail.com

---

**Happy Learning! Bonne chance! 🇫🇷✨**
