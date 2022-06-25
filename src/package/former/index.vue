<script>
import classnames from 'classnames'
import ProcedureFormItem from './procedureFormItem.vue'

export default {
  props: {
    column: { type: Number, default: 3 },
    labelCol: { type: Number, default: 6 },
    wrapperCol: { type: Number, default: 18 },
    datasource: { type: Array, default: () => [] },
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
      formData: {},
      formObj: {
        getFieldsValue: this._getFieldsValue,
        getFieldValue: this._getFieldValue,
        setFieldsValue: this._setFieldsValue,
      },
    }
  },
  mounted() {
    this.useForm(this.formObj)
    this._loadFormData()
  },
  methods: {
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
    _loadFormData() {
      if (Array.isArray(this.datasource)) {
        for (const item of this.datasource) {
          this.formData[item.key] = item.initialValue || ''
        }
      } else {
        throw 'former datasource 不是一个数组'
      }
    },
  },
  render() {
    const { classNames, formData, datasource, labelCol, wrapperCol, column } =
      this
    const colSpan = 24 / (column || 3)
    return (
      <el-form
        class={classNames}
        ref='formRef'
        props={{
          model: formData,
        }}
      >
        <el-row>
          {datasource.length &&
            datasource.map((item, index) => {
              let { initialValue } = item
              return (
                <el-col span={colSpan}>
                  <el-row>
                    <el-form-item key={item.key || index}>
                      <el-row>
                        <el-col span={labelCol}>
                          <div class='former-item-label'>{item.label}</div>
                        </el-col>
                        <el-col span={wrapperCol}>
                          <ProcedureFormItem
                            ref={'form_' + item.key + 'Ref'}
                            value={initialValue}
                            label={item.label}
                            className={item.className}
                            viewProps={item.viewProps || null}
                            view={item.view}
                            onChange={e => (this.formData[item.key] = e)}
                          />
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-row>
                </el-col>
              )
            })}
        </el-row>
      </el-form>
    )
  },
}
</script>
<style lang="scss" scoped>
.mc-former {
  ::v-deep {
    .former-item-label {
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
