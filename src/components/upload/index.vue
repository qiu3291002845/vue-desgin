<template>
  <div>
    <elUpload
      :on-preview="file => handlePictureCardPreview(file)"
      :on-remove="(file, fileList) => onRemove(file, fileList)"
      :before-remove="(file, fileList) => onBeforeRemove(file, fileList)"
      :before-upload="file => onBeforeUpload(file)"
      :on-change="(file, fileList) => onChange(file, fileList)"
      :on-progress="
        (event, file, fileList) => onProgress(event, file, fileList)
      "
      :on-error="(err, file, fileList) => onError(err, file, fileList)"
      :on-success="
        (response, file, fileList) => handleSuccess(response, file, fileList)
      "
      :on-exceed="(files, fileList) => onExceed(files, fileList)"
      :multiple="multiple"
      :auto-upload="autoUpload"
      :action="action"
      :limit="limit"
      :accept="accept"
      :file-list="fileList"
      :http-request="httpRequest"
      :data="data"
      :headers="headers"
      :name="name"
      :listType="listType"
      :drag="drag"
      :disabled="disabled"
      :showFileList="showFileList"
      :withCredentials="withCredentials"
      :autoUpload="autoUpload"
      :fileList="fileList"
      :httpRequest="httpRequest"
      :class="chassnames"
      :style="{
        '--uploadWidth': uploadWidth + 'px',
        '--uploadHeight': uploadHeight + 'px',
      }"
    >
      <template v-if="listType === 'text'">
        <el-button :size="uploadButtonSize" :type="uploadButtonType">
          点击上传
        </el-button>
        <div slot="tip" class="el-upload__tip">
          {{ description }}
        </div>
      </template>
      <template v-if="listType === 'picture-card'">
        <i class="el-icon-plus"></i>
      </template>
      <template v-if="listType === 'picture'">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </template>
    </elUpload>
    <div class="picture__box" v-if="PreviewImageUrl">
      <el-image
        ref="uploadImageRef"
        id="former__upload__image"
        width="100%"
        :src="PreviewImageUrl"
        lazy
        alt=""
        :preview-src-list="[PreviewImageUrl]"
      />
    </div>
  </div>
</template>
<script>
import classNames from 'classnames'
import { Upload } from 'element-ui'
export default {
  components: {
    elUpload: Upload,
  },
  props: {
    uploadWidth: { type: Number, default: 125 },
    uploadHeight: { type: Number, default: 125 },
    uploadButtonText: {
      type: String,
      default: '点击上传',
    },
    uploadButtonSize: {
      type: String,
      default: 'small',
    },
    uploadButtonType: {
      type: String,
      default: 'primary',
    },
    description: {
      type: String,
      default: '只能上传jpg/png文件，且不超过500kb',
    },
    action: { type: String, default: '' },
    accept: { type: String, default: '' },
    data: { type: Object, default: () => ({}) },
    headers: { type: Object, default: () => ({}) },
    name: { type: String, default: 'file' },
    listType: { type: String, default: 'text' },
    limit: { type: Number, default: 3 },
    multiple: { type: Boolean, default: true },
    drag: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    showFileList: { type: Boolean, default: true },
    withCredentials: { type: Boolean, default: false },
    autoUpload: { type: Boolean, default: true },
    fileList: { type: Array, default: () => [] },
    httpRequest: { type: Function, default: () => {} },
    onPreview: { type: Function, default: () => {} },
    onRemove: { type: Function, default: () => {} },
    onBeforeRemove: { type: Function, default: () => {} },
    onBeforeUpload: { type: Function, default: () => {} },
    onChange: { type: Function, default: () => {} },
    onProgress: { type: Function, default: () => {} },
    onError: { type: Function, default: () => {} },
    onSuccess: { type: Function, default: () => {} },
    onExceed: { type: Function, default: () => {} },
  },
  data() {
    return {
      chassnames: '',
      imageUrl: '',
      PreviewImageUrl: '',
    }
  },
  created() {
    this.chassnames = classNames('mc-upload', {
      'avatar-uploader': (this.listType = 'picture'),
    })
  },
  methods: {
    handleSuccess(response, file, fileList) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.onSuccess(response, file, fileList)
    },
    handlePictureCardPreview(file) {
      this.PreviewImageUrl = file.url
      this.onPreview(file)
      setTimeout(() => {
        this.$refs.uploadImageRef.$el.click()
        document.getElementById('former__upload__image').click()
      }, 250)
    },
  },
}
</script>
<style lang="scss" scoped>
::v-deep {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: var(--uploadWidth);
    height: var(--uploadHeight);
    display: block;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: var(--uploadWidth);
    height: var(--uploadHeight);
    line-height: var(--uploadHeight);
    text-align: center;
  }
}
.picture__box {
  ::v-deep {
    .el-image {
      width: 0;
      height: 0;
    }
  }
  width: 0;
  height: 0;
}
</style>
