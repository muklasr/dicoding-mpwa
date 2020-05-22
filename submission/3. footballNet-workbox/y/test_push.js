var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BGlPBO7VnWbivmhazy1Sz2rbIWc0efgk4vfyxxCyjJgIwd6QcUUJarSRziBWvWbkEbFz2O_PcWKzBcPnrTJfDMg",
   "privateKey": "yvd4h_do0bjFN6ZsA1l_fREHzq8HAX4YEa5yQSRv-Z0"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fIc05dMF918:APA91bEfbgrwwtQ2MSr9UlIfLeLLMSLp25-8aHPP-wuHRnSFMznRH6tFtl_IA-VgBJ78-eJJ-0r3NJPEtYPDaHWPzUaaYq5swMgDvezLI7w0Rhdb6YeuM_0CcwwQFOF-W6u_mtvBYRF-",
   "keys": {
       "p256dh": "BAWiRs0uXUVJRpeuM37oHe+qkLAkqnhwqHxDHWqA311VdqxhP6hNRWmOfmg6keruAOXNr10CnRDe/eBGnuo49yA=",
       "auth": "I8xGMLpI4vKtIv3z4smaVA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '321567161004',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);