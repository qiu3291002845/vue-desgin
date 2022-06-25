<template>
  <div id="app">
    <img
      style="cursor: pointer"
      @click="handleClick"
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <Former :useForm="useForm" :column="1" :datasource="formerList" />
  </div>
</template>

<script>
import Former from './package/former'
export default {
  name: 'App',
  components: { Former },
  data() {
    return {
      formerList: [
        {
          label: '用户名',
          key: 'username',
          view: 'Input',
          initialValue: '111',
          viewProps: {
            disabled: false,
            size: 'mini',
          },
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
          label: '评分',
          key: 'rate',
          view: 'Rate',
          viewProps: {},
        },
        {
          label: '时间',
          key: 'time',
          view: 'DatePicker',
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
            listType: 'picture',
            showFileList: false,
            action: '/upload',
            onChange: e => {
              console.log(e)
              this.$form.setFieldsValue('upload', '12312312')
            },
            onError: e => {
              console.log(e)
            },
          },
        },
      ],
    }
  },
  methods: {
    handleClick() {
      console.log(this.$form.setFieldsValue('password', 12345))
    },
    useForm(e) {
      this.$form = e
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
