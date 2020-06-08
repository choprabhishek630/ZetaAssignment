class MyHeaderComponent extends HTMLElement {
	connectedCallback() {
		
		
		this.innerHTML = `<div class="header" >
								<div class="left" >
									<label class="heading" >ABC Bank</label>
									<label class="sub-heading" >Control Center</label>
								</div>
							</div>`;

	}
}