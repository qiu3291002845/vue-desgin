<script>
import classnames from 'classnames'
import ProcedureFormItem from './procedureFormItem.vue'
import { Col, Row, FormItem, Form, Button } from 'element-ui'
export default {
  props: {
    column: { type: Number, default: 3 },
    labelCol: { type: Number, default: 6 },
    wrapperCol: { type: Number, default: 18 },
    datasource: { type: Array, default: () => [] },
    rules: { type: Object, default: () => {} },
    submitProps: { type: Object, default: () => {} },
    resetProps: { type: Object, default: () => {} },
    useForm: { type: Function, default: () => {} },
    className: { type: String, default: '' },
    submitText: { type: [String, null], default: '提交' },
    resetText: { type: [String, null], default: '重置' },
    labelWidth: { type: String, default: 'auto' },
    onReset: { type: Function, default: () => {} },
    onSubmit: { type: Function, default: () => {} },
  },
  computed: {
    classNames() {
      return classnames('mc-former', [this.className])
    },
  },
  data() {
    return {
      loading: false,
      formData: {},
      formObj: {
        getFieldsValue: this._getFieldsValue,
        getFieldValue: this._getFieldValue,
        setFieldsValue: this._setFieldsValue,
        validate: this._validate,
        resetFields: this._resetFields,
      },
    }
  },

  mounted() {
    this.useForm(this.formObj)
  },
  methods: {
    _resetFields() {
      this.$refs.formRef.resetFields()
    },
    _validate() {
      return new Promise((resolve, reject) => {
        this.$refs.formRef.validate(boolean => {
          if (boolean) {
            resolve(this.formData)
          } else {
            reject(false)
          }
        })
      })
    },
    _setFieldsValue(oneParams, twoParams) {
      if (typeof oneParams === 'object') {
        this.formData = { ...this.formData, ...oneParams }
        for (const key in oneParams) {
          this.$refs['form_' + key + 'Ref'].changeValue(oneParams[key])
        }
      } else if (typeof oneParams === 'string') {
        this.formData[oneParams] = twoParams || ''
        this.$refs['form_' + oneParams + 'Ref'].changeValue(twoParams)
      }
      return this._getFieldsValue()
    },
    _getFieldValue(name) {
      if (name && this.formData[name]) return this.formData[name]
    },
    _getFieldsValue(nameList) {
      if (nameList && Array.isArray(nameList)) {
        const obj = {}
        for (const item of nameList) {
          obj[item] = this.formData[item]
        }
        return obj
      } else {
        return this.formData
      }
    },
  },
  render() {
    const {
      classNames,
      formData,
      datasource,
      labelCol,
      wrapperCol,
      column,
      rules,
      submitProps,
      resetProps,
      submitText,
      resetText,
      formObj,
      onReset,
      onSubmit,
    } = this
    const colSpan = 24 / (column || 3)
    const reset = () => {
      const result = onReset()
      if (!result) {
        formObj.resetFields()
        this._setFieldsValue(formObj.getFieldsValue())
      }
    }
    const submit = () => {
      onSubmit(formObj.getFieldsValue())
    }
    return (
      <Form
        class={classNames}
        ref='formRef'
        rules={rules}
        props={{
          model: formData,
          rules,
        }}
      >
        <Row>
          {datasource.length &&
            datasource.map((item, index) => {
              return (
                <Col key={item.key || index} span={colSpan}>
                  <Row>
                    <FormItem
                      prop={item.required && item.key}
                      rules={
                        item.rules || {
                          required: item.required,
                          message: `${item.label}为必填`,
                        }
                      }
                    >
                      <Row>
                        <Col span={item.labelCol || labelCol}>
                          <div class='former-item-label'>
                            {item.required && (
                              <span class='required_icon'>*</span>
                            )}
                            <span>{item.label}</span>
                          </div>
                        </Col>
                        <Col span={item.wrapperCol || wrapperCol}>
                          <ProcedureFormItem
                            ref={'form_' + item.key + 'Ref'}
                            value={formData[item.key]}
                            formKey={item.key}
                            label={item.label}
                            className={item.className}
                            viewProps={item.viewProps || null}
                            view={item.view}
                            onChange={e => {
                              this.$set(this.formData, item.key, e)
                              this.$refs['formRef'] &&
                                this.$refs['formRef'].validateField(item.key)
                            }}
                          />
                        </Col>
                      </Row>
                    </FormItem>
                  </Row>
                </Col>
              )
            })}
          {(resetText || submitText) && (
            <Col span={colSpan}>
              <Row type='flex' justify='center'>
                {resetText && (
                  <Button {...resetProps} onClick={reset}>
                    {resetText}
                  </Button>
                )}
                {submitText && (
                  <Button type='primary' {...submitProps} onClick={submit}>
                    {submitText}
                  </Button>
                )}
              </Row>
            </Col>
          )}
        </Row>
      </Form>
    )
  },
}
</script>
<style lang="scss" scoped>
.mc-former {
  ::v-deep {
    .former-item-label {
      .required_icon {
        color: #ff2031;
        margin-right: 2px;
      }
      text-align: right;
      vertical-align: middle;
      float: left;
      width: 100%;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
      box-sizing: border-box;
    }
  }
  position: relative;
}
</style>
