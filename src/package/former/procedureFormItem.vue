<script>
import Elements from './elements'
import classNames from 'classnames'
import handleChooseList from './handleChooseList'
export default {
  props: {
    viewProps: {
      type: Object,
      default: () => ({}),
    },
    label: {
      type: String,
      default: '',
    },
    formKey: {
      type: String,
      default: '',
    },
    initialValue: {},
    className: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      value_: this.$attrs.value || this.initialValue,
    }
  },
  computed: {
    viewProps_() {
      return this.viewProps
    },
  },
  watch: {
    value_() {
      return this.$attrs.value
    },
  },
  methods: {
    changeValue(value) {
      this.value_ = value
    },
  },
  render() {
    const { viewProps_, value_, label, className, formKey } = this
    const { view } = this.$attrs
    const placeholderHandleMsg = handleChooseList.includes(view)
      ? '请选择'
      : '请输入'
    const Element = Elements[this.$attrs.view]
    const classnames = classNames('mc-input', className, {
      'mc-upload': view === 'Upload',
    })
    if (!Element) {
      throw '该 view 组件不在 Elements 包含之中，请使用 Element UI 组件'
    }
    return (
      <Element
        class={classnames}
        value={value_}
        formKey={formKey}
        {...{ attrs: viewProps_ }}
        onInput={e => {
          this.$emit('input', e)
          this.$emit('change', e)
          this.value_ = e
        }}
        onChange={e => {
          this.$emit('input', e)
          this.$emit('change', e)
          this.value_ = e
        }}
        placeholder={placeholderHandleMsg + label}
      />
    )
  },
}
</script>
<style lang="scss" scoped>
.mc-input {
  &.el-rate {
    ::v-deep {
      .el-rate__item {
        display: flex;
        align-items: center;
      }
    }
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
  }
  width: 100% !important;
}
.mc-upload {
  width: 240px;
}
</style>
