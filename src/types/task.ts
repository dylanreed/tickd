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
  is_snoozed: boolean
}

export interface CreateTaskInput {
  title: string
  description?: string
  real_due_date: string
  category?: string
}
