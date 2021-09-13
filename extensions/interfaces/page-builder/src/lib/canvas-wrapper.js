export const wrapCanvas = (editor) => {
    const canvas = editor.Canvas
    const iframeElement = canvas.getDocument()
    const body = iframeElement.getElementsByTagName('body').item(0)
    const wrapper = body.querySelectorAll('[data-gjs-type="wrapper"]').item(0)

    body.classList.add('v-application')
    wrapper.classList.add('v-application--wrap')
}