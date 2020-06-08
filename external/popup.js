(function() {
	class MyPopupComponent extends HTMLElement {
		constructor() {
			super();
			this.rendered = false;
		}

		getStyles() {
			return `<style>
						.popup-container {
							position: fixed;
							left: 50%;
							top: 50%;
							transform: translate(-50%, -50%);
							background: white;
							z-index: 1001;
							min-width: 40rem;
							max-width: calc(100vw - 2rem);
							max-height: calc(100vh - 2rem);
						}

						.overlay {
							position: fixed;
							left: 0;
							top: 0;
							background: rgba(0, 0, 0, 0.6);
							z-index: 1000;
							width: 100vw;
							height: 100vh;
						}
					</style>`;
		}
		render() {
			this.shadowRoot.innerHTML = `<div class="popup" >
											${this.getStyles()}
											<div class="popup-container" >
													<slot></slot>
											</div>
											<div class="overlay" ></div>
										</div>`;
			this.rendered = true;
		}
		setupEventListeners() {
			this.shadowRoot.querySelector(".popup").addEventListener('click', (e) => {
				let overlay = e.target.closest('.overlay');
				if (overlay != null) {
					this.close();
				}
			});
		}

		close() {
			this.remove();
		}
		connectedCallback() {
			if (!this.rendered) {
				const shadow = this.attachShadow({mode: 'open'});
				this.render();
				this.setupEventListeners();
			}
		}

		disconnectedCallback() {
			this.dispatchEvent(new CustomEvent('close', {
				bubbles: true,
				composed: true
			}));
		}
	}

	function defineElements() {
		customElements.define("my-popup", MyPopupComponent);
	}

	defineElements();
})();