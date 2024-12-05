<template>
  <Layout>
    <LayoutHeader style="background-color: black; color: white"
      >Header</LayoutHeader
    >
    <LayoutContent style="min-height: 87vh">
      <AppSpinner :loading="loading" :glass-effect="true">
        <router-view />
      </AppSpinner>
    </LayoutContent>
    <!-- <LayoutFooter style="background-color: black; color: white"
      >Footer</LayoutFooter
    > -->
  </Layout>
</template>

<script setup lang="ts">
import { Layout, LayoutContent, LayoutHeader } from 'ant-design-vue';
import { AppSpinner } from 'src/components';
import { ref } from 'vue';

const leftDrawerOpen = ref(false);
const loading = ref(false);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
