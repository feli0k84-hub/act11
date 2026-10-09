let registration = null;

function register_Service_Worker() {
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('./sw.js')
.then(registration => {
console.log("Service Worker successfully registered.", registration);
})
.catch(error => {
console.log("Could not register service worker:", error);
});
}

}

function unregister_Service_Worker() {
    navigator.serviceWorker.getRegistrations()
        .then(registrations => {
            registrations.forEach(registration => {
                registration.unregister();
                console.log("Service Worker unregistered.");
            });
        })
        .catch(err => {
        console.log("Could not unregister service worker.");
        });
}

window.addEventListener('load', () => {
    fetch('/obj.png')
        .then(res => console.log('From script.js: ' + res))
});
register_Service_Worker();
//unregister_Service_Worker();