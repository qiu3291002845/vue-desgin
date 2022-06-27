<template>
  <RadioGroup v-model="value_" @change="handleChange">
    <template v-for="(item, index) in options">
      <component
        :is="isComponent"
        :disabled="item.disabled"
        :key="index"
        :label="item.value"
      >
        {{ item.label }}
      </component>
    </template>
  </RadioGroup>
</template>
<script>
import { RadioGroup, Radio, RadioButton } from 'element-ui'
export default {
  components: {
    RadioGroup,
    Radio,
    RadioButton,
  },
  computed: {
    isComponent() {
      return this.type === 'text' ? 'Radio' : 'RadioButton'
    },
  },
  props: {
    type: {
      type: String,
      default: 'text',
    },
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      type: [String, Number, Boolean],
      default: () => '',
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
