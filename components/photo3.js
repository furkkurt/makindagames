template.innerHTML = `
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <link rel="stylesheet" href="../static/output.css" />
    <title>Header Component</title>
  </head>
  <body>
    <div class="relative h-128 w-96 bg-honeyGold p-4 pt-6 pb-20 border-double border-4 border-tpGrey">
      <div class="absolute text-tpRed text-4xl bold text-center top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
        📍
      </div>
      <div class="h-full">
        <img class="h-full m-auto border-black border-2" src="./assets/me4.jpg" />
      </div>
      <div class="text-xl text-tpGrey opacity-80 font-custom2 italic font-bold p-6">
        Go-to setup for coding
      </div>
    </div>
  </body>
`;

class photo3 extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.append(template.content.cloneNode(true));
	}
}

customElements.define('photo-3', photo3);
