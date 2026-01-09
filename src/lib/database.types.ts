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
