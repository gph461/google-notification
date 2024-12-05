import { computed, ref } from 'vue';

export default () => {
  const hasStarted = ref(false);
  const countdowntext = ref();
  const countdownLoading = ref(false);
  const timer = ref();

  const text = computed(() => {
    if (!hasStarted.value) return 'Send Code';
    else return countdowntext.value;
  });

  function countdown() {
    clearInterval(timer.value);
    hasStarted.value = true;
    let seconds = 30;
    timer.value = setInterval(() => {
      const minutes = Math.floor(seconds / 60);
      const remainderSeconds = seconds % 60;
      countdowntext.value = `${
        remainderSeconds < 10 ? '0' : ''
      }${remainderSeconds}s`;
      if (seconds <= 0) {
        clearInterval(timer.value);
        hasStarted.value = false;
      }
      seconds--;
    }, 1000);
  }

  return { text, countdown, hasStarted, countdownLoading };
};
