// ===== PLUGIA SERVICE WORKER =====

const CACHE_NAME = 'plugia-v1.0.0';
const STATIC_CACHE = 'plugia-static-v1.0.0';
const DYNAMIC_CACHE = 'plugia-dynamic-v1.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/solutions.html',
  '/differentials.html',
  '/methodology.html',
  '/partnerships.html',
  '/faq.html',
  '/trends.html',
  '/contact.html',
  '/styles.css',
  '/script.js',
  '/js/i18n.js',
  '/translations/pt-br.json',
  '/translations/en-us.json',
  '/manifest.json'
];

// Files to cache on demand
const DYNAMIC_FILES = [
  '/privacy.html',
  '/terms.html',
  '/cookies.html',
  '/platform.html',
  '/cases.html',
  '/company.html',
  '/price.html'
];

// Network-first resources (always try network first)
const NETWORK_FIRST = [
  '/send.php',
  '/send_lead.php',
  'https://www.google-analytics.com',
  'https://www.googletagmanager.com',
  'https://connect.facebook.net'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Error caching static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached files or fetch from network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except analytics)
  if (url.origin !== location.origin && !isAnalyticsRequest(url)) {
    return;
  }
  
  // Handle different caching strategies
  if (isNetworkFirst(request.url)) {
    event.respondWith(networkFirst(request));
  } else if (isStaticFile(request.url)) {
    event.respondWith(cacheFirst(request));
  } else {
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Caching strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline content not available', { status: 503 });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    return new Response('Network and cache failed', { status: 503 });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(error => {
    console.log('Network request failed:', error);
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticFile(url) {
  return STATIC_FILES.some(file => url.includes(file)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.json') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.svg') ||
         url.includes('.ico');
}

function isNetworkFirst(url) {
  return NETWORK_FIRST.some(pattern => url.includes(pattern));
}

function isAnalyticsRequest(url) {
  return url.hostname.includes('google-analytics.com') ||
         url.hostname.includes('googletagmanager.com') ||
         url.hostname.includes('facebook.net') ||
         url.hostname.includes('doubleclick.net');
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  } else if (event.tag === 'lead-form-sync') {
    event.waitUntil(syncLeadForms());
  }
});

async function syncContactForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    const formRequests = requests.filter(request => 
      request.url.includes('send.php') && request.method === 'POST'
    );
    
    for (const request of formRequests) {
      try {
        await fetch(request);
        await cache.delete(request);
        console.log('Contact form synced successfully');
      } catch (error) {
        console.error('Failed to sync contact form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function syncLeadForms() {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    const formRequests = requests.filter(request => 
      request.url.includes('send_lead.php') && request.method === 'POST'
    );
    
    for (const request of formRequests) {
      try {
        await fetch(request);
        await cache.delete(request);
        console.log('Lead form synced successfully');
      } catch (error) {
        console.error('Failed to sync lead form:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// Push notifications
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/assets/logo-192.png',
    badge: '/assets/badge-72.png',
    image: data.image,
    data: data.data,
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/assets/icon-open.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/assets/icon-close.png'
      }
    ],
    tag: data.tag || 'plugia-notification',
    renotify: true,
    requireInteraction: data.requireInteraction || false,
    silent: false,
    vibrate: [200, 100, 200]
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const urlToOpen = event.notification.data?.url || '/';
    
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then(clientList => {
          // Check if there's already a window/tab open with the target URL
          for (const client of clientList) {
            if (client.url === urlToOpen && 'focus' in client) {
              return client.focus();
            }
          }
          
          // If not, open a new window/tab
          if (clients.openWindow) {
            return clients.openWindow(urlToOpen);
          }
        })
    );
  }
});

// Message handling from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then(cache => cache.addAll(event.data.urls))
    );
  }
});

// Error handling
self.addEventListener('error', event => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('PlugIA Service Worker loaded successfully');
