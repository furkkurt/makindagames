template.innerHTML = `
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Footer Component</title>
    <link rel="stylesheet" href="../static/output.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body>
    <footer class="m-auto border-4 bottom-0 w-full h-40 flex space-x-8 p-4 bg-logoBlue font-custom1 xl:w-5/6">
      <div class="flex flex-col w-full sm:w-1/3">
        <p class="font-bold text-xl text-white pb-2">Contacts</p>
        <hr class="pb-2 w-1/2">
        <p class="pl-2 text-white">afurkankurt@outlook.com</p>
        <p class="pl-2 text-white">+90 552 248 41 38</p>
        <a href="../contacts.html" class="pl-2 text-white hover:scale-110 transition">Other social accounts</a>
      </div>
      <div class="justify-center items-center w-full hidden md:flex">
        <img class="h-40 border-y-4" src="../assets/logo.png" />
      </div>
      <div class="w-1/3 hidden md:block"></div>
    </footer>
  </body>
`;

class customFooter extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.append(template.content.cloneNode(true));
	}
}

customElements.define('custom-footer', customFooter);
