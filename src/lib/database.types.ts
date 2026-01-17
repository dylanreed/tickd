export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      excuses: {
        Row: {
          created_at: string
          excuse_text: string
          id: string
          postponed_until: string
          task_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          excuse_text: string
          id?: string
          postponed_until: string
          task_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          excuse_text?: string
          id?: string
          postponed_until?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "excuses_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "excuses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_stats_log: {
        Row: {
          id: string
          month_year: string
          sent_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          month_year: string
          sent_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          month_year?: string
          sent_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "monthly_stats_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_log: {
        Row: {
          channel: string
          id: string
          notification_type: string
          sent_at: string
          task_id: string
          user_id: string
        }
        Insert: {
          channel: string
          id?: string
          notification_type: string
          sent_at?: string
          task_id: string
          user_id: string
        }
        Update: {
          channel?: string
          id?: string
          notification_type?: string
          sent_at?: string
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_log_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          ambient_timer_enabled: boolean
          brain_state_affects_spiciness: boolean
          created_at: string
          daily_checkin_enabled: boolean
          deadline_visuals: string
          email: string
          estimate_alerts_enabled: boolean
          estimation_prompts_enabled: boolean
          id: string
          milestone_alerts: string
          notification_preferences: string
          onboarding_completed: boolean
          pick_for_me_enabled: boolean
          reliability_score: number
          show_earnout_progress: boolean
          single_task_escalation_enabled: boolean
          spicy_level: number | null
          stripe_customer_id: string | null
          subscription_id: string | null
          subscription_status: string
          theme: string
          time_sessions_enabled: boolean
          time_tools_enabled: boolean
          trial_ends_at: string | null
        }
        Insert: {
          ambient_timer_enabled?: boolean
          brain_state_affects_spiciness?: boolean
          created_at?: string
          daily_checkin_enabled?: boolean
          deadline_visuals?: string
          email: string
          estimate_alerts_enabled?: boolean
          estimation_prompts_enabled?: boolean
          id: string
          milestone_alerts?: string
          notification_preferences?: string
          onboarding_completed?: boolean
          pick_for_me_enabled?: boolean
          reliability_score?: number
          show_earnout_progress?: boolean
          single_task_escalation_enabled?: boolean
          spicy_level?: number | null
          stripe_customer_id?: string | null
          subscription_id?: string | null
          subscription_status?: string
          theme?: string
          time_sessions_enabled?: boolean
          time_tools_enabled?: boolean
          trial_ends_at?: string | null
        }
        Update: {
          ambient_timer_enabled?: boolean
          brain_state_affects_spiciness?: boolean
          created_at?: string
          daily_checkin_enabled?: boolean
          deadline_visuals?: string
          email?: string
          estimate_alerts_enabled?: boolean
          estimation_prompts_enabled?: boolean
          id?: string
          milestone_alerts?: string
          notification_preferences?: string
          onboarding_completed?: boolean
          pick_for_me_enabled?: boolean
          reliability_score?: number
          show_earnout_progress?: boolean
          single_task_escalation_enabled?: boolean
          spicy_level?: number | null
          stripe_customer_id?: string | null
          subscription_id?: string | null
          subscription_status?: string
          theme?: string
          time_sessions_enabled?: boolean
          time_tools_enabled?: boolean
          trial_ends_at?: string | null
        }
        Relationships: []
      }
      push_subscriptions: {
        Row: {
          auth_key: string
          created_at: string
          endpoint: string
          id: string
          p256dh_key: string
          user_id: string
        }
        Insert: {
          auth_key: string
          created_at?: string
          endpoint: string
          id?: string
          p256dh_key: string
          user_id: string
        }
        Update: {
          auth_key?: string
          created_at?: string
          endpoint?: string
          id?: string
          p256dh_key?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "push_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          actual_minutes: number | null
          category: string | null
          completed_at: string | null
          created_at: string
          description: string | null
          estimated_minutes: number | null
          id: string
          real_due_date: string
          status: string
          title: string
          user_id: string
          was_on_time: boolean | null
        }
        Insert: {
          actual_minutes?: number | null
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          real_due_date: string
          status?: string
          title: string
          user_id: string
          was_on_time?: boolean | null
        }
        Update: {
          actual_minutes?: number | null
          category?: string | null
          completed_at?: string | null
          created_at?: string
          description?: string | null
          estimated_minutes?: number | null
          id?: string
          real_due_date?: string
          status?: string
          title?: string
          user_id?: string
          was_on_time?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
