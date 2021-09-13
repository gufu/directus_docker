import grapesjs from "grapesjs";

export const loadBlocks = (editor, config) => {
    const c = config;
    const toAdd = name => config.blocks.indexOf(name) >= 0;

    let bm = editor.BlockManager;
    const clsCont = 'container';
    const clsRow = `row`;
    const clsCol = `col`;

    const step = 0.2;
    const minDim = 1;
    const currentUnit = 1;
    const resizerBtm = { tl: 0, tc: 0, tr: 0, cl: 0, cr:0, bl:0, br: 0, minDim };
    const resizerRight = { ...resizerBtm, cr: 1, bc: 0, currentUnit, minDim, step };

    const containerAttr = {
        class: clsCont,
        'data-gjs-droppable': `.${clsCol}`,
        'data-gjs-resizable': resizerRight,
        'data-gjs-name': 'Container'
    }

    const rowAttr = {
        class: clsRow,
        'data-gjs-droppable': `.${clsCol}`,
        'data-gjs-resizable': resizerBtm,
        'data-gjs-name': 'Row',
    };

    const colAttr = {
        class: clsCol,
        'data-gjs-draggable': `.${clsRow}`,
        'data-gjs-resizable': resizerRight,
        'data-gjs-name': 'col',
    };

    // Make row and column classes private
    // const privateCls = [`.${clsCont}`, `.${clsRow}`, `.${clsCol}`];
    // editor.on('selector:add', selector =>
    //     privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1))

    const attrsToString = attrs => {
        const result = [];

        for (let key in attrs) {
            let value = attrs[key];
            const toParse = value instanceof Array || value instanceof Object;
            value = toParse ? JSON.stringify(value) : value;
            result.push(`${key}=${toParse ? `'${value}'` : `"${value}"`}`);
        }

        return result.length ? ` ${result.join(' ')}` : '';
    }

    const attrsRow = attrsToString(rowAttr)
    const attrsCol = attrsToString(colAttr)
    const attrsContainer = attrsToString(containerAttr)

    toAdd('column1') && bm.add('column1', {
        label: c.labelColumn1,
        category: c.category,
        attributes: {class:'gjs-fonts gjs-f-b1'},
        content: `
        <div ${attrsContainer}>
            <div ${attrsRow}>
                <div ${attrsCol}></div>
            </div>
        </div>`
    });

    toAdd('column2') && bm.add('column2', {
        label: c.labelColumn2,
        attributes: {class:'gjs-fonts gjs-f-b2'},
        category: c.category,
        content: `<div ${attrsRow}>
        <div ${attrsCol}></div>
        <div ${attrsCol}></div>
      </div>`
    });

    toAdd('column3') && bm.add('column3', {
        label: c.labelColumn3,
        category: c.category,
        attributes: {class:'gjs-fonts gjs-f-b3'},
        content: `<div ${attrsRow}>
        <div ${attrsCol}></div>
        <div ${attrsCol}></div>
        <div ${attrsCol}></div>
      </div>`
    });

    toAdd('column3-7') && bm.add('column3-7', {
        label: c.labelColumn37,
        category: c.category,
        attributes: {class:'gjs-fonts gjs-f-b37'},
        content: `<div ${attrsRow}>
        <div ${attrsCol} style="30%;"></div>
        <div ${attrsCol} style="70%;"></div>
      </div>`
    });

    toAdd('text') && bm.add('text', {
        label: c.labelText,
        category: c.category,
        attributes: {class:'gjs-fonts gjs-f-text'},
        content: {
            type:'text',
            content:'Insert your text here',
            style: {padding: '10px' },
            activeOnRender: 1
        },
    });

    toAdd('link') && bm.add('link', {
        label: c.labelLink,
        category: c.category,
        attributes: {class:'fa fa-link'},
        content: {
            type:'link',
            content:'Link',
            style: {color: '#d983a6'}
        },
    });

    toAdd('image') && bm.add('image', {
        label: c.labelImage,
        category: c.category,
        attributes: {class:'gjs-fonts gjs-f-image'},
        content: {
            style: {color: 'black', 'width': '100%'},
            type:'image',
            activeOnRender: 1
        },
    });

    toAdd('video') && bm.add('video', {
        label: c.labelVideo,
        category: c.category,
        attributes: {class:'fa fa-youtube-play'},
        content: {
            type: 'video',
            src: 'img/video2.webm',
            style: {
                width: '100%',
            }
        },
    });

    toAdd('map') && bm.add('map', {
        label: c.labelMap,
        category: c.category,
        attributes: {class:'fa fa-map-o'},
        content: {
            type: 'map',
            style: {width: '100%',}
        },
    });
}

export default grapesjs.plugins.add('gjs-blocks-basic', (editor, opts = {}) => {
    const config = {
        blocks: [
            'column1',
            'column2',
            'column3',
            'column3-7',
            'text',
            'link',
            'image',
            'video',
            'map'
        ],
        stylePrefix: '',
        addBasicStyle: false,
        category: 'Basic',
        labelColumn1: '1 Column',
        labelColumn2: '2 Columns',
        labelColumn3: '3 Columns',
        labelColumn37: '2 Columns 3/7',
        labelText: 'Text',
        labelLink: 'Link',
        labelImage: 'Image',
        labelVideo: 'Video',
        labelMap: 'Map',
        ...opts
    };

    // Add blocks
    // const loadBlocks = require('./blocks');
    loadBlocks(editor, config);

});