<template>
  <Checkbox v-model="value_" :label="valueKey" @change="handleChange">
    {{ label }}
  </Checkbox>
</template>
<script>
import { Checkbox } from 'element-ui'
export default {
  components: {
    Checkbox,
  },
  props: {
    label: {
      type: String,
      default: '复选框',
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
