const APP_PREFIX ="BudgetTracker-";
const VERSION = "version-01";
const CACHE_NAME = APP_PREFIX + VERSION;
const FILES_TO_CACHE = [
    "index.html",
 "/css/styles.css",
 "/js/index.js"
  ];

  self.addEventListener('fetch', function(e){
    console.log('fetch request: ' + e.request.url)
    e.respondWith(
        catches.match(e.request).then(function(request){
            if(request){// if caches is available, responde with cathe
                console.log('responding with cache:' + e.request.url )
                return request
            } else { // if there are no cache, try fetching request
                console.log('file is not cached, fetching: ' + e.request.url)
                return fetch(e.request)
            }
            // you can omit if/else for console.log& put one line below like this too
            // return request || fetch(e.request)
        })
    )
})
self.addEventListener('install',function(e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            console.log("installing cache: " + CACHE_NAME);
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', function(e){
    e.waitUntil(
        caches.keys().then(function(keyList){
            let cacheKeeplist = keyList.filter(function(key){
                return key.indexOf(APP_PREFIX)
            })
            cacheKeeplist.push(CACHE_NAME);
            return Promise.all(keyList.map(function(key,i){
                if(cacheKeeplist.indexOf(key)=== -1){
                    console.log('deleting cache:' + keyList[i]);
                    return caches.delete(keyList[i])
                }
            }))
        })
    )
})