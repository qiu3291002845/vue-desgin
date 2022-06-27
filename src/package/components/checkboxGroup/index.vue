<template>
  <CheckboxGroup v-model="value_" @change="handleChange">
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
  </CheckboxGroup>
</template>
<script>
import { CheckboxGroup, Checkbox, CheckboxButton } from 'element-ui'
export default {
  components: {
    CheckboxGroup,
    Checkbox,
    CheckboxButton,
  },
  computed: {
    isComponent() {
      return this.type === 'text' ? 'Checkbox' : 'CheckboxButton'
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
      type: Array,
      default: () => [],
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
