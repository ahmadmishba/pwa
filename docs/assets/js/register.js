// periksa service worker
if ("serviceWorker" in navigator) {
    registerSw();
} else {
    console.log("Browser belum mendukung SW.");
}

// periksa service worker
if ("Notification" in window) {
    requestPermission();
    console.log("Notifikasi diijinkan.");
} else {
    console.log("Browser belum mendukung Notifikasi.");
}

// regist sw
function registerSw() {
    return navigator.serviceWorker.register("service-worker.js")
    .then(registration => {
        console.log("SW berhasil didaftarkan.");
        return registration;
    })
    .catch(err => {
        console.log("SW gagal didaftarkan", err);
    });
}

// req permission
function requestPermission() {
    if ('Notification' in window) {
        Notification.requestPermission().then(result => {
            if (result === "denied") {
                console.log("Notif tidak diijinkan.");
                return;
            } else if (result === "default") {
                console.error("Pengguna menutup kotak dialog ijin notif.");
                return;
            }
            
            // if sw ready then do ..
            navigator.serviceWorker.ready.then(() => {
                if (('PushManager' in window)) {
                    console.log('PushManager is exist.')
                    navigator.serviceWorker.getRegistration()
                    .then(registration => {
                        registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BOWmV1h5X0Mcx6dD6SU4eomHzowczIkwqtYWqVN52rJLuq261dI4TMkWqzOZI6yxI0VRo6NtkJfNpIiZcBWSV9U")
                        }).then(subscribe => {
                            console.log('Success to subscribe endpoint: ', subscribe.endpoint);
                            console.log('Success to subscribe p256dh key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Success to subscribe auth key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(e => {
                            console.error('Error : ', e.message);
                        });
                    });
                }
            })
        });
    }
}

// for enct. app key
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}