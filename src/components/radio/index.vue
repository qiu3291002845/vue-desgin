<template>
  <Radio v-model="value_" :label="valueKey" @change="handleChange">
    {{ label }}
  </Radio>
</template>
<script>
import { Radio } from 'element-ui'
export default {
  components: {
    Radio,
  },
  props: {
    label: {
      type: String,
      default: '单选框',
    },
    valueKey: {
      type: String,
      default: '',
    },
    value: {
      type: [String, Number, Boolean],
      default: '',
    },
  },
  data() {
    return {
      value_: this.value,
    }
  },
  methods: {
    handleChange(e) {
      this.$emit('change', e)
    },
  },
}
</script>
<style lang="scss" scoped></style>
