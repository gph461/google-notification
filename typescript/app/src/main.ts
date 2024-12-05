import { App, createApp } from 'vue';
import MainApp from './App.vue';
import Splash from './pages/Splash.vue';
import Router from './router';

// Import Fontawesome
import 'src/assets/fontawesome/css/all.css';

//Ant Design
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

// Import pinia
import { createPinia } from 'pinia';

// Import DayJS
import dayjs, { extend } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';

// Import Notivue
import { createNotivue } from 'notivue';

import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import 'notivue/animations.css';
import 'notivue/notification.css';
import { VueFire } from 'vuefire';

const notivue = createNotivue({
  position: 'top-right',
  limit: 8,
  enqueue: true,
  avoidDuplicates: true,
  notifications: {
    global: {
      duration: 5000,
    },
  },
});

// init global pinia store
const pinia = createPinia();

// create splash screen
const splash = createApp(Splash);
splash.mount('#app');

/// !!! init plugins and libraries below to mount Splash asap

// init dayjs
extend(isBetween);
extend(isSameOrBefore);
extend(updateLocale);
extend(utc);
extend(timezone);
extend(objectSupport);
extend(localizedFormat);
dayjs.updateLocale('en', {
  weekStart: 1,
});

let firebaseApp: FirebaseApp;
async function init() {
  const firebaseConfig = {
    apiKey: 'AIzaSyBqNi04447p39DRCuPllBJal2hFxqs-dRM',
    authDomain: 'dreamztrack-a139a.firebaseapp.com',
    projectId: 'dreamztrack-a139a',
    storageBucket: 'dreamztrack-a139a.firebasestorage.app',
    messagingSenderId: '11109059449',
    appId: '1:11109059449:web:3732ce99aab66e84f2bda8',
    measurementId: 'G-J2S8BMQT7Q',
  };
  if (getApps().length === 0) {
    firebaseApp = initializeApp(firebaseConfig);
  } else {
    firebaseApp = getApp();
  }
}

init().then(async () => {
  const app = await registerVue();
  splash.unmount();
  app.mount('#app');
});

async function registerVue(): Promise<App> {
  const app = createApp(MainApp);
  app.use(pinia);

  try {
    console.log('initApp');
  } catch (e) {
    console.error(e);
    throw e;
  } finally {
    //register ant design
    app.use(Antd);

    //register notivue
    app.use(notivue);

    // register router
    app.use(Router);

    app.use(VueFire, {
      firebaseApp,
    });
    // eslint-disable-next-line no-unsafe-finally
    return app;
  }
}
