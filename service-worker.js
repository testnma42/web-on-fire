/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "1a7ab0f9b9f4efa0ebfca047b8682539"
  },
  {
    "url": "about/index.html",
    "revision": "e5b4d875d82269c0c45c4a0cc4da5ce5"
  },
  {
    "url": "assets/css/0.styles.31cac647.css",
    "revision": "8d8c32947cbecd6c1063c43d6cea5278"
  },
  {
    "url": "assets/js/10.8e551334.js",
    "revision": "7ecc3d27e06800f5bd2dbdcb60706b3a"
  },
  {
    "url": "assets/js/11.151a1bc5.js",
    "revision": "f5b9e3ba94236e314cc02d8ec736b83a"
  },
  {
    "url": "assets/js/12.9fea4da3.js",
    "revision": "0e087652a9d0af5064d03d7844d9d363"
  },
  {
    "url": "assets/js/2.102bb9b3.js",
    "revision": "85dbcb5293f22e93ab1955d7177bb709"
  },
  {
    "url": "assets/js/3.a6631c3a.js",
    "revision": "ef28bb73c9c08d72a3d283347174a751"
  },
  {
    "url": "assets/js/4.0d492230.js",
    "revision": "3a02d8179469c861aca2b9f17f2f68fa"
  },
  {
    "url": "assets/js/5.66929868.js",
    "revision": "089a56075c9b5aeecc1e83b60a661356"
  },
  {
    "url": "assets/js/6.3f8f84ab.js",
    "revision": "5f7126e71d65b8f5e883ad5fb57fdb24"
  },
  {
    "url": "assets/js/7.45817916.js",
    "revision": "c3c2d8306d268e81286e82a61d8e78c6"
  },
  {
    "url": "assets/js/8.a86c17b3.js",
    "revision": "7ade46fbc061b17bedb2f98f177ca9d4"
  },
  {
    "url": "assets/js/9.5251f82f.js",
    "revision": "7e49cc3d249316fc399683c24dd65a02"
  },
  {
    "url": "assets/js/app.402b172f.js",
    "revision": "b5291e32a7eab873667cebecd60301d0"
  },
  {
    "url": "codelabs/index.html",
    "revision": "a9a49f63257ddfe5ac38b8f880433b5d"
  },
  {
    "url": "conferences/index.html",
    "revision": "6494eff7b3c5d13707e953306be05c96"
  },
  {
    "url": "favicon/android-icon-144x144.png",
    "revision": "dd137d33c212d93677348c1a6ee6a0fd"
  },
  {
    "url": "favicon/android-icon-192x192.png",
    "revision": "de655caec436def30c72418061566797"
  },
  {
    "url": "favicon/android-icon-36x36.png",
    "revision": "d9ce6c28b5f1dba203cfa11fa1b551b7"
  },
  {
    "url": "favicon/android-icon-48x48.png",
    "revision": "c935f2c88c5e2a58610f3d55a72f3a07"
  },
  {
    "url": "favicon/android-icon-72x72.png",
    "revision": "639a0485207999269f5f752809f6d8bc"
  },
  {
    "url": "favicon/android-icon-96x96.png",
    "revision": "41c4ef73b30d59d5f509283b57c89d55"
  },
  {
    "url": "favicon/apple-icon-114x114.png",
    "revision": "9997554947513489a660fb7d940bacaa"
  },
  {
    "url": "favicon/apple-icon-120x120.png",
    "revision": "1b060f9e3746a58d908d57fb56ad695a"
  },
  {
    "url": "favicon/apple-icon-144x144.png",
    "revision": "dd137d33c212d93677348c1a6ee6a0fd"
  },
  {
    "url": "favicon/apple-icon-152x152.png",
    "revision": "d2e38aab48c73e426591345e1dfcbe5c"
  },
  {
    "url": "favicon/apple-icon-180x180.png",
    "revision": "752b0a9259570816c6314e78ad52cccf"
  },
  {
    "url": "favicon/apple-icon-57x57.png",
    "revision": "b981b61a9823db1b4f59e279954e8219"
  },
  {
    "url": "favicon/apple-icon-60x60.png",
    "revision": "1f5ccaea2214371dfe1cff3244272534"
  },
  {
    "url": "favicon/apple-icon-72x72.png",
    "revision": "639a0485207999269f5f752809f6d8bc"
  },
  {
    "url": "favicon/apple-icon-76x76.png",
    "revision": "073153138b35020786814a79d215def5"
  },
  {
    "url": "favicon/apple-icon-precomposed.png",
    "revision": "f7c614a6eb1f0dff02b35ec973aecf12"
  },
  {
    "url": "favicon/apple-icon.png",
    "revision": "f7c614a6eb1f0dff02b35ec973aecf12"
  },
  {
    "url": "favicon/favicon-16x16.png",
    "revision": "ea16295623dd1619b8c742152408484f"
  },
  {
    "url": "favicon/favicon-32x32.png",
    "revision": "9ccca653b718eb9d2d88448bcd3eb0b4"
  },
  {
    "url": "favicon/favicon-96x96.png",
    "revision": "41c4ef73b30d59d5f509283b57c89d55"
  },
  {
    "url": "favicon/icon-128x128.png",
    "revision": "e10d1db7526e1463eb0a4f979a82fe9d"
  },
  {
    "url": "favicon/icon-144x144.png",
    "revision": "9a8e2f9ab604cc9363ad42610b6daf6e"
  },
  {
    "url": "favicon/icon-152x152.png",
    "revision": "8450ed692f79868f3cdae8b878c1c612"
  },
  {
    "url": "favicon/icon-192x192.png",
    "revision": "1ec00d7ae0ae8440338c18681e57f588"
  },
  {
    "url": "favicon/icon-384x384.png",
    "revision": "857c175fe69dd0ae7702a55eb269f45e"
  },
  {
    "url": "favicon/icon-512x512.png",
    "revision": "9e7bb5279befb49cdf138382bd13f5b9"
  },
  {
    "url": "favicon/icon-72x72.png",
    "revision": "23e699e1e038e52733d74fdce385e21e"
  },
  {
    "url": "favicon/icon-96x96.png",
    "revision": "5055c40041c6a09038151510748d3825"
  },
  {
    "url": "favicon/ms-icon-144x144.png",
    "revision": "dd137d33c212d93677348c1a6ee6a0fd"
  },
  {
    "url": "favicon/ms-icon-150x150.png",
    "revision": "70145a8330689989adc53b04670ae241"
  },
  {
    "url": "favicon/ms-icon-310x310.png",
    "revision": "986b72738111050b643869decd4dc544"
  },
  {
    "url": "favicon/ms-icon-70x70.png",
    "revision": "3e95ce62fa683af8224b40e232ec977c"
  },
  {
    "url": "index.html",
    "revision": "b49f776a7ab89d6e23f94b6db4b47db4"
  },
  {
    "url": "introduction/index.html",
    "revision": "0ae4ab654de002d6da2ba902e077dee9"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
