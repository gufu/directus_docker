<template>
  <div>
    <v-checkbox v-model="enabled" label="Show Page Builder!" />
    <small>Please note: Page builder content will completely override any other content defined for this page!</small>
    <div v-show="enabled" class="container">
      <div class="panel__top">
        <div class="panel__basic-actions"></div>
        <div class="panel__devices"></div>
        <div class="panel__switcher"></div>
      </div>
      <div class="editor-row">
        <div class="editor-canvas">
          <div id="gjs">
            <!--            <h1>Hello World Component!</h1>-->
            <div class="row">
              <div class="col"></div>
              <div class="col"></div>
              <div class="col"></div>
            </div>
          </div>
        </div>
        <div class="panel__right">
          <div class="layers-container"></div>
          <div class="styles-container"></div>
        </div>
      </div>
      <!--    <div id="blocks"></div>-->
      <input :value="pageBuilderContent" @input="handleChange($event.target.value)" hidden/>
      <div id="editor"></div>
    </div>
  </div>
</template>

<script>
import grapesjs from 'grapesjs'
import pluginCkEditor from './lib/ckeditor-plugin_wip'
import preset from './preset/index'
import {canvasStyles} from './css/canvas-styles.js'
import {CKEDITOR_CONFIG} from './lib/ckeditor-config'
import {addSimpleStorage} from './lib/simple-storage'
import {wrapCanvas} from './lib/canvas-wrapper'
import {assetUploadHandler} from './lib/assets-upload'
import {globalExists} from './lib/helpers'

const config = {}
let CKEDITOR_LOADED = false

export default {
  props: {
    env: {
      type: String,
      default: 'production'
    },
    value: String,
  },
  emits: ['input'],
  data() {
    return {
      enabled: !this.isProduction,
      pageBuilderContent: this.value,
      assets: [],
      editor: null
    }
  },
  computed: {
    isProduction() {
      return this.env.toLowerCase() === 'production'
    },
    preset() {
      return preset.plugin
    }
  },
  watch: {
    pageBuilderContent: function (newVal, oldVal) {
      if(newVal) {
        this.enabled = true
      }
      if (this.editor && newVal && !oldVal) {
        this.editor.load(newVal)
      }
    }
  },
  mounted() {
    (async () => {
      while (!globalExists('CKEDITOR')) // define the condition as you like
        await new Promise(resolve => setTimeout(resolve, 1000));
      CKEDITOR_LOADED = true
      this.init()
      if (this.isProduction) {
        this.getAssets()
      }
      this.$nextTick()
    })();
  },
  beforeMount() {
    const script2 = document.createElement('script')
    script2.type = 'text/javascript'
    script2.src = 'https://cdn.jsdelivr.net/npm/grapesjs-plugin-ckeditor@0.0.9/dist/grapesjs-plugin-ckeditor.min.js'
    document.getElementsByTagName('head')[0].appendChild(script2)

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = '//cdn.ckeditor.com/4.16.2/full-all/ckeditor.js'
    document.getElementsByTagName('head')[0].appendChild(script)
  },
  methods: {
    /**
     * get asset list from directus and push them to asset manager of the page builder component
     * */
    addAssetsToList(assets) {
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
    getEditorInstance () {
      const isProduction = this.isProduction
      console.log('isProduction1', isProduction)
      console.log('isProduction2', this.isProduction)
      return grapesjs.init({
        container: '#gjs',
        components: '',
        plugins: [
          'gjs-preset-webpage',
          pluginCkEditor
        ],
        pluginsOpts: {
          'gjs-preset-webpage': {},
          'gjs-plugin-ckeditor': CKEDITOR_CONFIG
        },
        fromElement: !isProduction,
        // Size of the editor
        height: '800px',
        width: '100%',
        canvas: {
          styles: [
            'https://cdnjs.cloudflare.com/ajax/libs/vuetify/2.5.8/vuetify.min.css'
            // 'https://cdn.jsdelivr.netvuetify.min.css/npm/vuetify@2.5.8/dist/vuetify.min.css'
          ]
        },
        baseCss: canvasStyles,
        storageManager: {
          type: 'simple-storage',
          autosave: true,
          autoload: false
        },
        styleManager: '',
        assetManager: {
          upload: isProduction ? '/files?access_token=secret' : '',
          uploadName: isProduction ? 'files' : '',
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
    },
    init() {
      const that = this
      this.editor = this.getEditorInstance()
      const editor = this.editor
      addSimpleStorage(editor, that)
      this.$nextTick()
      editor.on('load', function () {
        wrapCanvas(editor)
        assetUploadHandler(editor)
        editor.load(that.pageBuilderContent)
        if(that.pageBuilderContent) {
          that.enabled = true
        }
      })
    },
    handleChange(value) {
      this.$emit('input', value)
    }
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
