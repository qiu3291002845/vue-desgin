<template>
  <div id="app">
    <img
      style="cursor: pointer"
      @click="handleClick"
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <Former
      :onSubmit="onSubmit"
      :onReset="onReset"
      :resetText="null"
      :submitText="null"
      :useForm="useForm"
      :column="1"
      :datasource="formerList"
    />
  </div>
</template>

<script>
// import Former from './package/former'
import { Former } from 'mc-former'
export default {
  name: 'App',
  components: { Former },
  data() {
    return {
      a: '',
      formerList: [
        {
          label: '用户名',
          key: 'username',
          view: 'Input',
          initialValue: '1111',
          required: true,
          viewProps: {},
        },
        {
          label: '密码',
          key: 'password',
          view: 'Input',
          viewProps: {
            disabled: true,
          },
        },
        {
          label: 'RadioGroup',
          key: 'RadioGroup',
          view: 'RadioGroup',
          initialValue: '选项1',
          viewProps: {
            type: 'button',
            options: [
              {
                value: '选项1',
                label: '黄金糕',
                border: true,
              },
              {
                value: '选项2',
                label: '双皮奶',
              },
              {
                value: '选项3',
                label: '蚵仔煎',
              },
              {
                value: '选项4',
                label: '龙须面',
              },
              {
                value: '选项5',
                label: '北京烤鸭',
              },
            ],
          },
        },
        {
          label: 'CheckboxGroup',
          key: 'CheckboxGroup',
          view: 'CheckboxGroup',
          required: true,
          rules: {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change',
          },
          initialValue: [],
          viewProps: {
            type: 'button',
            options: [
              {
                value: '选项1',
                label: '黄金糕',
              },
              {
                value: '选项2',
                label: '双皮奶',
              },
              {
                value: '选项3',
                label: '蚵仔煎',
              },
              {
                value: '选项4',
                label: '龙须面',
              },
              {
                value: '选项5',
                label: '北京烤鸭',
              },
            ],
          },
        },
        {
          label: 'Checkbox',
          key: 'Checkbox',
          view: 'Checkbox',
          viewProps: {},
        },
        {
          label: 'Radio',
          key: 'Radio',
          view: 'Radio',
          viewProps: {},
        },
        {
          label: '密码',
          key: 'InputNumber',
          view: 'InputNumber',
          viewProps: {
            min: 1,
            max: 10,
          },
        },
        {
          label: '选择器',
          key: 'Select',
          view: 'Select',
          required: true,
          initialValue: '',
          viewProps: {
            filterable: true,
            options: [
              {
                value: '选项1',
                label: '黄金糕',
              },
              {
                value: '选项2',
                label: '双皮奶',
              },
              {
                value: '选项3',
                label: '蚵仔煎',
              },
              {
                value: '选项4',
                label: '龙须面',
              },
              {
                value: '选项5',
                label: '北京烤鸭',
              },
            ],
          },
        },
        {
          label: '评分',
          key: 'rate',
          required: true,
          view: 'Rate',
          viewProps: {},
        },
        {
          label: '级联选择器',
          key: 'Cascader',
          view: 'Cascader',
          required: true,
          viewProps: {
            options: [
              {
                value: 'zhinan',
                label: '指南',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [
                      {
                        value: 'yizhi',
                        label: '一致',
                      },
                    ],
                  },
                  {
                    value: 'daohang',
                    label: '导航',
                    children: [
                      {
                        value: 'cexiangdaohang',
                        label: '侧向导航',
                      },
                      {
                        value: 'dingbudaohang',
                        label: '顶部导航',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
        {
          label: '滑块',
          key: 'slider',
          view: 'Slider',
          required: true,
          viewProps: {},
        },
        {
          label: '时间',
          key: 'time',
          view: 'DatePicker',
          required: true,
          viewProps: {
            type: 'datetime',
            valueFormat: 'yyyy-MM-dd HH:mm:ss',
          },
        },
        {
          label: '上传',
          key: 'upload',
          view: 'Upload',
          viewProps: {
            listType: 'picture-card',
            action: '/upload',
            onChange: e => {
              console.log(e)
            },
            onError: e => {
              console.log(e)
            },
          },
        },
      ],
      $form: null,
    }
  },
  methods: {
    async handleClick() {
      console.log(this.$form)
      const res = await this.$form.validate()
      console.log(res)
    },
    useForm(e) {
      console.log(e)
      this.$form = e
    },
    async onSubmit() {
      const res = await this.$form.validate()
      console.log(res)
    },
    onReset(e) {
      console.log(e)
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
