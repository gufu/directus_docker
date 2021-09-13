import grapesjs from 'grapesjs';

const stopPropagation = e => e.stopPropagation();

export default grapesjs.plugins.add('gjs-plugin-ckeditor', (editor, opts = {}) => {
    let c = opts;
    const modal = editor.Modal;

    let defaults = {
        // CKEditor options
        options: {
            position: 'center',
            language: 'en',
            toolbar: [
                { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
                { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
                '/',
                { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
                { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
                { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
                { name: 'insert', items: [ 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
                '/',
                { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
                { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
            ]
            //skin: 'moono-dark',
        },

        // On which side of the element to position the toolbar
        // Available options: 'left|center|right'
        position: 'left',
    };

    // Load defaults
    for (let name in defaults) {
        if (!(name in c))
            c[name] = defaults[name];
    }

    if (!CKEDITOR) {
        console.error(new Error('CKEDITOR instance not found'))
    }

    editor.setCustomRte({
        enable(el, rte) {
            console.log('setCustomRte enable')
            // If already exists I'll just focus on it
            if (rte && rte.status != 'destroyed') {
                this.focus(el, rte);
                return rte;
            }

            el.contentEditable = true;

            // Seems like 'sharedspace' plugin doesn't work exactly as expected
            // so will help hiding other toolbars already created
            let rteToolbar = editor.RichTextEditor.getToolbarEl();
            [].forEach.call(rteToolbar.children, (child) => {
                child.style.display = 'none';
            });
            // console.log('rteToolbar: ', rteToolbar)

            // Check for the mandatory options
            var opt = c.options;
            var plgName = 'sharedspace';

            if (opt.extraPlugins) {
                if (typeof opt.extraPlugins === 'string')
                    opt.extraPlugins += ',' + plgName;
                else
                    opt.extraPlugins.push(plgName);
            } else {
                opt.extraPlugins = plgName;
            }

            // if (!c.options.sharedSpaces) {
            //     c.options.sharedSpaces = {top: rteToolbar};
            // }

            // Init CkEditors
            modal.setContent('<textarea cols="80" id="editor2" name="editor2" rows="10" ></textarea><div class="gjs-rte-toolbar"></div>')
            document.getElementById('editor2').value = el.outerHTML
            const ckeditorInstances = CKEDITOR.instances['editor2'];
            if (ckeditorInstances) { ckeditorInstances.destroy(true) }
            rte = CKEDITOR.replace('editor2', c.options);

            /**
             * Implement the `rte.getContent` method so that GrapesJS is able to retrieve CKE's generated content (`rte.getData`) properly
             *
             * See:
             *  - {@link https://github.com/artf/grapesjs/issues/2916}
             *  - {@link https://github.com/artf/grapesjs/blob/dev/src/dom_components/view/ComponentTextView.js#L80}
             *  - {@link https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_editor.html#method-getData}
             */
            rte.getContent = rte.getData;

            // Make click event propogate
            rte.on('contentDom', () => {
                var editable = rte.editable();
                editable.attachListener(editable, 'click', () => {
                    el.click();
                });
            });

            rte.on('instanceReady', function () {
                console.log('RTE READY')
                const editorEls = document.querySelectorAll('.cke_top .cke_button')
                console.log('editorEls', editorEls)
                    for (let m of editorEls) {
                        console.log('m: ', m)
                        // m.addEventListener('mouseup, mousedown', stopPropagation)
                            ['off', 'on'].forEach(m => m('mousedown', stopPropagation));
                    }
            })

            // The toolbar is not immediatly loaded so will be wrong positioned.
            // With this trick we trigger an event which updates the toolbar position
            // rte.on('instanceReady', e => {
            //     var toolbar = rteToolbar.querySelector('#cke_' + rte.name);
            //     if (toolbar) {
            //         toolbar.style.display = 'block';
            //     }
            //     editor.trigger('canvasScroll')
            // });

            this.focus(el, rte);
            return rte;
        },

        disable(el, rte) {
            modal.close()
            el.contentEditable = false;
            if (rte && rte.focusManager)
                rte.focusManager.blur(true);
        },

        focus(el, rte) {
            console.log('focus123')
            modal.open()
            if (rte && rte.focusManager.hasFocus) {
                return;
            }
            el.contentEditable = true;
            rte && rte.focus();
        },
    });

    // Update RTE toolbar position
    editor.on('rteToolbarPosUpdate', (pos) => {
        console.log('pos: ', pos)
        // Update by position
        switch (c.position) {
            case 'center':
                let diff = (pos.elementWidth / 2) - (pos.targetWidth / 2);
                pos.left = pos.elementLeft + diff;
                break;
            case 'right':
                let width = pos.targetWidth;
                pos.left = pos.elementLeft + pos.elementWidth - width;
                break;
        }

        if (pos.top <= pos.canvasTop) {
            pos.top = 0//pos.elementTop + pos.elementHeight;
        }

        // Check if not outside of the canvas
        if (pos.left < pos.canvasLeft) {
            pos.left = 0 //pos.canvasLeft;
        }
    });

});
