class MyAppComponent extends HTMLElement {
	connectedCallback() {
		this.innerHTML = `<div class="app" >
								<my-header></my-header>
								<my-employees><my-employees>
							</div>`;
	}
}