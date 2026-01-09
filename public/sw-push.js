// ABOUTME: Service worker extension for push notifications.
// ABOUTME: Handles incoming push events and notification clicks.

self.addEventListener('push', (event) => {
  if (!event.data) return

  let data
  try {
    data = event.data.json()
  } catch (err) {
    console.error('Failed to parse push notification data:', err)
    return
  }

  const options = {
    body: data.body,
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
    tag: data.tag || 'tick-notification',
    data: {
      taskId: data.taskId,
      url: data.url || '/',
    },
    requireInteraction: data.requireInteraction || false,
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Tick Reminder', options)
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  const urlToOpen = event.notification.data?.url || '/'

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((windowClients) => {
        // Check if there's already a window open
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            client.focus()
            if (event.notification.data?.taskId) {
              client.postMessage({
                type: 'NOTIFICATION_CLICK',
                taskId: event.notification.data.taskId,
              })
            }
            return
          }
        }
        // Open new window if none exists
        return clients.openWindow(urlToOpen)
      })
      .catch((err) => {
        console.error('Failed to match windows:', err)
        return clients.openWindow(urlToOpen)
      })
  )
})
