/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/**
 * @type HTMLElement
 */
const shareBtn = document.querySelector('.share');

if (navigator.share) {
  shareBtn.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: 'wof.show',
        text: 'Check out wof.show.',
        url: 'https://next.wof.show/'
      });
      console.log('Successful share');
    } catch (error) {
      console.warn('Error sharing', error);
    }
  });
} else {
  console.warn(`The Web Share Api isn't supported by your Browser.`)
}

const COOKIE_NAME = 'POSTPONED_A2HS';

function setCookie(name, value, expirationMinutes) {
  let d = new Date();
  d.setTime(d.getTime() + expirationMinutes * 60 * 1000);

  let expires = 'expires='+d.toUTCString();
  document.cookie = name + '=' + value + '; ' + expires + '; path=/';
}

function getCookie(cookieName) {
  let name = cookieName + '=';
  let ca = document.cookie.split(';');
  let c;

  for(var i = 0; i < ca.length; i++) {
    c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log(`Service Worker registered! Scope: ${registration.scope}`);
      })
      .catch(err => {
        console.log(`Service Worker registration failed: ${err}`);
      });
  });

  const installCard = document.getElementById('install-card');
  const btnAdd = installCard.querySelector('#install-btn');
  const btnDismiss = installCard.querySelector('#dismiss-btn');

  btnDismiss.addEventListener('click', e => {
    installCard.style.display = 'none';
    // By default, Chrome stop showing the mini info-bar during 3 months
    // after the user dismissed it.
    // We set it to 2 minutes for testing purpose only.
    setCookie(COOKIE_NAME, 'true', 3);
  })

  function showInstallPromotion() {
    if(getCookie(COOKIE_NAME) !== 'true') {
      installCard.style.display = 'inline-block';
      setCookie(COOKIE_NAME, 'true', 1);
    }
  }

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', e => {
    console.log('beforeInstallPrompt event detected');
    // Prevent Chrome 76 and later from showing the mini-infobar
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
  });

  btnAdd.addEventListener('click', e => {
    // hide our user interface that shows our A2HS button
    installCard.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
}

function createIndexedDB() {
  if (!('indexedDB' in window)) {return null;}
  return idb.open('dashboardr', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('events')) {
      const eventsOS = upgradeDb.createObjectStore('events', {keyPath: 'id'});
    }
  });
}

function saveEventDataLocally(events) {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('events', 'readwrite');
    const store = tx.objectStore('events');
    return Promise.all(events.map(event => store.put(event)))
    .catch(() => {
      tx.abort();
      throw Error('Events were not added to the store');
    });
  });
}

function getLocalEventData() {
  if (!('indexedDB' in window)) {return null;}
  return dbPromise.then(db => {
    const tx = db.transaction('events', 'readonly');
    const store = tx.objectStore('events');
    return store.getAll();
  });
}

const container = document.getElementById('container');
const offlineMessage = document.getElementById('offline');
const noDataMessage = document.getElementById('no-data');
const dataSavedMessage = document.getElementById('data-saved');
const saveErrorMessage = document.getElementById('save-error');
const addEventButton = document.getElementById('add-event-button');

addEventButton.addEventListener('click', addAndPostEvent);

Notification.requestPermission();

// create indexedDB database
const dbPromise = createIndexedDB();

loadContentNetworkFirst();

function loadContentNetworkFirst() {
  getServerData()
  .then(dataFromNetwork => {
    updateUI(dataFromNetwork);
    saveEventDataLocally(dataFromNetwork)
    .then(() => {
      setLastUpdated(new Date());
      messageDataSaved();
    }).catch(err => {
      messageSaveError();
      console.warn(err);
    });
  }).catch(err => {
    console.log('Network requests have failed, this is expected if offline');
    getLocalEventData()
    .then(offlineData => {
      if (!offlineData.length) {
        messageNoData();
      } else {
        messageOffline();
        updateUI(offlineData); 
      }
    });
  });
}

/* Network functions */

function getServerData() {
  return fetch('api/getAll').then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response.json();
  });
}

function addAndPostEvent(e) {
  e.preventDefault();
  const data = {
    id: Date.now(),
    title: document.getElementById('title').value,
    date: document.getElementById('date').value,
    city: document.getElementById('city').value,
    note: document.getElementById('note').value
  };
  updateUI([data]);
  showInstallPromotion();

  saveEventDataLocally([data]);

  const headers = new Headers({'Content-Type': 'application/json'});
  const body = JSON.stringify(data);
  return fetch('api/add', {
    method: 'POST',
    headers: headers,
    body: body
  });
}

/* UI functions */

function updateUI(events) {
  events.forEach(event => {
    const item =
      `<li class="card">
         <div class="card-text">
           <h2>${event.title}</h2>
           <h4>${event.date}</h4>
           <h4>${event.city}</h4>
           <p>${event.note}</p>
         </div>
       </li>`;
    const where = events.length > 1 ? 'afterbegin' : 'beforeend';
    container.insertAdjacentHTML(where, item);
  });
}

function messageOffline() {
  // alert user that data may not be current
  const lastUpdated = getLastUpdated();
  if (lastUpdated) {
    offlineMessage.textContent += ' Last fetched server data: ' + lastUpdated;
  }
  offlineMessage.style.display = 'block';
}

function messageNoData() {
  // alert user that there is no data available
  noDataMessage.style.display = 'block';
}

function messageDataSaved() {
  // alert user that data has been saved for offline
  const lastUpdated = getLastUpdated();
  if (lastUpdated) {dataSavedMessage.textContent += ' on ' + lastUpdated;}
  dataSavedMessage.style.display = 'block';
}

function messageSaveError() {
  // alert user that data couldn't be saved offline
  saveErrorMessage.style.display = 'block';
}

/* Storage functions */

function getLastUpdated() {
  return localStorage.getItem('lastUpdated');
}

function setLastUpdated(date) {
  localStorage.setItem('lastUpdated', date);
}
