<script>
import classnames from 'classnames'
import ProcedureFormItem from './procedureFormItem.vue'
import { Col, Row, FormItem, Form } from 'element-ui'
export default {
  props: {
    column: { type: Number, default: 3 },
    labelCol: { type: Number, default: 6 },
    wrapperCol: { type: Number, default: 18 },
    datasource: { type: Array, default: () => [] },
    rules: { type: Object, default: () => {} },
    useForm: { type: Function, default: () => {} },
    setValue: { type: Function, default: () => {} },
    className: { type: String, default: '' },
    labelWidth: { type: String, default: 'auto' },
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
      },
    }
  },
  mounted() {
    this.useForm(this.formObj)
  },
  methods: {
    _validate() {
      new Promise((resolve, reject) => {
        this.$refs.formRef.validate((boolean, object) => {
          if (boolean) {
            resolve(boolean, object)
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
    } = this
    const colSpan = 24 / (column || 3)
    return (
      <Form
        class={classNames}
        ref='formRef'
        rules={rules}
        props={{
          model: formData,
        }}
      >
        <Row>
          {datasource.length &&
            datasource.map((item, index) => {
              // let { initialValue } = item
              return (
                <Col key={item.key || index} span={colSpan}>
                  <Row>
                    <FormItem
                      prop={item.key}
                      rules={{
                        required: item.required,
                        trigger: 'blur',
                        message: `${item.label}为必填`,
                      }}
                    >
                      <Row>
                        <Col span={labelCol}>
                          <div class='former-item-label'>
                            {item.required && (
                              <span class='required_icon'>*</span>
                            )}
                            <span>{item.label}</span>
                          </div>
                        </Col>
                        <Col span={wrapperCol}>
                          <ProcedureFormItem
                            ref={'form_' + item.key + 'Ref'}
                            value={formData[item.key]}
                            valueKey={item.key}
                            label={item.label}
                            className={item.className}
                            viewProps={item.viewProps || null}
                            view={item.view}
                            onChange={e => {
                              this.$set(this.formData, item.key, e)
                            }}
                          />
                        </Col>
                      </Row>
                    </FormItem>
                  </Row>
                </Col>
              )
            })}
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
