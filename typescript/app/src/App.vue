<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  Notivue,
  Notification as NotivueNotification, // Applied by default
  pastelTheme,
} from 'notivue';
import { cssVariables, getTheme } from 'src/helpers';
import { onMounted } from 'vue';
import { useFirebaseApp } from 'vuefire';
import Dialogs from './components/Dialogs.vue';

const firebaseApp = useFirebaseApp();
const messaging = getMessaging(firebaseApp);

async function getFCMToken() {
  const resp = await getToken(messaging, {
    vapidKey:
      'BNU4TooZJeO5TCfYU3q7-oef15-4eVBiZQswvZ3P5s097ZkIgOCmqoCfcse5w0F5RYFbRR3R0ebsm9DkQsW1dZE',
  });
  console.log(resp);
  return resp;
}

onMessage(messaging, (payload) => {
  const { notification } = payload;

  if (notification) {
    new Notification(notification.title || 'DREAMZTRACK', {
      body: notification.body,
      icon: notification.icon,
    });
  } else {
    console.warn('No notification payload found in the message:', payload);
  }
});

onMounted(async () => {
  await getFCMToken();
  // console.log(cssVariables.value);
  for (const [key, value] of Object.entries(cssVariables.value)) {
    // console.log(key);
    // console.log(value);
    document.body.style.setProperty(key, value || '');
  }
});
</script>

<template>
  <ConfigProvider :theme="getTheme()">
    <Notivue v-slot="item">
      <NotivueNotification :item="item" :theme="pastelTheme" />
    </Notivue>
    <div>
      <router-view />
    </div>
    <Dialogs />
  </ConfigProvider>
</template>

<style lang="sass">
@import url("https://fonts.googleapis.com/css?family=Noto Sans:400,500,600,700")
@import "./styles/app"
@import "./styles/border"
@import "./styles/color"
@import "./styles/typo"

#app
  font-size: 14px
  font-family: "Noto Sans", sans-serif
</style>
