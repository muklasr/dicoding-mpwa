// Periksa fitur Notification API
if ("Notification" in window) {
  requestPermission();
} else {
  console.error("Browser tidak mendukung notifikasi.");
}

// Meminta ijin menggunakan Notification API
function requestPermission() {
  Notification.requestPermission().then(function (result) {
    if (result === "denied") {
      console.log("Fitur notifikasi tidak diijinkan.");
      return;
    } else if (result === "default") {
      console.error("Pengguna menutup kotak dialog permintaan ijin.");
      return;
    }

    console.log("Fitur notifikasi diijinkan.");
  });
}

function showNotifikasiSederhana() {
  const title = "Notifikasi Sederhana";
  const options = {
    body: "Ini adalah konten notifikasi. \nBisa menggunakan baris baru.",
    requireInteraction: true,
    icon: "img/icons/icon-144x144.png",
    badge: "img/icons/icon-96x96.png",
    tag: "footballnet-group-1",
    renotify: true,
  };
  if (Notification.permission === "granted") {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error("FItur notifikasi tidak diijinkan.");
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ("PushManager" in window) {
  navigator.serviceWorker.getRegistration().then(function (registration) {
    registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          "BGlPBO7VnWbivmhazy1Sz2rbIWc0efgk4vfyxxCyjJgIwd6QcUUJarSRziBWvWbkEbFz2O_PcWKzBcPnrTJfDMg"
        ),
      })
      .then(function (subscribe) {
        console.log(
          "Berhasil melakukan subscribe dengan endpoint: ",
          subscribe.endpoint
        );
        console.log(
          "Berhasil melakukan subscribe dengan p256dh key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("p256dh"))
            )
          )
        );
        console.log(
          "Berhasil melakukan subscribe dengan auth key: ",
          btoa(
            String.fromCharCode.apply(
              null,
              new Uint8Array(subscribe.getKey("auth"))
            )
          )
        );
      })
      .catch(function (e) {
        console.error("Tidak dapat melakukan subscribe ", e.message);
      });
  });
}
