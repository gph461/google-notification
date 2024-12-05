<script setup lang="ts">
import { Flex, InputGroup, InputNumber, Select } from 'ant-design-vue';
import { FormItem, FormItemRest, RuleObject } from 'ant-design-vue/es/form';
import { NamePath } from 'ant-design-vue/es/form/interface';
import { ParsedNumber, parseNumber } from 'libphonenumber-js';
import { PropType, ref } from 'vue';
import CountryFlag from 'vue-country-flag-next';
import { validate } from '~libs/helpers';
import { formItemProps, inputProps, numberProps } from './input';

export interface PhoneCountryOption extends Pick<ParsedNumber, 'country'> {
  extension: string;
}

export interface PhoneParsedInput {
  extension: string;
  phone: string;
}

const props = defineProps({
  ...inputProps,
  ...formItemProps,
  ...numberProps,
  name: {
    type: [String, Number, Array] as PropType<NamePath>,
    required: true,
  },
  modelValue: {
    type: Object as PropType<PhoneParsedInput>,
    required: true,
  },
  options: {
    type: Array as PropType<PhoneCountryOption[]>,
    default: (): PhoneCountryOption[] => [
      {
        country: 'MY',
        extension: '60',
      },
      {
        country: 'SG',
        extension: '65',
      },
    ],
  },
  showCountryFlag: {
    type: Boolean,
    default: false,
  },
  showCountry: {
    type: Boolean,
    default: true,
  },
});

const emits = defineEmits<{
  (event: 'update:model-value', value: PhoneParsedInput): void;
  (event: 'focus'): void;
}>();

const selectedOption = ref<string>(props.options[1].country);

const inputRules: RuleObject[] = [
  ...(props.required
    ? [
        {
          required: true,
          message: 'Required',
        },
      ]
    : []),
  {
    validator: (_rule, value: PhoneParsedInput) => {
      if (!props.required && !value.phone) return;
      const parsed = parseNumber(`+${value.extension}${value.phone}`);
      if (Object.keys(parsed).length > 0) {
        const valid = validate.phoneNo(
          value.phone,
          (parsed as ParsedNumber).country
        );
        if (valid) return Promise.resolve();
      }

      return Promise.reject('Invalid phone number');
    },
    message: 'Invalid phone format',
    trigger: 'change',
  },
  ...props.rules,
];
const filterOption = (input: string, option: any) => {
  return (
    option.label && option.label.toLowerCase().includes(input.toLowerCase())
  );
};
</script>

<template>
  <FormItem
    :label="label === null ? 'Phone' : label"
    :name="name"
    :rules="inputRules"
    :required="required"
    :colon="colon"
    :label-align="labelAlign"
    :label-col="labelCol"
    :tooltip="tooltip"
  >
    <InputGroup compact>
      <FormItemRest>
        <Select
          v-model:value="selectedOption"
          show-search
          style="width: 80px"
          :dropdown-style="{
            width: '180px',
            backgroundColor: 'var(--gray-2-color)',
          }"
          :dropdown-match-select-width="false"
          :disabled="disabled || readOnly"
          :option-label-prop="'key'"
          :filter-option="filterOption"
          :bordered="bordered"
          @update:value="
            (v) =>
              emits('update:model-value', {
                ...props.modelValue,
                extension:
                  props.options.find((i) => i.country === v)?.extension || '',
              })
          "
        >
          <template #option="option">
            <Flex gap="small" align="center">
              <CountryFlag
                v-if="showCountryFlag"
                :country="option.value"
                size="normal"
              />
              <div>
                {{ option.label }}
              </div>
            </Flex>
          </template>
        </Select>
      </FormItemRest>

      <InputNumber
        :value="modelValue.phone"
        :default-value="initialValue"
        :allow-clear="allowClear"
        :bordered="bordered"
        :clear-icon="clearIcon"
        :maxlength="maxLength"
        :prefix="prefix"
        :placeholder="placeholder"
        :size="size"
        :controls="false"
        :disabled="disabled || readOnly"
        style="width: calc(100% - 80px)"
        @update:value="
          (v) =>
            emits('update:model-value', {
              ...props.modelValue,
              phone: v.toString(),
            })
        "
      />
    </InputGroup>
  </FormItem>
</template>
<style lang="sass">
.readonly.ant-input-number-disabled
  background-color: inherit !important
  color: inherit !important
</style>
