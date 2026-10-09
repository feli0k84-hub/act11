self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('v2')
            .then(cache => {
                cache.addAll([
                    '/',
                    '/script.js',
                    '/obj.png',
                    '/scramble.txt',
                ]);
                console.log("Asset cached.");
            })
            .catch(err => console.log("Could not cache."))
    )
});

self.addEventListener('fetch', event => {
    console.log("INTERCEPTED");

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            console.log("V2 The resquet:", event.request);
            console.log("V1 Got the response:...", response);

            //from cache or fetched if not
            return response || fetch(event.request);

            // target specific request object and respond with different data but same type
            //if (event.request.url === 'http://127.0.0.1:5500/obj.png') {
            //    return fetch('https://picsum.photos/800');
            // } else {
            //    return response;
            // }
            
            // target specific request object and respond with different data but same type; save response to cache
            // if (event.request.url === 'http://127.0.0.1:5500/obj.png') {
            //    return fetch('https://picsum.photos/800')
            //    .then(res => {
            //        return caches.open('v1')
            //        .then(cache => {
            //            cache.put(event.request, res.clone());
            //            return res;
            //        })
            //    });
            //    } else {
            //        return response;
            //    }
              
            //return other site - must be non CORS-blocked instead of the initial index.html (index.html always first to be fetched)
            //return fetch('https://jsonplaceholder.typicode.com/todos/1')

            //return an empty RESPONSE object or a RESPONSE object with data inside
            //return new Response();
        })
        .catch(err => {
            console.log("Could not find matching request.");
            return null;
       })
    )
});

