<script setup lang="ts">
import { Flex } from 'ant-design-vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Spinner from './Spinner.vue';

const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  currentTotal: {
    type: Number,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
  isScrollTop: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (event: 'onLoad'): void;
}>();

defineExpose({
  scrollTop,
  checkAndScroll,
});

const parent = ref<HTMLDivElement>();
const loading = ref(false);

function scrollTop(behavior: ScrollBehavior | undefined = undefined) {
  // console.log('scrollTop');
  setTimeout(() => {
    parent.value?.scrollTo({
      top: props.reverse ? parent.value?.scrollHeight : 0,
      behavior: behavior,
    });
  }, 100);
}

function onScroll() {
  if (!parent.value || props.currentTotal >= props.total) return;

  const p = parent.value;
  const loadingPoint = p.scrollHeight - p.offsetHeight;
  const scrollUp = p.scrollTop == 0 && props.reverse;
  const scrollDown = p.scrollTop == loadingPoint && !props.reverse;

  if (scrollUp || scrollDown) {
    loading.value = true;
    // console.log('onScroll');
    emits('onLoad');
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}
onMounted(() => {
  if (!props.isScrollTop) {
    scrollTop();
  }
  parent.value?.addEventListener('scroll', onScroll);
  setTimeout(() => {
    onScroll();
  }, 500);
});

onUnmounted(() => {
  parent.value?.removeEventListener('scroll', onScroll);
});

function checkAndScroll() {
  if (!parent.value) return false;
  const p = parent.value;
  const loadingPoint = p.scrollHeight - p.offsetHeight;
  const scrollTopAtLoadingPoint = p.scrollTop >= loadingPoint && props.reverse;
  const scrollTopAtTop = p.scrollTop == 0 && !props.reverse;

  if (scrollTopAtLoadingPoint || scrollTopAtTop) scrollTop('smooth');
}

watch(
  () => props.id,
  () => {
    if (!props.isScrollTop) {
      scrollTop();
    }
  },
  {
    deep: true,
    immediate: true,
  }
);
</script>
<template>
  <!-- {{ isScrollTop }} -->
  <div ref="parent" class="infinite-scroll">
    <div v-if="loading && reverse" class="text-center">
      <Spinner />
    </div>
    <Flex vertical>
      <slot />
    </Flex>
    <div v-if="loading && !reverse" class="text-center">
      <Spinner />
    </div>
  </div>
</template>

<style lang="sass" scoped>
.infinite-scroll
  overflow: auto
</style>
