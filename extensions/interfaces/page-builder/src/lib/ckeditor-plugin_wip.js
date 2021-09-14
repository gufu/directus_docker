import grapesjs from 'grapesjs'
import {globalExists} from './helpers'

export default grapesjs.plugins.add('gjs-plugin-ckeditor', (editor, opts = {}) => {
	let c = opts
	const modal = editor.Modal
	
	let defaults = {
		// CKEditor options
		options: {
			position: 'center',
			language: 'en',
			toolbar: [
				{name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
				{name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt']},
				'/',
				{
					name: 'basicstyles',
					items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat']
				},
				{
					name: 'paragraph',
					items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language']
				},
				{name: 'links', items: ['Link', 'Unlink', 'Anchor']},
				{name: 'insert', items: ['Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
				'/',
				{name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
				{name: 'colors', items: ['TextColor', 'BGColor']},
				{name: 'tools', items: ['Maximize', 'ShowBlocks']}
			]
			//skin: 'moono-dark',
		},
		
		// On which side of the element to position the toolbar
		// Available options: 'left|center|right'
		position: 'left',
	}
	
	// Load defaults
	for (let name in defaults) {
		if (!(name in c))
			c[name] = defaults[name]
	}
	
	if (!globalExists('CKEDITOR')) {
		console.error(new Error('CKEDITOR instance not found'))
	}
	
	editor.setCustomRte({
		enable(el, rte) {
			if (rte && rte.status !== 'destroyed') {
				this.focus(el, rte)
				return rte
			}
			
			// Check for the mandatory options
			var opt = c.options
			var plgName = 'sharedspace'
			
			if (opt.extraPlugins) {
				if (typeof opt.extraPlugins === 'string')
					opt.extraPlugins += ',' + plgName
				else
					opt.extraPlugins.push(plgName)
			} else {
				opt.extraPlugins = plgName
			}
			
			// Init CkEditors
			modal.setContent('<textarea cols="80" id="editor2" name="editor2" rows="10" ></textarea><div class="gjs-rte-toolbar"></div>')
			let contentToEdit = el.outerHTML.replace('gjs-selected', '')
			console.log('contentToEdit', contentToEdit)
			// have to remove selected class from gjs
			// contentToEdit.replace('gjs-selected', '')
			// console.log('contentToEdit', contentToEdit)
			document.getElementById('editor2').value = contentToEdit
			const ckeditorInstances = CKEDITOR.instances['editor2']
			if (ckeditorInstances) {
				ckeditorInstances.destroy(true)
			}
			rte = CKEDITOR.replace('editor2', c.options)
			
			/**
			 * Implement the `rte.getContent` method so that GrapesJS is able to retrieve CKE's generated content (`rte.getData`) properly
			 *
			 * See:
			 *  - {@link https://github.com/artf/grapesjs/issues/2916}
			 *  - {@link https://github.com/artf/grapesjs/blob/dev/src/dom_components/view/ComponentTextView.js#L80}
			 *  - {@link https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-getData}
			 */
			rte.getContent = rte.getData
			
			// Make click event propogate
			rte.on('contentDom', () => {
				console.log('rte.on contentDom')
				var editable = rte.editable()
				editable.attachListener(editable, 'click', () => {
					el.click()
				})
			})
			
			rte.on('instanceReady', function () {
				const allElements = Array.from(document.querySelectorAll('.cke_top *'))
				for (let m of allElements) {
					m.addEventListener('mousedown', (e) => {
						e.stopPropagation()
					})
				}
			})
			
			console.log('focus manager: ', rte.focusManager)
			
			this.focus(el, rte)
			return rte
		},
		
		disable(el, rte) {
			modal.close()
			editor.select('')
			if (rte && rte.focusManager)
				rte.focusManager.blur(true)
		},
		
		focus(el, rte) {
			modal.open()
			if (rte && rte.focusManager.hasFocus) {
				return
			}
			rte && rte.focus()
		}
	})
})
