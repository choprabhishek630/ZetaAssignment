class CreateEmployeeComponent extends HTMLElement {
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
								
								<div class="popup-header" >
									<div class="sub-heading" >${this.employeeId ? "EM" + this.employeeId : ""}</div>
									<div class="heading" >${this.employeeId ? "Update" : "Create"} Employee</div>
								</div>
								<div class="popup-footer" >
									<div class="btn create-employeed-btn" >${this.employeeId ? "Update" : "Create"}</div>
									<div class="btn cancel-btn" >Cancel</div>
								</div>
								
							</my-popup>`;
		if (this.employeeId) {
			this.fetchEmployee();
		} else {
			this.displayEmptyEmployee();
		}
		this.rendered = true;
	}

	dobToInputDate(dob) {
		let a = dob.split('/');
		return (a[2] + '-' + a[1] + '-' + a[0]);
	}

	inputDateToDob(dob) {
		let a = dob.split('-');
		return (a[2] + '/' + a[1] + '/' + a[0]);
	}

	dateToInputDate(d) {
		let y = d.getFullYear().toString();
		let m = d.getMonth() + 1;
		if (m < 10) m = "0" + m;

		let day = d.getDate();
		if (day < 10) day = "0" + day;
		return (y + '-' + m + '-' + day);
	}

	getMinValue() {
		var d = Date.now();
		var earliestDate = new Date(d - (55 * 365 * 24 * 60 * 60 * 1000));
		return this.dateToInputDate(earliestDate);
	}

	getMaxValue() {
		var d = Date.now();
		var latestDate = new Date(d - (18 * 365 * 24 * 60 * 60 * 1000));
		return this.dateToInputDate(latestDate);
	}

	displayEmployee(employeeDetails) {
		this.querySelector('my-popup .popup-header').insertAdjacentHTML('afterend', 
													`<div class="popup-content" >
														<div class="popup-row" >
															<my-custom-input type="text" key="firstName" label="First Name" placeholder="Enter First Name" regexType="name" value="${employeeDetails.firstName}" ></my-custom-input>
															<div class="space-between" ></div>
															<my-custom-input type="text" key="lastName" label="Last Name" placeholder="Enter Last Name" regexType="name" value="${employeeDetails.lastName}" ></my-custom-input>
														</div>
														<div class="popup-row" >
															<my-custom-input type="text" key="jobTitleName" label="Job Title" placeholder="Enter Job Title" regexType="alphaNumeric" value="${employeeDetails.jobTitleName}" ></my-custom-input>
														</div>
														<div class="popup-row" >
															<my-custom-input type="text" key="emailAddress" label="Email" placeholder="Enter Email" regexType="email" value="${employeeDetails.emailAddress}" ></my-custom-input>
														</div>
														<div class="popup-row" >
															<my-custom-input type="text" key="phoneNumber" label="Phone Number" placeholder="Enter Phone Number" regexType="phone" value="${employeeDetails.phoneNumber}" ></my-custom-input>
														</div>
														<div class="popup-row" >
															<my-custom-input type="text" key="region" label="Region" placeholder="Enter Region" regexType="alphaSpace" value="${employeeDetails.region}" ></my-custom-input>
															<div class="space-between" ></div>
															<my-date-input label="DOB" key="dob" value="${this.dobToInputDate(employeeDetails.dob)}" minValue="${this.getMinValue()}" maxValue="${this.getMaxValue()}" ></my-date-input>
														</div>
													</div>`);
	}

	displayEmptyEmployee() {
		this.displayEmployee({
			firstName: "",
			lastName: "",
			jobTitleName: "",
			emailAddress: "",
			phoneNumber: "",
			region: "",
			dob: "",
			preferredFullName: ""
		});
	}

	displayError(error) {
		this.querySelector('my-popup .popup-header').insertAdjacentHTML('afterend', `<div class="error" >Some error occured</div>`);
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

	close(success) {
		if (success) {
			this.dispatchEvent(new CustomEvent('success', {
				bubbles: true,
				detail: {
					success: true
				}
			}));
		}
		this.remove();
	}

	submit() {
		let employee = {
			firstName: this.querySelector('my-custom-input[key="firstName"]').value,
			lastName: this.querySelector('my-custom-input[key="lastName"]').value,
			jobTitleName: this.querySelector('my-custom-input[key="jobTitleName"]').value,
			emailAddress: this.querySelector('my-custom-input[key="emailAddress"]').value,
			phoneNumber: this.querySelector('my-custom-input[key="phoneNumber"]').value,
			region: this.querySelector('my-custom-input[key="region"]').value,
			dob: this.inputDateToDob(this.querySelector('my-date-input[key="dob"]').value)
		};
		employee.preferredFullName = employee.firstName + ' ' + employee.lastName;

		if (this.employeeId) {
			EmployeeService.updateEmployee({
				id: this.employeeId,
				employee: employee
			}).then(() => {
				this.close(true);
			}).catch((err) => {
				this.displayError();
			});
		} else {
			EmployeeService.addEmployee({
				employee: employee
			}).then(() => {
				this.close(true);
			}).catch((err) => {
				this.displayError();
			});
		}
	}

	validateInputs() {
		let allTextNodes = this.querySelectorAll('my-custom-input');
		for (let node of allTextNodes) {
			if (node.hasError) {
				node.touched = true;
				return false;
			}
		}

		let allDateNodes = this.querySelectorAll('my-date-input');
		for (let node of allDateNodes) {
			if (node.hasError) {
				node.touched = true;
				return false;
			}
		}
		return true;
	}

	setupEventListeners() {
		this.querySelector('my-popup').addEventListener('close', () => {
			this.close();
		});
		this.querySelector('my-popup .cancel-btn').addEventListener('click', (e) => {
			this.close();
		});

		this.querySelector('.create-employeed-btn').addEventListener('click', () => {
			if (this.validateInputs()) {
				this.submit();
			}
		});
	}
	connectedCallback() {
		if (!this.rendered) {
			this.render();
			this.setupEventListeners();
		}
	}
}



