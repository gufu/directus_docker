<template>
  <div class="container v-application">
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
    <div id="blocks"></div>
    <input :value="value" @input="handleChange($event.target.value)" hidden />
  </div>
</template>

<script>
import grapesjs from 'grapesjs'
import preset from './preset/index'

const config = {

}

export default {
  emits: ['input'],
  data() {
    return {
      value: this.value
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
        fromElement: false,
        // Size of the editor
        height: '800px',
        width: '100%',
        storageManager: {
          type: 'simple-storage',
          autosave: true,
          autoload: false
        }
      })
    }
  },
  methods: {
    init() {
      const that = this
      const storage = this.editor.StorageManager
      preset(this.editor, {})

      storage.add('simple-storage', {
        load(keys, clb, clbErr) {
          const result = {}
          console.log('LOAD')
          console.log('LOAD keys: ', keys)
          if (that.value) {
            const parsed = JSON.parse(that.value)
            console.log('LOAD value: ', parsed)
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
  mounted () {
    this.init()
    this.$nextTick()
  }
}
</script>

<style lang="scss" scoped>
@import "css/grapes.css";
@import "css/vuetify.min.css";
@import "preset/style/main.scss";
#gjs {
  width:100%;
  height: 800px;
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
