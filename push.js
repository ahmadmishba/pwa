var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOWmV1h5X0Mcx6dD6SU4eomHzowczIkwqtYWqVN52rJLuq261dI4TMkWqzOZI6yxI0VRo6NtkJfNpIiZcBWSV9U",
   "privateKey": "BMrV4s92LAuicp1FtMbHdoKG9ccgFN0Xu_llKBvJX5A"
};
 
 
webPush.setVapidDetails(
   'mailto:ahmadmishba714@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABfG0L34u1aSs8xd2bCj8dZoQdXv4Yj9BWw1BOptj-LUV7X7KPSAQiArGhqE9nXNLIwb5WA_EJtEmobQqIY2wFZG3JOjEnxmszh9W2Q4KPNRXb41Y9o-6Br81dyOXEZlarlMdrUOZMEfOOo1lPsc_joFsWlKCUXoN51PHNK3kB9k_Qd_u4",
   "keys": {
       "p256dh": "BKxrvZvJtjbnxfU6u6LNJiOBWaTIdW/Q2KQX674goWp3U+TltASXGF1Smhy3kPcAP7BLrmCWYPkPrRyaqYc3B8I=",
       "auth": "VPsQOq7DOt7INT2uoYmsdw=="
   }
};
var payload = 'Welcome to Push Notification AISB';
 
var options = {
   gcmAPIKey: '879237703148',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);