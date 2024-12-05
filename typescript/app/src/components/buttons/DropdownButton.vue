<script setup lang="ts">
import { CaretDownOutlined } from '@ant-design/icons-vue';
import { Button, Dropdown, Menu, MenuItem } from 'ant-design-vue';
import { Align } from 'ant-design-vue/es/dropdown/props';
import {
  h,
  type CSSProperties,
  type Component,
  type PropType,
  type VNode,
} from 'vue';
import { buttonProps } from './type';

export interface DropdownOption {
  label: string;
  icon?: string | VNode | Component;
  link?: string;
  show?: boolean;
  callback: (v?: any) => Promise<void> | void;
}

defineProps({
  ...buttonProps,
  options: {
    type: Array as PropType<DropdownOption[]>,
    required: true,
  },
  placement: {
    type: String as PropType<
      | 'top'
      | 'bottom'
      | 'bottomLeft'
      | 'bottomRight'
      | 'topLeft'
      | 'topRight'
      | 'topCenter'
      | 'bottomCenter'
    >,
    default: undefined,
  },
  trigger: {
    type: Array as PropType<('click' | 'hover' | 'contextmenu')[]>,
    default: () => ['click'],
  },
  overlayClassName: {
    type: String,
    default: undefined,
  },
  overlayStyle: {
    type: Object as PropType<CSSProperties>,
    default: undefined,
  },
  align: {
    type: Object as PropType<Align>,
    default: undefined,
  },
  overlayArrow: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <Dropdown
    :align="align"
    :arrow="overlayArrow"
    :disabled="disabled"
    :overlay-class-name="overlayClassName"
    :overlay-style="overlayStyle"
    :placement="placement"
    :trigger="trigger"
  >
    <template #overlay>
      <Menu>
        <MenuItem
          v-for="(option, index) in options"
          :key="index"
          @click="option.callback"
        >
          <span v-if="option.icon">
            <i v-if="typeof option.icon === 'string'" :class="option.icon" />
            <component :is="option.icon" v-else />
          </span>
          <router-link v-if="option.link" :to="option.link">
            {{ option.label }}
          </router-link>
          <span v-else>
            {{ option.label }}
          </span>
        </MenuItem>
      </Menu>
    </template>
    <Button
      :type="styleType"
      :block="fitWidth"
      :html-type="type"
      :loading="loading"
      :size="size"
      :shape="shape"
      :icon="icon && typeof icon !== 'string' ? h(icon) : undefined"
      :ghost="ghost"
      :danger="danger"
      :disabled="disabled"
      :class="btnClass"
      :style="styles"
    >
      <template v-if="icon && typeof icon === 'string'" #icon>
        <i
          :class="`${icon}`"
          :style="{ marginRight: label && label !== '' ? '5px' : '0' }"
        ></i>
      </template>
      <Flex v-if="!icon" gap="small">
        {{ label }}
        <slot />
        <CaretDownOutlined />
      </Flex>
      <template v-else>
        {{ label }}
      </template>
    </Button>
  </Dropdown>
</template>
