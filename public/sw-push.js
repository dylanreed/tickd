// ABOUTME: Service worker extension for push notifications.
// ABOUTME: Handles incoming push events and notification clicks.

self.addEventListener('push', (event) => {
  console.log('Push event received:', event)
  console.log('Push data:', event.data)

  let data = {}
  if (event.data) {
    try {
      data = event.data.json()
      console.log('Parsed JSON data:', data)
    } catch (err) {
      // If JSON parse fails, try text
      const text = event.data.text()
      console.log('Push data as text:', text)
      data = { title: 'Tick Reminder', body: text }
    }
  }

  const options = {
    body: data.body || 'You have a task reminder',
    icon: '/icon-192.svg',
    badge: '/icon-192.svg',
    tag: data.tag || 'tick-notification',
    data: {
      taskId: data.taskId,
      url: data.url || '/',
    },
    requireInteraction: data.requireInteraction || false,
  }

  console.log('Showing notification with options:', options)

  event.waitUntil(
    self.registration.showNotification(data.title || 'Tick Reminder', options)
      .then(() => console.log('Notification shown successfully'))
      .catch((err) => console.error('Failed to show notification:', err))
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
