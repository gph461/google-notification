<script setup lang="ts">
import { Input, InputGroup, InputNumber, Textarea } from 'ant-design-vue';
import { FormItem, RuleObject } from 'ant-design-vue/es/form';
import { NamePath } from 'ant-design-vue/es/form/interface';
import { InputRef } from 'ant-design-vue/es/vc-input/inputProps';
import { PropType, computed, onMounted, ref, useSlots } from 'vue';
import { formItemProps, inputProps, numberProps } from './input';

const props = defineProps({
  ...inputProps,
  ...formItemProps,
  ...numberProps,
  name: {
    type: [String, Number, Array] as PropType<NamePath>,
    required: true,
  },
  type: {
    type: String as PropType<'text' | 'number' | 'url' | 'hidden' | 'email'>,
    default: 'text',
  },
  textArea: {
    type: Boolean,
    default: false,
  },
  addOnBefore: {
    type: String,
    default: undefined,
  },
  addOnAfter: {
    type: String,
    default: undefined,
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', value: any): void;
  (event: 'press-enter'): void;
  (event: 'focus'): void;
}>();

const slot = useSlots();
const isPrefix = computed(() => slot['prefix']);
const isSuffix = computed(() => slot['suffix']);

const inputRef = ref<InputRef>();

const inputRules: RuleObject[] = [
  ...(props.type === 'email'
    ? ([
        { type: 'email', message: 'Invalid email format', trigger: 'change' },
      ] as RuleObject[])
    : []),
  ...(props.type === 'url'
    ? ([{ type: 'url', message: 'Invalid url format' }] as RuleObject[])
    : []),
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

function input(v: number | string) {
  emits('update:model-value', v);
}

onMounted(() => {
  if (props.autoFocus) inputRef.value?.focus();
});
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
  >
    <Textarea
      v-if="textArea"
      ref="inputRef"
      :value="modelValue"
      :default-value="initialValue"
      :allow-clear="allowClear"
      :bordered="bordered"
      :clear-icon="clearIcon"
      :maxlength="maxLength"
      :placeholder="placeholder"
      :prefix="prefix"
      :size="size"
      :style="inputStyle"
      :type="type"
      :disabled="disabled"
      :readonly="readOnly"
      :show-count="showCount"
      :auto-size="{
        minRows: 2,
      }"
      @update:value="input"
      @press-enter="$emit('press-enter')"
    />
    <InputGroup v-else compact>
      <InputNumber
        v-if="type === 'number'"
        ref="inputRef"
        :value="modelValue"
        :default-value="initialValue"
        :allow-clear="allowClear"
        :bordered="bordered"
        :clear-icon="clearIcon"
        :controls="controls"
        :formatter="formatter"
        :max="number?.max"
        :min="number?.min"
        :parser="parse"
        :prefix="prefix"
        :placeholder="placeholder"
        :precision="precision"
        :size="size"
        :step="number?.step"
        :string-mode="stringMode"
        :disabled="disabled"
        :readonly="readOnly"
        @update:value="input"
        @press-enter="$emit('press-enter')"
      >
        <template v-if="isPrefix" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="isSuffix" #addonAfter>
          <slot name="suffix" />
        </template>
      </InputNumber>
      <Input
        v-else
        ref="inputRef"
        :value="modelValue"
        :default-value="initialValue"
        :allow-clear="allowClear"
        :bordered="bordered"
        :clear-icon="clearIcon"
        :maxlength="maxLength"
        :placeholder="placeholder"
        :prefix="prefix"
        :size="size"
        :type="type"
        :disabled="disabled"
        :readonly="readOnly"
        :show-count="showCount"
        :addon-before="addOnBefore"
        :addon-after="addOnAfter"
        @update:value="input"
        @press-enter="$emit('press-enter')"
      >
        <template v-if="isPrefix" #prefix>
          <slot name="prefix" />
        </template>
        <template v-if="isSuffix" #suffix>
          <slot name="suffix" />
        </template>
      </Input>
      <slot />
    </InputGroup>
  </FormItem>
</template>
<style lang="sass">
.no-margin-bottom
  .ant-form-item
    margin-bottom: 0 !important
</style>
