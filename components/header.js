const template = document.createElement('template');
template.innerHTML = `
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" href="../static/output.css" />
    <title>Header Component</title>
  </head>
  <body>
    <header class="flex items-center justify-between bg-tpGrey h-16">
      <!-- Logo -->
      <div class="pl-2 flex flex-row">
          <p class="text-tpPink text-2xl font-custom1 hidden md:flex">makin</p>
          <p class="text-tpRed text-2xl font-custom1">DAG</p>
          <p class="text-tpPink text-2xl font-custom1 hidden md:flex">ames</p>
      </div>
      <!-- Menu Items -->
      <div class="justify-around space-x-4 pr-8">
        <a href="#" class="text-tpPink font-custom1 hover:text-tpRed hover:scale-110 transition">Home</a>
        <a href="#" class="text-tpPink font-custom1 hover:text-tpRed hover:scale-110 transition">About</a>
        <a href="#" class="text-tpPink font-custom1 hover:text-tpRed hover:scale-110 transition">Portfolio</a>
        <a href="#" class="text-tpPink font-custom1 hover:text-tpRed hover:scale-110 transition">Contact</a>
      </div>
    
    </header>
  </body>
`;

class customHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.append(template.content.cloneNode(true));
	}
}

customElements.define('custom-header', customHeader);
