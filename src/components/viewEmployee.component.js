class ViewEmployeeComponent extends HTMLElement {
	constructor() {
		super();
		this.rendered = false;
	}

	get employeeId() {
		return this.getAttribute("employeeId");
	}



	set employeeId(employeeId) {
		this.setAttribute("employeeId", employeeId);
	}

	render() {
		this.innerHTML = 	`<my-popup>
							</my-popup>`;
		if (this.employeeId) {
			this.fetchEmployee();
		}
		this.rendered = true;
	}

	displayEmployee(employeeDetails) {
		this.querySelector('my-popup').innerHTML = `<div class="popup-header" >
														<label class="sub-heading" >EM${this.employeeId}</label>
														<label class="heading" >${employeeDetails.preferredFullName}</label>
													</div>
													<div class="popup-content" >
														<div class="detail" >
															<label class="key" >Name</label>
															<label class="value" >${employeeDetails.preferredFullName}</label>
														</div>
														<div class="detail" >
															<label class="key" >Employee Code</label>
															<label class="value" >${employeeDetails.employeeCode}</label>
														</div>
														<div class="detail" >
															<label class="key" >Job Title</label>
															<label class="value" >${employeeDetails.jobTitleName}</label>
														</div>
														<div class="detail" >
															<label class="key" >Phone Number</label>
															<label class="value" >${employeeDetails.phoneNumber}</label>
														</div>
														<div class="detail" >
															<label class="key" >Email Id</label>
															<label class="value" >${employeeDetails.emailAddress}</label>
														</div>
														<div class="detail" >
															<label class="key" >Region</label>
															<label class="value" >${employeeDetails.region}</label>
														</div>
														<div class="detail" >
															<label class="key" >DOB</label>
															<label class="value" >${employeeDetails.dob}</label>
														</div>
													</div>`;
	}

	displayError(error) {
		this.querySelector('my-popup').innerHTML = `<div class="error" >Some error occured</div>`;
	}

	fetchEmployee() {
		EmployeeService.fetchEmployee({
			id: this.employeeId
		}).then((response) => {
			this.displayEmployee(response.data);
		}).catch((err) => {
			this.displayError();
		});
	}
	setupEventListeners() {
		this.querySelector('my-popup').addEventListener('close', () => {
			console.log('closed');
			this.remove();
		});
	}
	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.setupEventListeners();
		}
	}
}