// ABOUTME: Hook for managing tasks with fake due date calculations.
// ABOUTME: Provides CRUD operations and enriches tasks with lie data.

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { useProfile } from './useProfile'
import type { Task, TaskWithFakeDate, CreateTaskInput } from '../types/task'
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
      setError(null)
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
        description: input.description ?? null,
        real_due_date: input.real_due_date,
        category: input.category ?? null,
      } as never)
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
      } as never)
      .eq('id', taskId)
      .select()
      .single()

    if (!error && data) {
      setTasks(prev => prev.map(t => t.id === taskId ? enrichTask(data) : t))
    }

    const taskData = data as Task | null
    return { data, error, wasOnTime, realDueDate: realDue, completedAt: taskData?.completed_at ? new Date(taskData.completed_at) : null }
  }

  const deleteTask = async (taskId: string) => {
    if (!user) return { error: new Error('Not authenticated') }

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', user.id)

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
