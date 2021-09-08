<template>
  <div class="container">
    <div class="panel__top">
      <div class="panel__basic-actions"></div>
      <div class="panel__devices"></div>
      <div class="panel__switcher"></div>
    </div>
    <div class="editor-row">
      <div class="editor-canvas">
        <div id="gjs">
          <h1>Hello World Component!</h1>
        </div>
      </div>
      <div class="panel__right">
        <div class="layers-container"></div>
        <div class="styles-container"></div>
      </div>
    </div>
<!--    <div id="blocks"></div>-->
    <input :value="value" @input="handleChange($event.target.value)" hidden/>
  </div>
</template>

<script>
import grapesjs from 'grapesjs'
import preset from './preset/index'
import {canvasStyles} from './css/canvas-styles.js'
// import axios from 'axios'

const config = {}

export default {
  emits: ['input'],
  data() {
    return {
      value: this.value,
      assets: []
    }
  },
  props: {
    value: String,
  },
  watch: {
    value: function (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.editor.load(newVal)
      }
    }
  },
  computed: {
    preset: () => {
      return preset.plugin
    },
    editor: () => {
      return grapesjs.init({
        container: '#gjs',
        components: '',
        plugins: ['gjs-preset-webpage'],
        pluginsOpts: {
          'gjs-preset-webpage': {
            // options
          }
        },
        fromElement: false,
        // Size of the editor
        height: '800px',
        width: '100%',
        baseCss: canvasStyles,
        storageManager: {
          type: 'simple-storage',
          autosave: true,
          autoload: false
        },
        styleManager: '',
        assetManager: {
          upload: '/files?access_token=secret',
          uploadName: 'files',
          headers: {},
          params: {
            access_token: 'secret'
          },
          credentials: 'include',
          multiUpload: true,
          autoAdd: 1,
          dropzone: 1,
          openAssetsOnDrop: 1
        }
      })
    }
  },
  methods: {
    /**
     * get asset list from directus and push them to asset manager of the page builder component
     * */
    addAssetsToList (assets) {
      if (assets) {
        console.log('assets: ', assets)
        for (let asset of assets) {
          this.assets.push({
            src: `/assets/${asset.id}?access_token=secret`,
            name: asset.title,
            height: asset.height,
            width: asset.width
          })
        }

        const assetManager = this.editor.AssetManager
        assetManager.load({})
        assetManager.load({
          assets: this.assets
        })
      }
    },
    async getAssets() {
      console.log('getAssets called')
      const that = this
      this.assets = []

      fetch('/files?access_token=secret')
          .then(response => {
            try {
              return response.json()
            } catch (e) {
              return {}
            }
          })
          .then(data => {
            that.addAssetsToList(data.data)
          })
          .catch(err => {
            // Do something for an error here
            console.log('Error Reading data ' + err);
          })
    },
    async uploadFile(e) {
      const that = this
      console.log('this.uploadFile(e)')
      const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
      const formData = new FormData();
      const file = files[0]
      delete file.metadata
      formData.append('title', file.name);
      formData.append('file', file);
      //TODO: handle credentials to upload/fetch files
      await fetch('/files?access_token=secret', {
        method: 'POST',
        body: formData
      })
          .then(response => {
            try {
              return response.json()
            } catch (e) {
              return {}
            }
          })
          .then(response => {
            console.log('uploadFile response: ', response.data)
            that.addAssetsToList([].push(response.data))
          })
    },
    init() {
      const that = this
      const storage = this.editor.StorageManager
      const assetManager = this.editor.AssetManager
      assetManager.uploadFile = this.uploadFile

      this.editor.on('asset:upload:end', async (response) => {
        console.log('asset:upload:end: ', response)
      })

      this.editor.on('asset:add', async (response) => {
        console.log('asset:add: ', response)
      })

      storage.add('simple-storage', {
        load(keys, clb, clbErr) {
          const result = {}
          if (that.value) {
            const parsed = JSON.parse(that.value)
            keys.forEach(key => {
              const value = parsed[key]
              if (value) {
                result[key] = value
              }
            })
            clb(result)
          }
        },
        store(data, clb, clbErr) {
          that.value = data
          that.$emit('input', data)
          clb()
        }
      })
      this.$nextTick()
    },
    handleChange(value) {
      this.$emit('input', value)
    },
  },
  mounted() {
    this.init()
    this.getAssets()
    this.$nextTick()
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400;1,700&display=swap');
@import "css/grapes.css";
//@import "css/vuetify.min.css";
@import "preset/style/main.scss";

.container {
  h1, h2, h3, h4, h5, h6, p, a, span, div {
    font-family: 'Roboto', 'Arial', sans-serif;
  }
}

#gjs {
  width: 100%;
  height: 800px;
}

.gjs-frame {
  h1, h2, h3, h4, h5, h6, p, a, span, div {
    font-family: 'Roboto', 'Arial', sans-serif;
  }
}

.panel__top {
  padding: 0;
  width: 100%;
  display: flex;
  position: initial;
  justify-content: center;
  justify-content: space-between;
}

.sp-container {
  position: fixed;
}

#blocks {
  width: auto;
  height: auto;
  min-height: auto;
}

.panel__right {
  position: initial;
}

.panel__basic-actions {
  position: initial;
}

.panel__devices {
  position: initial;
}

.panel__switcher {
  position: initial;
}
</style>
