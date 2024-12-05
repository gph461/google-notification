<script setup lang="ts">
import { AutoComplete, Compact, FormItem } from 'ant-design-vue';
import { type RuleObject } from 'ant-design-vue/es/form';
import { NamePath } from 'ant-design-vue/es/form/interface';
import { SelectValue } from 'ant-design-vue/es/select';
import type { InputRef } from 'ant-design-vue/es/vc-input/inputProps';

import {
  computed,
  CSSProperties,
  ref,
  useSlots,
  VNode,
  type Component,
  type PropType,
} from 'vue';
import { formItemProps } from './input';

const props = defineProps({
  ...formItemProps,
  name: {
    type: [String, Number, Array] as PropType<NamePath>,
    required: true,
  },
  modelValue: {
    type: [String, undefined] as PropType<string | undefined>,
    default: undefined,
  },
  options: {
    type: Array as PropType<{ value: string }[]>,
    required: true,
  },
  inputStyle: {
    type: Object as PropType<CSSProperties>,
    default: () => {},
  },
  autoFocus: {
    type: Boolean,
    default: false,
  },
  allowClear: {
    type: Boolean,
    default: false,
  },
  bordered: {
    type: Boolean,
    default: true,
  },
  clearIcon: {
    type: [Object, String] as PropType<VNode | Component | string>,
    default: undefined,
  },
  popUpClass: {
    type: String,
    default: '',
  },
  dropdownWidth: {
    type: Number,
    default: undefined,
  },
  placeholder: {
    type: String,
    default: undefined,
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', value: any): void;
  (event: 'focus'): void;
  (event: 'search', value: string): void;
  (event: 'clear'): void;
}>();

const slots = useSlots();

const isOptionSlot = computed(() => slots.option);

const inputRef = ref<InputRef>();

const inputRules: RuleObject[] = [
  ...(props.required
    ? [
        {
          required: true,
          message: 'Required',
        },
      ]
    : []),
  ...props.rules,
];

function input(v: SelectValue) {
  if (typeof v === 'object' && 'value' in v) {
    emits('update:model-value', v.value);
    emits('search', v.value as string);
  } else {
    emits('update:model-value', v);
    emits('search', v as string);
  }
}

// onMounted(() => {
//   if (props.autoFocus) inputRef.value?.focus();
// });
</script>

<template>
  <FormItem
    :label="label"
    :name="name"
    :rules="inputRules"
    :required="required"
    :colon="colon"
    :label-align="labelAlign"
    :label-col="labelCol"
    :tooltip="tooltip"
    :class="classes"
  >
    <Compact :size="size" class="full-width">
      <AutoComplete
        ref="inputRef"
        :value="modelValue"
        :allow-clear="allowClear"
        :bordered="bordered"
        :clear-icon="clearIcon"
        :style="inputStyle"
        :placeholder="placeholder"
        :options="options"
        :popup-class-name="popUpClass"
        :dropdown-match-select-width="dropdownWidth"
        @update:value="(i) => input(i as string)"
        @search="
          (v) => {
            console.log(v);
            emits('search', v);
          }
        "
        @clear="
          () => {
            emits('clear');
          }
        "
      >
        <template v-if="isOptionSlot" #option="option">
          <slot name="option" v-bind="option" />
        </template>
      </AutoComplete>
      <slot />
    </Compact>
  </FormItem>
</template>
<style lang="sass"></style>
