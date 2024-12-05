<script setup lang="ts">
import { Pagination } from 'ant-design-vue';
import { PropType } from 'vue';

defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  totalRecord: {
    type: Number,
    required: true,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showInput: {
    type: Boolean,
    default: false,
  },
  debounce: {
    type: Number,
    default: 0,
  },
  simpleMode: {
    type: Boolean,
    default: false,
  },
  pageSizeOption: {
    type: Array as PropType<string[]>,
    default: () => ['10', '20', '50', '100'],
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', page: number): void;
  (event: 'update:page-size', pageSize: number): void;
}>();
</script>

<template>
  <div class="pagination">
    <slot name="before" />
    <Pagination
      :current="modelValue"
      :total="totalRecord"
      :page-size="pageSize"
      :show-quick-jumper="showInput"
      :disabled="disabled"
      :simple="simpleMode"
      :page-size-options="pageSizeOption"
      @update:current="(v) => emits('update:model-value', v)"
      @update:page-size="(v) => emits('update:page-size', v)"
    />
    <slot name="after">
      <div
        v-if="totalRecord || totalRecord === 0"
        class="t-system"
        style="margin-left: 5px"
      >
        Total {{ totalRecord }} records
      </div>
    </slot>
  </div>
</template>

<style lang="sass" scope>
.pagination
  padding: 10px 0
  width: 100%
  display: flex
  align-items: center
  justify-content: end
</style>
