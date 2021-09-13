export default (editor, config) => {
  const bm = editor.BlockManager;
  const toAdd = name => config.blocks.indexOf(name) >= 0;
  const VUETIFY_GROUP = 'Vuetify components'

  const privateCls = ['.v-card', '.v-sheet', '.theme--dark', '.v-card__title'];
  editor.on('selector:add', selector =>
      privateCls.indexOf(selector.getFullName()) >= 0 && selector.set('private', 1))

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
    }
  })

  toAdd('quote') && bm.add('quote', {
    label: 'Quote',
    category: 'Basic',
    attributes: { class: 'fa fa-quote-right' },
    content: `<blockquote class="quote">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore ipsum dolor sit
      </blockquote>`
  })

  toAdd('text-basic') && bm.add('text-basic', {
    category: 'Basic',
    label: 'Text section',
    attributes: { class: 'gjs-fonts gjs-f-h1p' },
    content: `<section class="bdg-sect">
      <h1 class="heading">Insert title here</h1>
      <p class="paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
      </section>`
  })

  toAdd('v-card') && bm.add('v-card', {
    category: VUETIFY_GROUP,
    label: 'Card with top image',
    content: `<div class="mx-auto v-card v-sheet theme--dark"><div class="v-image v-responsive theme--dark" style="max-height: 200px;"><div class="v-responsive__sizer" style="padding-bottom: 150%;"></div><div class="v-image__image v-image__image--cover" style="background-image: url(&quot;https://picsum.photos/200/300&quot;); background-position: center center;"></div><div class="v-responsive__content" style="width: 200px;"></div></div> <div class="v-card__title">
        Card title
      </div> <div class="v-card__subtitle">
        Card subtitle
      </div> <div class="v-card__actions"><button type="button" class="v-btn v-btn--text theme--dark v-size--default primary--text"><span class="v-btn__content">
          Button
        </span></button> <div class="spacer"></div></div> <hr role="separator" aria-orientation="horizontal" class="v-divider theme--dark"> <div class="v-card__text">
        I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
      </div></div>`
  })

  toAdd('v-card-horizontal-text') && bm.add('v-card-horizontal-text', {
    category: VUETIFY_GROUP,
    label: 'Horizontal card with text',
    content: `<div class="v-card v-sheet theme--dark" style="background-color: rgb(56, 95, 115); border-color: rgb(56, 95, 115);"><div class="v-card__title text-h5">
        Unlimited music now
      </div> <div class="v-card__subtitle">Listen to your favorite artists and albums whenever and wherever, online and offline.</div> <div class="v-card__actions"><button type="button" class="v-btn v-btn--text theme--dark v-size--default"><span class="v-btn__content">
          Listen Now
        </span></button></div></div>`
  })

  toAdd('v-card-horizontal-image') && bm.add('v-card-horizontal-image', {
    category: VUETIFY_GROUP,
    label: 'Horizontal card with image',
    content: `<div class="v-card v-sheet theme--dark primary"><div class="d-flex flex-no-wrap justify-space-between"><div><div class="v-card__title text-h5">Free Guy</div> <div class="v-card__subtitle">Movie description</div> <div class="v-card__actions"><button type="button" class="ml-2 mt-5 v-btn v-btn--outlined v-btn--rounded theme--dark v-size--small"><span class="v-btn__content">
              SEE MORE
            </span></button></div></div> <div class="v-avatar ma-3 rounded-0" style="height: 125px; min-width: 125px; width: 125px;"><div class="v-image v-responsive theme--dark"><div class="v-responsive__sizer" style="padding-bottom: 100%;"></div><div class="v-image__image v-image__image--cover" style="background-image: url(&quot;https://picsum.photos/200/200&quot;); background-position: center center;"></div><div class="v-responsive__content" style="width: 200px;"></div></div></div></div></div>`
  })

  toAdd('v-card-twitter') && bm.add('v-card-twitter', {
    category: VUETIFY_GROUP,
    label: 'Twitter style card',
    content: `<div class="v-card v-sheet theme--dark" style="background-color: rgb(38, 198, 218); border-color: rgb(38, 198, 218);"><div class="v-card__title"><i aria-hidden="true" class="v-icon notranslate v-icon--left mdi mdi-twitter theme--dark" style="font-size: 36px;"></i> <span class="text-h6 font-weight-light">Twitter</span></div> <div class="v-card__text text-h5 font-weight-bold">
        "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
      </div> <div class="v-card__actions"><div tabindex="-1" class="grow v-list-item theme--dark"><div class="v-avatar v-list-item__avatar grey darken-3" style="height: 40px; min-width: 40px; width: 40px;"><div aria-label="" class="v-image v-responsive elevation-6 theme--dark"><div class="v-responsive__sizer" style="padding-bottom: 106.061%;"></div><div class="v-image__image v-image__image--cover" style="background-image: url(&quot;https://avataaars.io/?avatarStyle=Transparent&amp;topType=ShortHairShortCurly&amp;accessoriesType=Prescription02&amp;hairColor=Black&amp;facialHairType=Blank&amp;clotheType=Hoodie&amp;clotheColor=White&amp;eyeType=Default&amp;eyebrowType=DefaultNatural&amp;mouthType=Default&amp;skinColor=Light&quot;); background-position: center center;"></div><div class="v-responsive__content" style="width: 264px;"></div></div></div> <div class="v-list-item__content"><div class="v-list-item__title">Evan You</div></div> <div class="row align-center justify-end"><i aria-hidden="true" class="v-icon notranslate mr-1 mdi mdi-heart theme--dark"></i> <span class="subheading mr-2">256</span> <span class="mr-1">·</span> <i aria-hidden="true" class="v-icon notranslate mr-1 mdi mdi-share-variant theme--dark"></i> <span class="subheading">45</span></div></div></div></div>`
  })

  toAdd('v-card-price-default') && bm.add('v-card-price-default', {
    category: VUETIFY_GROUP,
    label: 'Price card (default)',
    content: `<div class="py-10 px-4 v-card v-sheet theme--light rounded-xl"><div class="v-card__text text-left"><p style="font-size:32px;font-weight:bold;">Enterprise</p> <p class="mt-4 mb-0" style="font-size:16px;">Perfect for companies wanting advanced tools and support</p> <p class="my-10" style="font-size:60px;">-</p> <p><span style="font-size:20px;">USD</span> <span style="font-size:40px;font-weight:bold;">$49.00</span></p> <p>billed yearly<br><span style="font-weight:bold;">$69.00</span> billed monthly</p> <button type="button" class="my-8 v-btn v-btn--block v-btn--outlined v-btn--rounded v-btn--text theme--light v-size--x-large"><span class="v-btn__content"> Start a free 7-day trial </span></button> <p class="mb-0" style="font-weight: bold;">Premium features, plus:</p> <ul><li><span style="font-weight: bold;">Dedicated</span> hardware</li> <li><span style="font-weight: bold;">%99.9</span> uptime</li> <li>Advanced analytics</li> <li>3rd party integrations</li> <li>24 / 7 support</li></ul></div></div>`
  })

  toAdd('v-card-price-popular') && bm.add('v-card-price-popular', {
    category: VUETIFY_GROUP,
    label: 'Price card (popular)',
    content: `<div class="py-10 px-4 rounded-xl v-card v-sheet v-sheet--outlined theme--light" style="border-color:#90CAF9;border-width:2px;"><div class="v-card__title" style="position:absolute;top:-16px;left:0;right:0;padding:0;width:100%;text-align:center;"><span draggable="false" class="px-8 v-chip theme--light v-size--default" style="background-color:#90CAF9;border-color:#90CAF9;margin:0 auto;"><span class="v-chip__content">MOST POPULAR</span></span></div> <div class="v-card__text text-left"><p style="font-size:32px;font-weight:bold;">Enterprise</p> <p class="mt-4 mb-0" style="font-size:16px;">Perfect for companies wanting advanced tools and support</p> <p class="my-10" style="font-size:60px;">-</p> <p><span style="font-size:20px;">USD</span> <span style="font-size:40px;font-weight:bold;">$49.00</span></p> <p>billed yearly<br><span style="font-weight:bold;">$69.00</span> billed monthly</p> <button type="button" class="my-8 v-btn v-btn--block v-btn--is-elevated v-btn--has-bg v-btn--rounded theme--light v-size--x-large primary"><span class="v-btn__content"> Start a free 7-day trial </span></button> <p class="mb-0" style="font-weight:bold;">Premium features, plus:</p> <ul><li><span style="font-weight:bold;">Dedicated</span> hardware</li> <li><span style="font-weight:bold;">%99.9</span> uptime</li> <li>Advanced analytics</li> <li>3rd party integrations</li> <li>24 / 7 support</li></ul></div></div>`
  })
}
