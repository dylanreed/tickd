// ABOUTME: Hook for managing browser push notification subscriptions.
// ABOUTME: Handles permission requests, subscribing to push, and Supabase storage.

import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'not_supported'

interface PushSubscriptionHookResult {
  permissionState: PermissionState
  isSubscribed: boolean
  isSupported: boolean
  loading: boolean
  subscribe: () => Promise<{ error: Error | null }>
  unsubscribe: () => Promise<{ error: Error | null }>
}

function isPushSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'PushManager' in window &&
    'Notification' in window
  )
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export function usePushSubscription(): PushSubscriptionHookResult {
  const { user } = useAuth()
  const [permissionState, setPermissionState] = useState<PermissionState>('prompt')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [loading, setLoading] = useState(true)
  const isSupported = isPushSupported()

  useEffect(() => {
    if (!isSupported) {
      setPermissionState('not_supported')
      setLoading(false)
      return
    }

    const checkPermissionAndSubscription = async () => {
      const permission = Notification.permission
      if (permission === 'granted') {
        setPermissionState('granted')
      } else if (permission === 'denied') {
        setPermissionState('denied')
      } else {
        setPermissionState('prompt')
      }

      try {
        const registration = await navigator.serviceWorker.ready
        const subscription = await registration.pushManager.getSubscription()
        setIsSubscribed(!!subscription)
      } catch (err) {
        console.error('Failed to check push subscription:', err)
        setIsSubscribed(false)
      }

      setLoading(false)
    }

    checkPermissionAndSubscription()
  }, [isSupported])

  const subscribe = useCallback(async (): Promise<{ error: Error | null }> => {
    if (loading) {
      return { error: new Error('Operation in progress') }
    }

    if (!user) {
      return { error: new Error('User not authenticated') }
    }

    if (!isSupported) {
      return { error: new Error('Push notifications not supported') }
    }

    setLoading(true)
    try {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        setPermissionState('granted')
      } else if (permission === 'denied') {
        setPermissionState('denied')
        return { error: new Error('Notification permission denied') }
      }

      const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY
      if (!vapidPublicKey) {
        return { error: new Error('VAPID public key not configured') }
      }

      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey) as BufferSource,
      })

      const subscriptionJson = subscription.toJSON()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { error: dbError } = await (supabase as any).from('push_subscriptions').insert({
        user_id: user.id,
        endpoint: subscriptionJson.endpoint ?? '',
        p256dh_key: subscriptionJson.keys?.p256dh ?? '',
        auth_key: subscriptionJson.keys?.auth ?? '',
      })

      if (dbError) {
        // Check if error is due to unique constraint violation (subscription already exists)
        if (dbError.code === '23505' || dbError.message?.includes('duplicate')) {
          // Subscription already exists, treat as success
          setIsSubscribed(true)
          return { error: null }
        }
        await subscription.unsubscribe()
        return { error: new Error(dbError.message) }
      }

      setIsSubscribed(true)
      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Unknown error') }
    } finally {
      setLoading(false)
    }
  }, [user, isSupported, loading])

  const unsubscribe = useCallback(async (): Promise<{ error: Error | null }> => {
    if (loading) {
      return { error: new Error('Operation in progress') }
    }

    if (!user) {
      return { error: new Error('User not authenticated') }
    }

    if (!isSupported) {
      return { error: new Error('Push notifications not supported') }
    }

    setLoading(true)
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        const endpoint = subscription.endpoint
        await subscription.unsubscribe()

        const { error: dbError } = await supabase
          .from('push_subscriptions')
          .delete()
          .eq('user_id', user.id)
          .eq('endpoint', endpoint)

        if (dbError) {
          return { error: new Error(dbError.message) }
        }
      }

      setIsSubscribed(false)
      return { error: null }
    } catch (err) {
      return { error: err instanceof Error ? err : new Error('Unknown error') }
    } finally {
      setLoading(false)
    }
  }, [user, isSupported, loading])

  return {
    permissionState,
    isSubscribed,
    isSupported,
    loading,
    subscribe,
    unsubscribe,
  }
}
