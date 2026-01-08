# Liars Todo Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a PWA todo app that lies about due dates to create artificial urgency for ADHD brains.

**Architecture:** React SPA with Supabase backend. Fake due dates calculated client-side based on real dates and user reliability score. PWA for installability and offline support.

**Tech Stack:** Vite, React, TypeScript, TailwindCSS, Supabase (Auth, Database, Edge Functions), vite-plugin-pwa

---

## Phase 1: Project Foundation

### Task 1: Scaffold Vite + React + TypeScript Project

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`

**Step 1: Create Vite project**

Run:
```bash
cd /Users/nervous/Library/CloudStorage/Dropbox/Github/liars-todo
npm create vite@latest . -- --template react-ts
```

Select: Ignore files and continue

**Step 2: Install dependencies**

Run:
```bash
npm install
```

**Step 3: Verify it runs**

Run:
```bash
npm run dev
```

Expected: Dev server starts at localhost:5173

**Step 4: Add ABOUTME comments to main files**

Edit `src/main.tsx`:
```tsx
// ABOUTME: Entry point for the React application.
// ABOUTME: Renders the App component into the DOM.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Edit `src/App.tsx`:
```tsx
// ABOUTME: Root application component.
// ABOUTME: Sets up routing, providers, and main layout.

function App() {
  return (
    <div>
      <h1>Liars Todo</h1>
      <p>Your friendly neighborhood gaslighter.</p>
    </div>
  )
}

export default App
```

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Set Up TailwindCSS

**Files:**
- Modify: `package.json`
- Create: `tailwind.config.js`
- Modify: `src/index.css`

**Step 1: Install Tailwind**

Run:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Step 2: Configure Tailwind**

Edit `tailwind.config.js`:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Step 3: Add Tailwind directives**

Replace `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: Test Tailwind works**

Edit `src/App.tsx`:
```tsx
// ABOUTME: Root application component.
// ABOUTME: Sets up routing, providers, and main layout.

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Liars Todo</h1>
        <p className="mt-2 text-gray-600">Your friendly neighborhood gaslighter.</p>
      </div>
    </div>
  )
}

export default App
```

**Step 5: Verify styling**

Run: `npm run dev`
Expected: Centered text with gray background, styled heading

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add TailwindCSS"
```

---

### Task 3: Set Up PWA Plugin

**Files:**
- Modify: `vite.config.ts`
- Create: `public/icon-192.png`
- Create: `public/icon-512.png`

**Step 1: Install PWA plugin**

Run:
```bash
npm install -D vite-plugin-pwa
```

**Step 2: Configure PWA**

Edit `vite.config.ts`:
```ts
// ABOUTME: Vite configuration with PWA support.
// ABOUTME: Enables installable web app with offline caching.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon-192.png', 'icon-512.png'],
      manifest: {
        name: 'Liars Todo',
        short_name: 'Liars',
        description: 'A todo app that lies about due dates for your own good',
        theme_color: '#1f2937',
        background_color: '#f3f4f6',
        display: 'standalone',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})
```

**Step 3: Create placeholder icons**

For now, create simple placeholder icons (we'll design real ones later).

Run:
```bash
# Create a simple SVG and convert, or use placeholder
echo '<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192"><rect fill="#1f2937" width="192" height="192" rx="24"/><text x="96" y="120" text-anchor="middle" fill="white" font-size="80" font-family="sans-serif">L</text></svg>' > public/icon-192.svg
echo '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect fill="#1f2937" width="512" height="512" rx="64"/><text x="256" y="320" text-anchor="middle" fill="white" font-size="200" font-family="sans-serif">L</text></svg>' > public/icon-512.svg
```

Note: We'll need to convert these to PNG. For now, update the config to use SVG:

Edit `vite.config.ts` icons section:
```ts
icons: [
  {
    src: 'icon-192.svg',
    sizes: '192x192',
    type: 'image/svg+xml'
  },
  {
    src: 'icon-512.svg',
    sizes: '512x512',
    type: 'image/svg+xml'
  }
]
```

**Step 4: Build and verify PWA**

Run:
```bash
npm run build
npm run preview
```

Expected: App runs, can be installed (check browser address bar for install icon)

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add PWA support with vite-plugin-pwa"
```

---

### Task 4: Set Up Vitest for Testing

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`

**Step 1: Install Vitest and testing libraries**

Run:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

**Step 2: Create Vitest config**

Create `vitest.config.ts`:
```ts
// ABOUTME: Vitest configuration for unit and integration tests.
// ABOUTME: Uses jsdom for React component testing.

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

**Step 3: Create test setup**

Create `src/test/setup.ts`:
```ts
// ABOUTME: Test setup file for Vitest.
// ABOUTME: Extends expect with jest-dom matchers.

import '@testing-library/jest-dom'
```

**Step 4: Add test scripts to package.json**

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

**Step 5: Write a smoke test**

Create `src/App.test.tsx`:
```tsx
// ABOUTME: Smoke test for App component.
// ABOUTME: Verifies the app renders without crashing.

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Liars Todo')).toBeInTheDocument()
  })
})
```

**Step 6: Run test to verify it passes**

Run: `npm test`
Expected: 1 test passes

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add Vitest testing setup"
```

---

## Phase 2: Supabase Integration

### Task 5: Set Up Supabase Client

**Files:**
- Create: `src/lib/supabase.ts`
- Create: `.env.example`
- Modify: `.gitignore`

**Step 1: Install Supabase client**

Run:
```bash
npm install @supabase/supabase-js
```

**Step 2: Create environment example**

Create `.env.example`:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Step 3: Update .gitignore**

Add to `.gitignore`:
```
.env
.env.local
```

**Step 4: Create Supabase client**

Create `src/lib/supabase.ts`:
```ts
// ABOUTME: Supabase client configuration.
// ABOUTME: Initializes the Supabase client with environment variables.

import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
```

**Step 5: Create placeholder database types**

Create `src/lib/database.types.ts`:
```ts
// ABOUTME: TypeScript types for Supabase database schema.
// ABOUTME: Auto-generated from Supabase, manually maintained for now.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          reliability_score: number
          theme: 'hinged' | 'unhinged'
          notification_preferences: 'email' | 'browser' | 'both' | 'none'
          created_at: string
        }
        Insert: {
          id: string
          email: string
          reliability_score?: number
          theme?: 'hinged' | 'unhinged'
          notification_preferences?: 'email' | 'browser' | 'both' | 'none'
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          reliability_score?: number
          theme?: 'hinged' | 'unhinged'
          notification_preferences?: 'email' | 'browser' | 'both' | 'none'
          created_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          real_due_date: string
          category: string | null
          status: 'pending' | 'completed' | 'overdue'
          completed_at: string | null
          was_on_time: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          real_due_date: string
          category?: string | null
          status?: 'pending' | 'completed' | 'overdue'
          completed_at?: string | null
          was_on_time?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          real_due_date?: string
          category?: string | null
          status?: 'pending' | 'completed' | 'overdue'
          completed_at?: string | null
          was_on_time?: boolean | null
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
```

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Supabase client setup"
```

---

### Task 6: Create Supabase Project and Database Schema

**This task requires manual steps in the Supabase dashboard.**

**Step 1: Create Supabase project**

1. Go to https://supabase.com/dashboard
2. Create new project named "liars-todo"
3. Choose a strong database password
4. Select region closest to you
5. Wait for project to provision

**Step 2: Get credentials**

1. Go to Project Settings > API
2. Copy "Project URL" and "anon public" key
3. Create `.env` file:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Step 3: Create database schema**

Go to SQL Editor and run:

```sql
-- Create profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  reliability_score INTEGER NOT NULL DEFAULT 50 CHECK (reliability_score >= 0 AND reliability_score <= 100),
  theme TEXT NOT NULL DEFAULT 'hinged' CHECK (theme IN ('hinged', 'unhinged')),
  notification_preferences TEXT NOT NULL DEFAULT 'both' CHECK (notification_preferences IN ('email', 'browser', 'both', 'none')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create tasks table
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  real_due_date TIMESTAMPTZ NOT NULL,
  category TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'overdue')),
  completed_at TIMESTAMPTZ,
  was_on_time BOOLEAN,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Tasks policies
CREATE POLICY "Users can view own tasks" ON tasks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks" ON tasks
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks" ON tasks
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks" ON tasks
  FOR DELETE USING (auth.uid() = user_id);

-- Function to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-create profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Index for faster task queries
CREATE INDEX tasks_user_id_idx ON tasks(user_id);
CREATE INDEX tasks_status_idx ON tasks(status);
CREATE INDEX tasks_real_due_date_idx ON tasks(real_due_date);
```

**Step 4: Enable Magic Link auth**

1. Go to Authentication > Providers
2. Ensure Email provider is enabled
3. Under Email settings, enable "Enable Email Confirmations" (optional)

**Step 5: Test connection**

Run: `npm run dev`
App should load without "Missing Supabase environment variables" error.

**Step 6: Commit env example update if needed**

```bash
git add -A
git commit -m "docs: update env example with Supabase setup instructions"
```

---

## Phase 3: Authentication

### Task 7: Create Auth Context and Provider

**Files:**
- Create: `src/contexts/AuthContext.tsx`
- Create: `src/hooks/useAuth.ts`

**Step 1: Write test for AuthContext**

Create `src/contexts/AuthContext.test.tsx`:
```tsx
// ABOUTME: Tests for authentication context.
// ABOUTME: Verifies auth state management and user session handling.

import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { AuthProvider, useAuth } from './AuthContext'

// Mock Supabase
vi.mock('../lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
      signInWithOtp: vi.fn(),
      signOut: vi.fn(),
    }
  }
}))

function TestComponent() {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading...</div>
  return <div>{user ? `Logged in as ${user.email}` : 'Not logged in'}</div>
}

describe('AuthContext', () => {
  it('shows loading state initially', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('shows not logged in when no session', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )
    await waitFor(() => {
      expect(screen.getByText('Not logged in')).toBeInTheDocument()
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - AuthContext doesn't exist yet

**Step 3: Create AuthContext**

Create `src/contexts/AuthContext.tsx`:
```tsx
// ABOUTME: Authentication context provider for the app.
// ABOUTME: Manages user session state and provides auth methods.

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })
    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add authentication context and provider"
```

---

### Task 8: Create Login Page

**Files:**
- Create: `src/pages/LoginPage.tsx`
- Create: `src/pages/LoginPage.test.tsx`

**Step 1: Write test for LoginPage**

Create `src/pages/LoginPage.test.tsx`:
```tsx
// ABOUTME: Tests for the login page component.
// ABOUTME: Verifies email input, form submission, and success message.

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginPage from './LoginPage'

const mockSignIn = vi.fn()

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    signIn: mockSignIn,
    loading: false,
  })
}))

describe('LoginPage', () => {
  beforeEach(() => {
    mockSignIn.mockReset()
    mockSignIn.mockResolvedValue({ error: null })
  })

  it('renders email input and submit button', () => {
    render(<LoginPage />)
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('submits email and shows success message', async () => {
    render(<LoginPage />)

    const input = screen.getByPlaceholderText(/email/i)
    const button = screen.getByRole('button', { name: /send/i })

    fireEvent.change(input, { target: { value: 'test@example.com' } })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith('test@example.com')
      expect(screen.getByText(/check your email/i)).toBeInTheDocument()
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - LoginPage doesn't exist

**Step 3: Create LoginPage**

Create `src/pages/LoginPage.tsx`:
```tsx
// ABOUTME: Login page with magic link authentication.
// ABOUTME: Users enter email to receive a login link.

import { useState, FormEvent } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const { error } = await signIn(email)

    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
    setSubmitting(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h2>
          <p className="text-gray-600">
            We sent a magic link to <strong>{email}</strong>
          </p>
          <p className="text-gray-500 mt-2 text-sm">
            Click the link in the email to sign in.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Liars Todo</h1>
        <p className="text-gray-600 mb-6">Your friendly neighborhood gaslighter.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 mb-4"
          />

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Sending...' : 'Send Magic Link'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add login page with magic link auth"
```

---

### Task 9: Wire Up Auth in App

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Step 1: Update App to use AuthProvider and show LoginPage**

Edit `src/App.tsx`:
```tsx
// ABOUTME: Root application component.
// ABOUTME: Sets up auth provider and routes between login and main app.

import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Liars Todo</h1>
          <span className="text-sm text-gray-600">{user.email}</span>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-gray-600">Tasks will go here...</p>
      </main>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
```

**Step 2: Update App test**

Edit `src/App.test.tsx`:
```tsx
// ABOUTME: Tests for App component.
// ABOUTME: Verifies auth flow and conditional rendering.

import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

vi.mock('./lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: { subscription: { unsubscribe: vi.fn() } }
      }),
      signInWithOtp: vi.fn(),
      signOut: vi.fn(),
    }
  }
}))

describe('App', () => {
  it('shows login page when not authenticated', async () => {
    render(<App />)
    await waitFor(() => {
      expect(screen.getByText('Liars Todo')).toBeInTheDocument()
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument()
    })
  })
})
```

**Step 3: Run tests**

Run: `npm test`
Expected: All tests pass

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: wire up auth flow in App component"
```

---

## Phase 4: The Lying Algorithm

### Task 10: Create the Lie Calculator

**Files:**
- Create: `src/lib/lieCalculator.ts`
- Create: `src/lib/lieCalculator.test.ts`

**Step 1: Write tests for lie calculator**

Create `src/lib/lieCalculator.test.ts`:
```ts
// ABOUTME: Tests for the lie calculation algorithm.
// ABOUTME: Verifies fake due dates are calculated correctly based on real dates and reliability.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { calculateFakeDueDate, formatTimeRemaining } from './lieCalculator'

describe('calculateFakeDueDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-08T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns real date when more than 7 days away', () => {
    const realDue = new Date('2026-01-20T12:00:00Z') // 12 days away
    const result = calculateFakeDueDate(realDue, 50)
    expect(result.toISOString()).toBe(realDue.toISOString())
  })

  it('shaves off 1 day when 4-7 days away', () => {
    const realDue = new Date('2026-01-13T12:00:00Z') // 5 days away
    const result = calculateFakeDueDate(realDue, 50)
    const expected = new Date('2026-01-12T12:00:00Z') // 4 days away (1 day shaved)
    expect(result.toISOString()).toBe(expected.toISOString())
  })

  it('shaves off 30-50% when 2-4 days away', () => {
    const realDue = new Date('2026-01-11T12:00:00Z') // 3 days away
    const result = calculateFakeDueDate(realDue, 50)
    // At 50% reliability, shave ~40% of 3 days = ~1.2 days
    // Fake should show ~1.8 days away
    const daysUntilFake = (result.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    expect(daysUntilFake).toBeGreaterThan(1.5)
    expect(daysUntilFake).toBeLessThan(2.5)
  })

  it('shows tomorrow when 1-2 real days away', () => {
    const realDue = new Date('2026-01-09T18:00:00Z') // ~1.25 days away
    const result = calculateFakeDueDate(realDue, 50)
    // Should show as due very soon (within ~18 hours or so)
    const hoursUntilFake = (result.getTime() - Date.now()) / (1000 * 60 * 60)
    expect(hoursUntilFake).toBeLessThan(24)
  })

  it('lies more aggressively with lower reliability score', () => {
    const realDue = new Date('2026-01-13T12:00:00Z') // 5 days away
    const highReliability = calculateFakeDueDate(realDue, 80)
    const lowReliability = calculateFakeDueDate(realDue, 20)
    expect(lowReliability.getTime()).toBeLessThan(highReliability.getTime())
  })

  it('never returns a date in the past', () => {
    const realDue = new Date('2026-01-09T12:00:00Z') // 1 day away
    const result = calculateFakeDueDate(realDue, 10) // Very unreliable
    expect(result.getTime()).toBeGreaterThanOrEqual(Date.now())
  })
})

describe('formatTimeRemaining', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-08T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows days for dates more than 24 hours away', () => {
    const date = new Date('2026-01-11T12:00:00Z') // 3 days away
    expect(formatTimeRemaining(date)).toBe('3 days')
  })

  it('shows hours for dates less than 24 hours away', () => {
    const date = new Date('2026-01-09T06:00:00Z') // 18 hours away
    expect(formatTimeRemaining(date)).toBe('18 hours')
  })

  it('shows overdue for past dates', () => {
    const date = new Date('2026-01-07T12:00:00Z') // 1 day ago
    expect(formatTimeRemaining(date)).toBe('overdue')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - lieCalculator doesn't exist

**Step 3: Implement lie calculator**

Create `src/lib/lieCalculator.ts`:
```ts
// ABOUTME: The core lying algorithm for fake due dates.
// ABOUTME: Calculates how much to lie based on time remaining and user reliability.

const HOURS_IN_DAY = 24
const MS_IN_HOUR = 1000 * 60 * 60
const MS_IN_DAY = MS_IN_HOUR * HOURS_IN_DAY

export function calculateFakeDueDate(realDueDate: Date, reliabilityScore: number): Date {
  const now = Date.now()
  const realDueMs = realDueDate.getTime()
  const msRemaining = realDueMs - now
  const daysRemaining = msRemaining / MS_IN_DAY

  // Reliability affects how much we lie (0-100)
  // Lower reliability = more aggressive lying
  const lieMultiplier = 1 - (reliabilityScore / 100) // 0 to 1

  let fakeDueMs: number

  if (daysRemaining > 7) {
    // More than 7 days: tell the truth
    fakeDueMs = realDueMs
  } else if (daysRemaining > 4) {
    // 4-7 days: shave off 1 day (scaled by lie multiplier)
    const shaveMs = MS_IN_DAY * (0.5 + lieMultiplier * 0.5) // 0.5 to 1 day
    fakeDueMs = realDueMs - shaveMs
  } else if (daysRemaining > 2) {
    // 2-4 days: shave off 30-50% of remaining time
    const shavePercent = 0.3 + (lieMultiplier * 0.2) // 30% to 50%
    const shaveMs = msRemaining * shavePercent
    fakeDueMs = realDueMs - shaveMs
  } else if (daysRemaining > 1) {
    // 1-2 days: "tomorrow" - show as due within 12-18 hours
    const targetHours = 12 + (reliabilityScore / 100) * 6 // 12-18 hours based on reliability
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else if (daysRemaining > 0) {
    // Less than 1 day: panic mode - show as due in 1-6 hours
    const targetHours = 1 + (reliabilityScore / 100) * 5 // 1-6 hours based on reliability
    fakeDueMs = now + (targetHours * MS_IN_HOUR)
  } else {
    // Already past due
    fakeDueMs = realDueMs
  }

  // Never return a date in the past (unless actually overdue)
  if (fakeDueMs < now && realDueMs > now) {
    fakeDueMs = now + MS_IN_HOUR // Show as due in 1 hour minimum
  }

  return new Date(fakeDueMs)
}

export function formatTimeRemaining(dueDate: Date): string {
  const now = Date.now()
  const dueMs = dueDate.getTime()
  const msRemaining = dueMs - now

  if (msRemaining < 0) {
    return 'overdue'
  }

  const hoursRemaining = Math.floor(msRemaining / MS_IN_HOUR)

  if (hoursRemaining < 24) {
    return `${hoursRemaining} hours`
  }

  const daysRemaining = Math.floor(hoursRemaining / HOURS_IN_DAY)
  return `${daysRemaining} days`
}

export function getUrgencyLevel(fakeDueDate: Date): 'low' | 'medium' | 'high' | 'critical' | 'overdue' {
  const now = Date.now()
  const msRemaining = fakeDueDate.getTime() - now
  const hoursRemaining = msRemaining / MS_IN_HOUR

  if (hoursRemaining < 0) return 'overdue'
  if (hoursRemaining < 6) return 'critical'
  if (hoursRemaining < 24) return 'high'
  if (hoursRemaining < 72) return 'medium'
  return 'low'
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: implement lie calculator algorithm"
```

---

## Phase 5: Task Management

### Task 11: Create Task Types and Hooks

**Files:**
- Create: `src/types/task.ts`
- Create: `src/hooks/useTasks.ts`
- Create: `src/hooks/useTasks.test.ts`

**Step 1: Create task types**

Create `src/types/task.ts`:
```ts
// ABOUTME: TypeScript types for task entities.
// ABOUTME: Defines the shape of tasks throughout the app.

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  real_due_date: string
  category: string | null
  status: 'pending' | 'completed' | 'overdue'
  completed_at: string | null
  was_on_time: boolean | null
  created_at: string
}

export interface TaskWithFakeDate extends Task {
  fake_due_date: Date
  urgency: 'low' | 'medium' | 'high' | 'critical' | 'overdue'
}

export interface CreateTaskInput {
  title: string
  description?: string
  real_due_date: string
  category?: string
}
```

**Step 2: Write test for useTasks hook**

Create `src/hooks/useTasks.test.ts`:
```ts
// ABOUTME: Tests for the useTasks hook.
// ABOUTME: Verifies task CRUD operations and fake date calculations.

import { renderHook, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useTasks } from './useTasks'

const mockTasks = [
  {
    id: '1',
    user_id: 'user-1',
    title: 'Test Task',
    description: null,
    real_due_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    category: null,
    status: 'pending',
    completed_at: null,
    was_on_time: null,
    created_at: new Date().toISOString(),
  }
]

const mockSupabase = {
  from: vi.fn(() => ({
    select: vi.fn(() => ({
      eq: vi.fn(() => ({
        order: vi.fn(() => Promise.resolve({ data: mockTasks, error: null }))
      }))
    })),
    insert: vi.fn(() => ({
      select: vi.fn(() => ({
        single: vi.fn(() => Promise.resolve({ data: mockTasks[0], error: null }))
      }))
    })),
    update: vi.fn(() => ({
      eq: vi.fn(() => ({
        select: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: mockTasks[0], error: null }))
        }))
      }))
    })),
    delete: vi.fn(() => ({
      eq: vi.fn(() => Promise.resolve({ error: null }))
    }))
  }))
}

vi.mock('../lib/supabase', () => ({
  supabase: mockSupabase
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 'user-1' }
  })
}))

vi.mock('./useProfile', () => ({
  useProfile: () => ({
    profile: { reliability_score: 50 }
  })
}))

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches tasks on mount', async () => {
    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Test Task')
  })

  it('calculates fake due dates for tasks', async () => {
    const { result } = renderHook(() => useTasks())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.tasks[0].fake_due_date).toBeInstanceOf(Date)
    expect(result.current.tasks[0].urgency).toBeDefined()
  })
})
```

**Step 3: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - useTasks doesn't exist

**Step 4: Create useProfile hook first (dependency)**

Create `src/hooks/useProfile.ts`:
```ts
// ABOUTME: Hook for fetching and updating user profile.
// ABOUTME: Provides reliability score and theme preference.

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export interface Profile {
  id: string
  email: string
  reliability_score: number
  theme: 'hinged' | 'unhinged'
  notification_preferences: 'email' | 'browser' | 'both' | 'none'
  created_at: string
}

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user!.id)
        .single()

      if (error) {
        setError(error)
      } else {
        setProfile(data)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Not authenticated') }

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single()

    if (!error && data) {
      setProfile(data)
    }

    return { data, error }
  }

  return { profile, loading, error, updateProfile }
}
```

**Step 5: Create useTasks hook**

Create `src/hooks/useTasks.ts`:
```ts
// ABOUTME: Hook for managing tasks with fake due date calculations.
// ABOUTME: Provides CRUD operations and enriches tasks with lie data.

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from './useProfile'
import { Task, TaskWithFakeDate, CreateTaskInput } from '../types/task'
import { calculateFakeDueDate, getUrgencyLevel } from '../lib/lieCalculator'

export function useTasks() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const [tasks, setTasks] = useState<TaskWithFakeDate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const enrichTask = useCallback((task: Task): TaskWithFakeDate => {
    const reliabilityScore = profile?.reliability_score ?? 50
    const fakeDueDate = calculateFakeDueDate(new Date(task.real_due_date), reliabilityScore)
    return {
      ...task,
      fake_due_date: fakeDueDate,
      urgency: getUrgencyLevel(fakeDueDate),
    }
  }, [profile?.reliability_score])

  const fetchTasks = useCallback(async () => {
    if (!user) return

    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', user.id)
      .order('real_due_date', { ascending: true })

    if (error) {
      setError(error)
    } else {
      setTasks((data || []).map(enrichTask))
    }
    setLoading(false)
  }, [user, enrichTask])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = async (input: CreateTaskInput) => {
    if (!user) return { error: new Error('Not authenticated') }

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title: input.title,
        description: input.description || null,
        real_due_date: input.real_due_date,
        category: input.category || null,
      })
      .select()
      .single()

    if (!error && data) {
      setTasks(prev => [...prev, enrichTask(data)].sort(
        (a, b) => new Date(a.real_due_date).getTime() - new Date(b.real_due_date).getTime()
      ))
    }

    return { data, error }
  }

  const completeTask = async (taskId: string) => {
    if (!user) return { error: new Error('Not authenticated') }

    const task = tasks.find(t => t.id === taskId)
    if (!task) return { error: new Error('Task not found') }

    const now = new Date()
    const realDue = new Date(task.real_due_date)
    const wasOnTime = now <= realDue

    const { data, error } = await supabase
      .from('tasks')
      .update({
        status: 'completed',
        completed_at: now.toISOString(),
        was_on_time: wasOnTime,
      })
      .eq('id', taskId)
      .select()
      .single()

    if (!error && data) {
      setTasks(prev => prev.map(t => t.id === taskId ? enrichTask(data) : t))
    }

    return { data, error, wasOnTime, realDueDate: realDue }
  }

  const deleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)

    if (!error) {
      setTasks(prev => prev.filter(t => t.id !== taskId))
    }

    return { error }
  }

  return {
    tasks,
    loading,
    error,
    addTask,
    completeTask,
    deleteTask,
    refetch: fetchTasks,
  }
}
```

**Step 6: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add task types and useTasks hook with lie calculations"
```

---

## Phase 6: UI Components

### Task 12: Create TaskCard Component

**Files:**
- Create: `src/components/TaskCard.tsx`
- Create: `src/components/TaskCard.test.tsx`

**Step 1: Write test for TaskCard**

Create `src/components/TaskCard.test.tsx`:
```tsx
// ABOUTME: Tests for the TaskCard component.
// ABOUTME: Verifies task display, urgency styling, and completion interaction.

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TaskCard from './TaskCard'
import { TaskWithFakeDate } from '../types/task'

const mockTask: TaskWithFakeDate = {
  id: '1',
  user_id: 'user-1',
  title: 'Test Task',
  description: 'A test description',
  real_due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
  category: 'work',
  status: 'pending',
  completed_at: null,
  was_on_time: null,
  created_at: new Date().toISOString(),
  fake_due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  urgency: 'medium',
}

describe('TaskCard', () => {
  it('renders task title', () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} theme="hinged" />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('shows fake due date, not real date', () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} theme="hinged" />)
    // Should show the fake date (2 days away), not real (5 days)
    expect(screen.getByText(/2 days/i)).toBeInTheDocument()
  })

  it('calls onComplete when complete button clicked', () => {
    const onComplete = vi.fn()
    render(<TaskCard task={mockTask} onComplete={onComplete} theme="hinged" />)
    fireEvent.click(screen.getByRole('button', { name: /complete/i }))
    expect(onComplete).toHaveBeenCalledWith('1')
  })

  it('shows category if present', () => {
    render(<TaskCard task={mockTask} onComplete={vi.fn()} theme="hinged" />)
    expect(screen.getByText('work')).toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - TaskCard doesn't exist

**Step 3: Implement TaskCard**

Create `src/components/TaskCard.tsx`:
```tsx
// ABOUTME: Card component displaying a single task with fake due date.
// ABOUTME: Adapts styling based on urgency level and theme (hinged/unhinged).

import { TaskWithFakeDate } from '../types/task'
import { formatTimeRemaining } from '../lib/lieCalculator'

interface TaskCardProps {
  task: TaskWithFakeDate
  onComplete: (taskId: string) => void
  onDelete?: (taskId: string) => void
  theme: 'hinged' | 'unhinged'
}

const urgencyStyles = {
  hinged: {
    low: 'border-gray-200 bg-white',
    medium: 'border-amber-200 bg-amber-50',
    high: 'border-orange-300 bg-orange-50',
    critical: 'border-red-300 bg-red-50',
    overdue: 'border-red-500 bg-red-100',
  },
  unhinged: {
    low: 'border-gray-300 bg-white',
    medium: 'border-yellow-400 bg-yellow-50',
    high: 'border-orange-500 bg-orange-100 animate-pulse',
    critical: 'border-red-600 bg-red-200 animate-pulse',
    overdue: 'border-red-700 bg-red-300 animate-bounce',
  },
}

const urgencyMessages = {
  hinged: {
    low: '',
    medium: '',
    high: '',
    critical: 'Due soon',
    overdue: 'Overdue',
  },
  unhinged: {
    low: '',
    medium: 'tick tock',
    high: 'WHY ARE YOU READING THIS GO DO IT',
    critical: 'PANIC MODE ACTIVATED',
    overdue: 'YOU ABSOLUTE GREMLIN',
  },
}

export default function TaskCard({ task, onComplete, onDelete, theme }: TaskCardProps) {
  const timeRemaining = formatTimeRemaining(task.fake_due_date)
  const urgencyStyle = urgencyStyles[theme][task.urgency]
  const urgencyMessage = urgencyMessages[theme][task.urgency]

  if (task.status === 'completed') {
    return null // Completed tasks handled separately
  }

  return (
    <div className={`rounded-lg border-2 p-4 ${urgencyStyle} transition-all`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-sm font-medium ${task.urgency === 'overdue' ? 'text-red-700' : 'text-gray-700'}`}>
              {timeRemaining === 'overdue' ? 'OVERDUE' : `Due in ${timeRemaining}`}
            </span>
            {task.category && (
              <span className="text-xs px-2 py-0.5 bg-gray-200 text-gray-600 rounded-full">
                {task.category}
              </span>
            )}
          </div>
          {urgencyMessage && (
            <p className={`text-xs mt-1 ${theme === 'unhinged' ? 'font-bold text-red-600' : 'text-gray-500'}`}>
              {urgencyMessage}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onComplete(task.id)}
            aria-label="Complete task"
            className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            {theme === 'unhinged' ? 'DONE (finally)' : 'Complete'}
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              aria-label="Delete task"
              className="px-3 py-1.5 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add TaskCard component with urgency styling"
```

---

### Task 13: Create AddTaskForm Component

**Files:**
- Create: `src/components/AddTaskForm.tsx`
- Create: `src/components/AddTaskForm.test.tsx`

**Step 1: Write test for AddTaskForm**

Create `src/components/AddTaskForm.test.tsx`:
```tsx
// ABOUTME: Tests for the AddTaskForm component.
// ABOUTME: Verifies form input, validation, and submission.

import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AddTaskForm from './AddTaskForm'

describe('AddTaskForm', () => {
  it('renders title and due date inputs', () => {
    render(<AddTaskForm onAdd={vi.fn()} theme="hinged" />)
    expect(screen.getByPlaceholderText(/task title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument()
  })

  it('calls onAdd with form data when submitted', async () => {
    const onAdd = vi.fn().mockResolvedValue({ error: null })
    render(<AddTaskForm onAdd={onAdd} theme="hinged" />)

    fireEvent.change(screen.getByPlaceholderText(/task title/i), {
      target: { value: 'New Task' }
    })
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2026-01-15' }
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => {
      expect(onAdd).toHaveBeenCalledWith({
        title: 'New Task',
        real_due_date: expect.stringContaining('2026-01-15'),
        category: '',
        description: '',
      })
    })
  })

  it('clears form after successful submission', async () => {
    const onAdd = vi.fn().mockResolvedValue({ error: null })
    render(<AddTaskForm onAdd={onAdd} theme="hinged" />)

    const titleInput = screen.getByPlaceholderText(/task title/i) as HTMLInputElement
    fireEvent.change(titleInput, { target: { value: 'New Task' } })
    fireEvent.change(screen.getByLabelText(/due date/i), {
      target: { value: '2026-01-15' }
    })
    fireEvent.click(screen.getByRole('button', { name: /add/i }))

    await waitFor(() => {
      expect(titleInput.value).toBe('')
    })
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - AddTaskForm doesn't exist

**Step 3: Implement AddTaskForm**

Create `src/components/AddTaskForm.tsx`:
```tsx
// ABOUTME: Form component for adding new tasks.
// ABOUTME: Collects title, due date, optional category and description.

import { useState, FormEvent } from 'react'
import { CreateTaskInput } from '../types/task'

interface AddTaskFormProps {
  onAdd: (task: CreateTaskInput) => Promise<{ error: Error | null }>
  theme: 'hinged' | 'unhinged'
}

export default function AddTaskForm({ onAdd, theme }: AddTaskFormProps) {
  const [title, setTitle] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !dueDate) return

    setSubmitting(true)
    setError(null)

    const { error } = await onAdd({
      title: title.trim(),
      real_due_date: new Date(dueDate).toISOString(),
      category: category.trim(),
      description: description.trim(),
    })

    if (error) {
      setError(error.message)
    } else {
      setTitle('')
      setDueDate('')
      setCategory('')
      setDescription('')
    }
    setSubmitting(false)
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="space-y-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={theme === 'unhinged' ? "What are you procrastinating on?" : "Task title"}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="dueDate" className="block text-sm text-gray-600 mb-1">
              Due date {theme === 'unhinged' && <span className="text-xs">(we'll lie about this)</span>}
            </label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              min={minDate}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div className="flex-1">
            <label htmlFor="category" className="block text-sm text-gray-600 mb-1">
              Category (optional)
            </label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="work, personal..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting || !title.trim() || !dueDate}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting
            ? 'Adding...'
            : theme === 'unhinged'
              ? 'Add Task (good luck)'
              : 'Add Task'}
        </button>
      </div>
    </form>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add AddTaskForm component"
```

---

### Task 14: Create CompletionModal Component

**Files:**
- Create: `src/components/CompletionModal.tsx`
- Create: `src/components/CompletionModal.test.tsx`

**Step 1: Write test for CompletionModal**

Create `src/components/CompletionModal.test.tsx`:
```tsx
// ABOUTME: Tests for the CompletionModal component.
// ABOUTME: Verifies the dopamine-hit reveal showing real vs fake dates.

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import CompletionModal from './CompletionModal'

describe('CompletionModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    taskTitle: 'Test Task',
    realDueDate: new Date('2026-01-15'),
    completedAt: new Date('2026-01-13'),
    wasOnTime: true,
    theme: 'hinged' as const,
  }

  it('shows task title', () => {
    render(<CompletionModal {...defaultProps} />)
    expect(screen.getByText('Test Task')).toBeInTheDocument()
  })

  it('shows early completion message when on time', () => {
    render(<CompletionModal {...defaultProps} />)
    expect(screen.getByText(/2 days early/i)).toBeInTheDocument()
  })

  it('shows late message when not on time', () => {
    render(<CompletionModal {...defaultProps} wasOnTime={false} completedAt={new Date('2026-01-16')} />)
    expect(screen.getByText(/1 day late/i)).toBeInTheDocument()
  })

  it('calls onClose when close button clicked', () => {
    const onClose = vi.fn()
    render(<CompletionModal {...defaultProps} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })

  it('does not render when isOpen is false', () => {
    render(<CompletionModal {...defaultProps} isOpen={false} />)
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument()
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - CompletionModal doesn't exist

**Step 3: Implement CompletionModal**

Create `src/components/CompletionModal.tsx`:
```tsx
// ABOUTME: Modal showing the reveal when a task is completed.
// ABOUTME: Displays real due date and how early/late the task was finished.

interface CompletionModalProps {
  isOpen: boolean
  onClose: () => void
  taskTitle: string
  realDueDate: Date
  completedAt: Date
  wasOnTime: boolean
  theme: 'hinged' | 'unhinged'
}

export default function CompletionModal({
  isOpen,
  onClose,
  taskTitle,
  realDueDate,
  completedAt,
  wasOnTime,
  theme,
}: CompletionModalProps) {
  if (!isOpen) return null

  const diffMs = realDueDate.getTime() - completedAt.getTime()
  const diffDays = Math.abs(Math.round(diffMs / (1000 * 60 * 60 * 24)))
  const diffHours = Math.abs(Math.round(diffMs / (1000 * 60 * 60)))

  const timeText = diffDays > 0
    ? `${diffDays} day${diffDays === 1 ? '' : 's'}`
    : `${diffHours} hour${diffHours === 1 ? '' : 's'}`

  const hingedMessages = {
    early: `Nice work. You finished ${timeText} ahead of schedule.`,
    onTime: 'Completed right on time.',
    late: `Completed ${timeText} late, but it's done now.`,
  }

  const unhingedMessages = {
    early: `OH THANK GOD. You actually did it. ${timeText} early. I'm genuinely shocked.`,
    onTime: `You finished EXACTLY on time. The universe aligned. What are the odds.`,
    late: `${timeText} late. But hey, you're here now. We don't judge. (We judge a little.)`,
  }

  const messages = theme === 'unhinged' ? unhingedMessages : hingedMessages
  const message = wasOnTime
    ? (diffDays > 0 || diffHours > 0 ? messages.early : messages.onTime)
    : messages.late

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 text-center">
        {theme === 'unhinged' && wasOnTime && (
          <div className="text-6xl mb-4">🎉</div>
        )}

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {theme === 'unhinged' ? 'THE REVEAL' : 'Task Completed'}
        </h2>

        <p className="text-lg font-medium text-gray-800 mb-4">{taskTitle}</p>

        <div className="bg-gray-100 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 mb-1">Real due date was:</p>
          <p className="text-lg font-semibold text-gray-900">
            {realDueDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        <p className={`text-lg mb-6 ${wasOnTime ? 'text-green-600' : 'text-amber-600'}`}>
          {message}
        </p>

        <button
          onClick={onClose}
          aria-label="Close modal"
          className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800"
        >
          {theme === 'unhinged' ? 'Nice.' : 'Close'}
        </button>
      </div>
    </div>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add CompletionModal with reveal celebration"
```

---

### Task 15: Create ThemeToggle Component

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Create: `src/components/ThemeToggle.test.tsx`

**Step 1: Write test for ThemeToggle**

Create `src/components/ThemeToggle.test.tsx`:
```tsx
// ABOUTME: Tests for the ThemeToggle component.
// ABOUTME: Verifies hinged/unhinged theme switching.

import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ThemeToggle from './ThemeToggle'

describe('ThemeToggle', () => {
  it('shows current theme', () => {
    render(<ThemeToggle theme="hinged" onToggle={vi.fn()} />)
    expect(screen.getByText(/hinged/i)).toBeInTheDocument()
  })

  it('calls onToggle with opposite theme when clicked', () => {
    const onToggle = vi.fn()
    render(<ThemeToggle theme="hinged" onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledWith('unhinged')
  })

  it('toggles from unhinged to hinged', () => {
    const onToggle = vi.fn()
    render(<ThemeToggle theme="unhinged" onToggle={onToggle} />)
    fireEvent.click(screen.getByRole('button'))
    expect(onToggle).toHaveBeenCalledWith('hinged')
  })
})
```

**Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL - ThemeToggle doesn't exist

**Step 3: Implement ThemeToggle**

Create `src/components/ThemeToggle.tsx`:
```tsx
// ABOUTME: Toggle button for switching between hinged and unhinged themes.
// ABOUTME: The fun alternative to boring light/dark mode.

interface ThemeToggleProps {
  theme: 'hinged' | 'unhinged'
  onToggle: (theme: 'hinged' | 'unhinged') => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const handleToggle = () => {
    onToggle(theme === 'hinged' ? 'unhinged' : 'hinged')
  }

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
      title={`Switch to ${theme === 'hinged' ? 'unhinged' : 'hinged'} mode`}
    >
      <span className="text-sm">
        {theme === 'hinged' ? '😌' : '🤪'}
      </span>
      <span className="text-sm font-medium text-gray-700">
        {theme === 'hinged' ? 'Hinged' : 'Unhinged'}
      </span>
    </button>
  )
}
```

**Step 4: Run test to verify it passes**

Run: `npm test`
Expected: All tests pass

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add ThemeToggle component"
```

---

## Phase 7: Main App Assembly

### Task 16: Create TaskList Page and Wire Everything Together

**Files:**
- Create: `src/pages/TaskListPage.tsx`
- Modify: `src/App.tsx`

**Step 1: Create TaskListPage**

Create `src/pages/TaskListPage.tsx`:
```tsx
// ABOUTME: Main page displaying the task list with add form.
// ABOUTME: Orchestrates task management and completion reveals.

import { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import { useProfile } from '../hooks/useProfile'
import { useAuth } from '../contexts/AuthContext'
import TaskCard from '../components/TaskCard'
import AddTaskForm from '../components/AddTaskForm'
import CompletionModal from '../components/CompletionModal'
import ThemeToggle from '../components/ThemeToggle'

interface CompletionData {
  taskTitle: string
  realDueDate: Date
  completedAt: Date
  wasOnTime: boolean
}

export default function TaskListPage() {
  const { user, signOut } = useAuth()
  const { profile, updateProfile } = useProfile()
  const { tasks, addTask, completeTask, deleteTask, loading } = useTasks()
  const [completionData, setCompletionData] = useState<CompletionData | null>(null)

  const theme = profile?.theme ?? 'hinged'
  const pendingTasks = tasks.filter(t => t.status === 'pending')

  const handleComplete = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) return

    const { wasOnTime, realDueDate } = await completeTask(taskId)

    if (wasOnTime !== undefined) {
      setCompletionData({
        taskTitle: task.title,
        realDueDate: realDueDate!,
        completedAt: new Date(),
        wasOnTime,
      })
    }
  }

  const handleThemeToggle = async (newTheme: 'hinged' | 'unhinged') => {
    await updateProfile({ theme: newTheme })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading your lies...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              {theme === 'unhinged' ? 'Liars Todo 🤥' : 'Liars Todo'}
            </h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle theme={theme} onToggle={handleThemeToggle} />
            <button
              onClick={signOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <AddTaskForm onAdd={addTask} theme={theme} />

        {pendingTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {theme === 'unhinged'
                ? "No tasks? Suspicious. What are you hiding?"
                : "No tasks yet. Add one above."}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={handleComplete}
                onDelete={deleteTask}
                theme={theme}
              />
            ))}
          </div>
        )}

        {profile && (
          <div className="text-center text-sm text-gray-500">
            Reliability score: {profile.reliability_score}%
            {theme === 'unhinged' && profile.reliability_score < 50 && (
              <span className="ml-2">(yikes)</span>
            )}
          </div>
        )}
      </main>

      <CompletionModal
        isOpen={!!completionData}
        onClose={() => setCompletionData(null)}
        taskTitle={completionData?.taskTitle ?? ''}
        realDueDate={completionData?.realDueDate ?? new Date()}
        completedAt={completionData?.completedAt ?? new Date()}
        wasOnTime={completionData?.wasOnTime ?? true}
        theme={theme}
      />
    </div>
  )
}
```

**Step 2: Update App.tsx to use TaskListPage**

Edit `src/App.tsx`:
```tsx
// ABOUTME: Root application component.
// ABOUTME: Sets up auth provider and routes between login and main app.

import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginPage from './pages/LoginPage'
import TaskListPage from './pages/TaskListPage'

function AppContent() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <TaskListPage />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
```

**Step 3: Run all tests**

Run: `npm test`
Expected: All tests pass

**Step 4: Test manually**

Run: `npm run dev`
Expected: App loads, can log in, add tasks, see fake dates, complete tasks with reveal

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire up TaskListPage with full task management flow"
```

---

## Phase 8: Reliability Score Updates

### Task 17: Add Reliability Score Adjustment on Task Completion

**Files:**
- Modify: `src/hooks/useTasks.ts`
- Modify: `src/hooks/useProfile.ts`

**Step 1: Update useProfile to expose score adjustment**

Add to `src/hooks/useProfile.ts`:
```ts
const adjustReliabilityScore = async (wasOnTime: boolean) => {
  if (!profile) return

  // Adjust score: +5 for on-time, -10 for late (asymmetric penalty)
  const adjustment = wasOnTime ? 5 : -10
  const newScore = Math.max(0, Math.min(100, profile.reliability_score + adjustment))

  await updateProfile({ reliability_score: newScore })
}

// Add to return statement:
return { profile, loading, error, updateProfile, adjustReliabilityScore }
```

**Step 2: Update useTasks to call score adjustment**

Modify the `completeTask` function in `src/hooks/useTasks.ts` to call `adjustReliabilityScore` after updating task. Add useProfile import and call:

```ts
// In useTasks.ts, import adjustReliabilityScore from useProfile
// After successful task completion, call:
// adjustReliabilityScore(wasOnTime)
```

**Step 3: Test manually**

Complete a task and verify reliability score changes.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: adjust reliability score on task completion"
```

---

## Future Phases (Not in Initial MVP)

The following features are documented for future implementation:

### Phase 9: Browser Push Notifications
- Service worker for push notifications
- Permission request flow
- Notification scheduling based on fake due dates

### Phase 10: Email Notifications
- Supabase Edge Functions for email scheduling
- Daily digest emails
- Escalating notification emails

### Phase 11: Hidden Snooze Feature
- Easter egg snooze functionality
- Konami code or hidden gesture to access
- Temporary notification pause

---

## Quick Reference

**Run dev server:** `npm run dev`
**Run tests:** `npm test`
**Build for production:** `npm run build`
**Preview production build:** `npm run preview`

**Supabase dashboard:** https://supabase.com/dashboard

**Key files:**
- Lie algorithm: `src/lib/lieCalculator.ts`
- Task management: `src/hooks/useTasks.ts`
- Auth: `src/contexts/AuthContext.tsx`
- Main page: `src/pages/TaskListPage.tsx`
