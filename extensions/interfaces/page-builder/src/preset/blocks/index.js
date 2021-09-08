export default (editor, config) => {
  const bm = editor.BlockManager;
  const toAdd = name => config.blocks.indexOf(name) >= 0;

  toAdd('h1') && bm.add('h1', {
    category: 'Headings',
    label: 'Heading 1',
    attributes: { class: 'fas fa-heading' },
    content: `<h1>Heading 1</h1>`
  })

  toAdd('h2') && bm.add('h2', {
    category: 'Headings',
    label: 'Heading 2',
    attributes: { class: 'fas fa-heading' },
    content: `<h2>Heading 2</h2>`
  })

  toAdd('h3') && bm.add('h3', {
    category: 'Headings',
    label: 'Heading 3',
    attributes: { class: 'fas fa-heading' },
    content: `<h3>Heading 3</h3>`
  })

  toAdd('h4') && bm.add('h4', {
    category: 'Headings',
    label: 'Heading 4',
    attributes: { class: 'fas fa-heading' },
    content: `<h4>Heading 4</h4>`
  })

  toAdd('h5') && bm.add('h5', {
    category: 'Headings',
    label: 'Heading 5',
    attributes: { class: 'fas fa-heading' },
    content: `<h5>Heading 5</h5>`
  })

  toAdd('link-block') && bm.add('link-block', {
    category: 'Basic',
    label: 'Link Block',
    attributes: { class: 'fa fa-link' },
    content: {
      type:'link',
      editable: false,
      droppable: true,
      style:{
        display: 'inline-block',
        padding: '5px',
        'min-height': '50px',
        'min-width': '50px'
      }
    },
  });

  toAdd('quote') && bm.add('quote', {
    label: 'Quote',
    category: 'Basic',
    attributes: { class: 'fa fa-quote-right' },
    content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>`
  });

  toAdd('text-basic') && bm.add('text-basic', {
    category: 'Basic',
    label: 'Text section',
    attributes: { class: 'gjs-fonts gjs-f-h1p' },
    content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`
  });
}
