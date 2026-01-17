// ABOUTME: Manages background timers for time awareness alerts.
// ABOUTME: Handles milestone and estimate-relative notifications.

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  getTimeAlertMessage,
  getMilestoneContext,
  getEstimateOverageContext,
} from '../data/timeAlertMessages'
import type { SpicyLevel } from '../data/timeAlertMessages'

interface Alert {
  id: string
  message: string
  type: 'milestone' | 'estimate'
}

interface UseTimeAlertsConfig {
  enabled: boolean
  milestoneEnabled: boolean
  estimateEnabled: boolean
  spicyLevel: SpicyLevel
  activeTaskId: string | null
  taskStartTime: Date | null
  estimatedMinutes: number | null
}

interface UseTimeAlertsReturn {
  currentAlert: Alert | null
  dismissAlert: () => void
  clearAlerts: () => void
}

// Milestone thresholds in minutes
const MILESTONE_THRESHOLDS = [30, 60, 120, 180]

export function useTimeAlerts(config: UseTimeAlertsConfig): UseTimeAlertsReturn {
  const {
    enabled,
    milestoneEnabled,
    estimateEnabled,
    spicyLevel,
    activeTaskId,
    taskStartTime,
    estimatedMinutes,
  } = config

  const [currentAlert, setCurrentAlert] = useState<Alert | null>(null)
  const [lastMilestone, setLastMilestone] = useState<number>(0)
  const [lastEstimateAlert, setLastEstimateAlert] = useState<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Check for alerts
  const checkAlerts = useCallback(() => {
    if (!enabled || !activeTaskId || !taskStartTime) return

    const elapsedMs = Date.now() - taskStartTime.getTime()
    const elapsedMinutes = Math.floor(elapsedMs / (1000 * 60))

    // Check milestone alerts
    if (milestoneEnabled) {
      for (const threshold of MILESTONE_THRESHOLDS) {
        if (elapsedMinutes >= threshold && lastMilestone < threshold) {
          const context = getMilestoneContext(threshold)
          if (context) {
            const message = getTimeAlertMessage(context, spicyLevel)
            setCurrentAlert({
              id: `milestone-${threshold}-${Date.now()}`,
              message,
              type: 'milestone',
            })
            setLastMilestone(threshold)
            return // Only one alert at a time
          }
        }
      }
    }

    // Check estimate overage alerts
    if (estimateEnabled && estimatedMinutes && estimatedMinutes > 0) {
      const ratio = elapsedMinutes / estimatedMinutes

      // Alert at 1.5x, 2x, 3x
      const thresholds = [1.5, 2, 3]
      for (const threshold of thresholds) {
        if (ratio >= threshold && lastEstimateAlert < threshold) {
          const context = getEstimateOverageContext(threshold)
          if (context) {
            const message = getTimeAlertMessage(context, spicyLevel)
            setCurrentAlert({
              id: `estimate-${threshold}-${Date.now()}`,
              message,
              type: 'estimate',
            })
            setLastEstimateAlert(threshold)
            return // Only one alert at a time
          }
        }
      }
    }
  }, [
    enabled,
    milestoneEnabled,
    estimateEnabled,
    activeTaskId,
    taskStartTime,
    estimatedMinutes,
    spicyLevel,
    lastMilestone,
    lastEstimateAlert,
  ])

  // Set up interval to check alerts
  useEffect(() => {
    if (!enabled || !activeTaskId) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    // Check immediately
    checkAlerts()

    // Then check every minute
    intervalRef.current = setInterval(checkAlerts, 60000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [enabled, activeTaskId, checkAlerts])

  // Reset tracking when task changes
  useEffect(() => {
    setLastMilestone(0)
    setLastEstimateAlert(0)
    setCurrentAlert(null)
  }, [activeTaskId])

  const dismissAlert = useCallback(() => {
    setCurrentAlert(null)
  }, [])

  const clearAlerts = useCallback(() => {
    setCurrentAlert(null)
    setLastMilestone(0)
    setLastEstimateAlert(0)
  }, [])

  return {
    currentAlert,
    dismissAlert,
    clearAlerts,
  }
}
