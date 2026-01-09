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
          subscription_status: 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired'
          trial_ends_at: string | null
          stripe_customer_id: string | null
          subscription_id: string | null
          spicy_level: number
          created_at: string
        }
        Insert: {
          id: string
          email: string
          reliability_score?: number
          theme?: 'hinged' | 'unhinged'
          notification_preferences?: 'email' | 'browser' | 'both' | 'none'
          subscription_status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired'
          trial_ends_at?: string | null
          stripe_customer_id?: string | null
          subscription_id?: string | null
          spicy_level?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          reliability_score?: number
          theme?: 'hinged' | 'unhinged'
          notification_preferences?: 'email' | 'browser' | 'both' | 'none'
          subscription_status?: 'trialing' | 'active' | 'past_due' | 'canceled' | 'expired'
          trial_ends_at?: string | null
          stripe_customer_id?: string | null
          subscription_id?: string | null
          spicy_level?: number
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
      excuses: {
        Row: {
          id: string
          task_id: string
          user_id: string
          excuse_text: string
          postponed_until: string
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          user_id: string
          excuse_text: string
          postponed_until: string
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          user_id?: string
          excuse_text?: string
          postponed_until?: string
          created_at?: string
        }
      }
      monthly_stats_log: {
        Row: {
          id: string
          user_id: string
          month_year: string
          sent_at: string
        }
        Insert: {
          id?: string
          user_id: string
          month_year: string
          sent_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          month_year?: string
          sent_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
