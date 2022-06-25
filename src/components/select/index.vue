<template>
  <Select
    v-model="value_"
    :disabled="disabled"
    :filterable="filterable"
    :clearable="clearable"
    :placeholder="placeholder"
    @change="changeSelect"
    :multiple="multiple"
    :remote="remote"
    :reserve-keyword="reserveKeyword"
    :remote-method="remoteMethod"
    :loading="loading"
  >
    <Option
      v-for="(item, index) in options"
      :key="index"
      :label="item[labelKey]"
      :value="item[valueKey]"
      :disabled="item.disabled"
    />
  </Select>
</template>
<script>
import { Select, Option } from 'element-ui'
export default {
  components: {
    Select,
    Option,
  },
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: String,
      default: '请选择',
    },
    loading: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    remote: {
      type: Boolean,
      default: false,
    },
    reserveKeyword: {
      type: Boolean,
      default: false,
    },
    filterable: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    labelKey: {
      type: String,
      default: 'label',
    },
    valueKey: {
      type: String,
      default: 'value',
    },
    options: {
      type: Array,
      default: () => [],
    },
    remoteMethod: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      value_: this.value,
    }
  },
  methods: {
    changeSelect(e) {
      this.$emit('change', e)
    },
  },
}
</script>
<style lang="scss" scoped></style>
