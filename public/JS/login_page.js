const loginPageScript = {
	init() {
		loginPageScript.vars.signupModalOpen.addEventListener(
			"click",
			loginPageScript.openSignupModal
		);
		loginPageScript.vars.signupNextBtn.addEventListener("click", function (e) {
			e.preventDefault();
			loginPageScript.updateFormValues();
			loginPageScript.getNextFormPage();
		});
	},

	formValues: {
		name: null,
		phone: null,
		email: null,
		DOB: null,
		track: false,
		password: null,
	},

	parseStringToDate(month, day, year) {
		if (month === "January") {
			return new Date(`${year}-01-${day}`);
		}
		if (month === "February") {
			return new Date(`${year}-02-${day}`);
		}
		if (month === "March") {
			return new Date(`${year}-03-${day}`);
		}
		if (month === "April") {
			return new Date(`${year}-04-${day}`);
		}
		if (month === "May") {
			return new Date(`${year}-05-${day}`);
		}
		if (month === "June") {
			return new Date(`${year}-06-${day}`);
		}
		if (month === "July") {
			return new Date(`${year}-07-${day}`);
		}
		if (month === "August") {
			return new Date(`${year}-08-${day}`);
		}
		if (month === "September") {
			return new Date(`${year}-09-${day}`);
		}
		if (month === "October") {
			return new Date(`${year}-10-${day}`);
		}
		if (month === "November") {
			return new Date(`${year}-11-${day}`);
		}
		if (month === "December") {
			return new Date(`${year}-12-${day}`);
		}
	},

	updateFormValues() {
		const vars = loginPageScript.vars;
		const inputValues = document.querySelectorAll("input");
		for (let i = 0; i < inputValues.length; i++) {
			if (inputValues[i].value) {
				if (i === 0) {
					loginPageScript.formValues.name = inputValues[i].value;
				}
				if (i === 1) {
					if (!(getComputedStyle(vars.signupInputPhone).display === "none")) {
						loginPageScript.formValues.phone = inputValues[i].value;
						loginPageScript.formValues.email = null;
					}
				}
				if (i === 2) {
					if (!(getComputedStyle(vars.signupInputEmail).display === "none")) {
						loginPageScript.formValues.email = inputValues[i].value;
						loginPageScript.formValues.phone = null;
					}
				}
				if (i === 3) {
					if (vars.checkboxHidden.checked) {
						loginPageScript.formValues.track = true;
					} else if (!vars.checkboxHidden.checked) {
						loginPageScript.formValues.track = null;
					}
				}

				if (i === 9) {
					loginPageScript.formValues.password = inputValues[i].value;
				}
			}
		}

		if (vars.signupGroup1.classList.contains("d-block")) {
			const stringDate = loginPageScript.parseStringToDate(
				loginPageScript.vars.signupInputDOBMonth.value,
				loginPageScript.vars.signupInputDOBDay.value,
				loginPageScript.vars.signupInputDOBYear.value
			);
			loginPageScript.formValues.DOB = stringDate;
		}
	},

	vars: {
		signupModalOpen: document.querySelector("[data-signup-modal-open]"),
		signupNextBtn: document.querySelector("[data-modal-signup-next]"),
		signupModal: document.querySelector("[data-modal-signup]"),
		signupNameInput: document.querySelector("[data-signup-name]"),
		signupInputDOBMonth: document.querySelector("[data-select-dob-month]"),
		signupInputDOBDay: document.querySelector("[data-select-dob-day]"),
		signupInputDOBYear: document.querySelector("[data-select-dob-year]"),
		signupInputEmail: document.querySelector("[data-input-email]"),
		signupInputPhone: document.querySelector("[data-input-phone]"),
		signupModalClose: document.querySelector("[data-modal-signup-close]"),
		switcherText: document.querySelector("[data-signup-email-phone-switch]"),
		invalidText: document.querySelectorAll("[data-signup-invalid-text]"),
		signupModalBackBtn: document.querySelector("[data-modal-signup-back]"),
		headerText: document.querySelector("[data-steps-header]"),
		signupGroup1: document.querySelector("[data-signup-group-1]"),
		signupGroup2: document.querySelector("[data-signup-group-2]"),
		signupGroup3: document.querySelector("[data-signup-group-3]"),
		signupGroup4: document.querySelector("[data-signup-group-4]"),
		signupGroup5: document.querySelector("[data-signup-group-5]"),
		checkboxShown: document.querySelector("[data-checkbox-shown]"),
		checkboxHidden: document.querySelector("[data-checkbox-hidden]"),
		DOBMonthDefault: document.querySelector("[data-DOBMonth-default]"),
		DOBDayDefault: document.querySelector("[data-DOBDay-default]"),
		DOBYearDefault: document.querySelector("[data-DOBYear-default]"),
		verifyOuter: document.querySelector("[data-signup-verify-outer]"),
		verifyLabel: document.querySelector("[data-signup-verify-label]"),
		verifyInput: document.querySelector("[data-signup-verify-input]"),
		passwordOuter: document.querySelector("[data-signup-password-outer]"),
		passwordLabel: document.querySelector("[data-signup-password-label]"),
		passwordInput: document.querySelector("[data-signup-password-input]"),
		showHidePassword: document.querySelector("[data-show-hide-password]"),
		emailPhoneVerifyDisplay: document.querySelector("[data-signup-verify-email-phone]"),
	},

	openSignupModal() {
		let scrollPos = Math.floor(window.scrollY);
		loginPageScript.vars.signupModal.style.top = scrollPos;
		loginPageScript.vars.signupModal.style.display = "flex";
		document.querySelector("html").classList.add("noscroll");
		loginPageScript.loadFirstSignupPage();
	},

	closeSignupModal() {
		const vars = loginPageScript.vars;
		loginPageScript.vars.signupModal.style.display = "none";
		document.querySelector("html").classList.remove("noscroll");
		loginPageScript.vars.signupModalClose.removeEventListener(
			"click",
			loginPageScript.closeSignupModal
		);
		vars.signupNameInput.value = null;
		vars.signupInputPhone.value = null;
		vars.signupInputEmail.value = null;
		vars.DOBMonthDefault.selected = true;
		vars.DOBDayDefault.selected = true;
		vars.DOBYearDefault.selected = true;
		loginPageScript.updateSignupWordLength();
		loginPageScript.unloadFirstSignupPage();
	},

	validatePhoneSignup() {
		return loginPageScript.vars.signupInputPhone.value.match(
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		);
	},

	validateEmailSignup() {
		return loginPageScript.vars.signupInputEmail.value.match(
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		);
	},

	emailPhoneSwap() {
		const emailSignup = document.querySelector("[data-signup-email]");
		const phoneSignup = document.querySelector("[data-signup-phone]");
		const vars = loginPageScript.vars;

		if (getComputedStyle(phoneSignup).display === "flex") {
			phoneSignup.style.display = "none";
			emailSignup.style.display = "flex";
			vars.switcherText.innerHTML = "Use phone instead";
			vars.invalidText[1].style.display = "none";
			vars.signupInputEmail.value = null;
			vars.signupInputPhone.value = null;
			loginPageScript.validateAllFields();
		} else if (getComputedStyle(emailSignup).display === "flex") {
			phoneSignup.style.display = "flex";
			emailSignup.style.display = "none";
			vars.switcherText.innerHTML = "Use email instead";
			vars.invalidText[2].style.display = "none";
			vars.signupInputPhone.value = null;
			vars.signupInputEmail.value = null;
			loginPageScript.validateAllFields();
		}
	},

	updateSignupWordLength() {
		const vars = loginPageScript.vars;
		const wordCountField = document.querySelector("[data-signup-word-count]");
		wordCountField.innerHTML = ` ${vars.signupNameInput.value.length} / 50`;
	},

	loadFirstSignupPage() {
		const vars = loginPageScript.vars;

		const inputLabels = document.querySelectorAll("[data-input-label]");
		const signupInputs = document.querySelectorAll("[data-input-text]");
		// Close Signup Modal

		vars.signupModalClose.addEventListener("click", loginPageScript.closeSignupModal);

		vars.switcherText.addEventListener("click", loginPageScript.emailPhoneSwap);

		function invalidInputValue(elem, i) {
			if (elem.value.length <= 0) {
				inputLabels[i].classList.add("invalid-input");
				inputLabels[i].firstElementChild.firstElementChild.classList.add("invalid-text-color");
				vars.invalidText[i].style.display = "block";
			} else if (elem.value.length > 0) {
				inputLabels[i].classList.remove("invalid-input");
				inputLabels[i].firstElementChild.firstElementChild.classList.remove(
					"invalid-text-color"
				);
				vars.invalidText[i].style.display = "none";
			}
		}

		function styleFocusedTextBox(elem) {
			elem.classList.add("input-focused");
			elem.firstElementChild.style.display = "flex";
		}

		function styleUnfocusedTextBox(elem) {
			elem.classList.remove("input-focused");
			elem.firstElementChild.style.display = "none";
		}

		inputLabels.forEach(elem => {
			elem.addEventListener("focusin", function () {
				styleFocusedTextBox(elem);
			});
			elem.addEventListener("focusout", function () {
				styleUnfocusedTextBox(elem);
			});
		});

		signupInputs.forEach((elem, i) => {
			elem.addEventListener("input", function () {
				invalidInputValue(elem, i);
			});
		});

		vars.signupNameInput.addEventListener("input", function () {
			loginPageScript.updateSignupWordLength();
			loginPageScript.validateAllFields();
		});

		vars.signupInputPhone.addEventListener("focusout", loginPageScript.validatePhoneSignup);
		vars.signupInputEmail.addEventListener("focusout", loginPageScript.validateEmailSignup);
		vars.signupNameInput.focus();
		vars.signupNameInput.addEventListener("focusout", loginPageScript.validateAllFields);
		vars.signupInputPhone.addEventListener("input", loginPageScript.validateAllFields);
		vars.signupInputPhone.addEventListener("focusout", loginPageScript.validateAllFields);
		vars.signupInputEmail.addEventListener("input", loginPageScript.validateAllFields);
		vars.signupInputEmail.addEventListener("focusout", loginPageScript.validateAllFields);
		vars.signupInputDOBMonth.addEventListener("change", loginPageScript.validateAllFields);
		vars.signupInputDOBDay.addEventListener("change", loginPageScript.validateAllFields);
		vars.signupInputDOBYear.addEventListener("change", loginPageScript.validateAllFields);
	},

	validateAllFields() {
		const vars = loginPageScript.vars;
		if (!vars.signupInputDOBYear.value) {
			vars.signupNextBtn.disabled = true;
			return;
		}
		if (!vars.signupInputDOBDay.value) {
			vars.signupNextBtn.disabled = true;
			return;
		}
		if (!vars.signupInputDOBMonth.value) {
			vars.signupNextBtn.disabled = true;
			return;
		}
		if (!loginPageScript.validatePhoneSignup() && !loginPageScript.validateEmailSignup()) {
			vars.signupNextBtn.disabled = true;
			return;
		}
		if (vars.signupNameInput.value.length <= 0) {
			vars.signupNextBtn.disabled = true;
			return;
		}
		vars.signupNextBtn.disabled = false;
	},

	unloadFirstSignupPage() {
		const vars = loginPageScript.vars;
		vars.signupNameInput.removeEventListener("focusin", loginPageScript.validateAllFields);
		vars.signupNameInput.removeEventListener("focusout", loginPageScript.validateAllFields);
		vars.signupInputPhone.removeEventListener("focusout", loginPageScript.validateAllFields);
		vars.signupInputEmail.removeEventListener("focusout", loginPageScript.validateAllFields);
		vars.signupInputEmail.removeEventListener("focusout", loginPageScript.validateEmailSignup);
		vars.signupNameInput.removeEventListener("input", loginPageScript.validateAllFields);
		vars.signupInputDOBMonth.removeEventListener("change", loginPageScript.validateAllFields);
		vars.signupInputDOBDay.removeEventListener("change", loginPageScript.validateAllFields);
		vars.signupInputDOBYear.removeEventListener("change", loginPageScript.validateAllFields);
		vars.signupInputPhone.removeEventListener("input", loginPageScript.validateAllFields);
		vars.signupInputEmail.removeEventListener("input", loginPageScript.validateAllFields);
		vars.signupModalClose.removeEventListener("click", loginPageScript.closeSignupModal);
		vars.switcherText.removeEventListener("click", loginPageScript.emailPhoneSwap);
		vars.signupNameInput.value = null;
		vars.signupInputPhone.value = null;
		vars.signupInputEmail.value = null;
		vars.signupInputEmail.value = null;
		vars.DOBMonthDefault.selected = true;
		vars.DOBDayDefault.selected = true;
		vars.DOBYearDefault.selected = true;
	},

	getNextFormPage() {
		const signupFormGroups = document.querySelectorAll("[data-signup-form-group]");
		if (signupFormGroups[0].classList.contains("d-block")) {
			loginPageScript.unloadFirstSignupPage();
			loginPageScript.loadSecondSignupPage();
			signupFormGroups[0].classList.remove("d-block");
			signupFormGroups[1].classList.remove("d-none");
			signupFormGroups[0].classList.add("d-none");
			signupFormGroups[1].classList.add("d-block");
			// Remove block from all others and add d-none
			// signupFormGroups[2].classList.add("d-none");
			// signupFormGroups[2].classList.remove("d-block");
			// signupFormGroups[3].classList.add("d-none");
			// signupFormGroups[3].classList.remove("d-block");
			// signupFormGroups[4].classList.add("d-none");
			// signupFormGroups[4].classList.remove("d-block");
			return;
		} else if (signupFormGroups[1].classList.contains("d-block")) {
			loginPageScript.unloadSecondSignupPage();
			loginPageScript.loadThirdSignupPage();
			signupFormGroups[1].classList.remove("d-block");
			signupFormGroups[2].classList.remove("d-none");
			signupFormGroups[1].classList.add("d-none");
			signupFormGroups[2].classList.add("d-block");
			return;
		} else if (signupFormGroups[2].classList.contains("d-block")) {
			loginPageScript.unloadThirdSignupPage();
			loginPageScript.loadFourthSignupPage();
			signupFormGroups[2].classList.remove("d-block");
			signupFormGroups[3].classList.remove("d-none");
			signupFormGroups[2].classList.add("d-none");
			signupFormGroups[3].classList.add("d-block");
			return;
		} else if (signupFormGroups[3].classList.contains("d-block")) {
			loginPageScript.unloadFourthSignupPage();
			loginPageScript.loadFithSignupPage();
			signupFormGroups[3].classList.remove("d-block");
			signupFormGroups[4].classList.remove("d-none");
			signupFormGroups[3].classList.add("d-none");
			signupFormGroups[4].classList.add("d-block");
			return;
		}
	},

	loadSecondSignupPage() {
		const vars = loginPageScript.vars;
		function headerSetup() {
			vars.headerText.innerHTML = "Step 2 of 5";
			vars.signupModalClose.classList.remove("d-inline-block");
			vars.signupModalClose.classList.add("d-none");
			vars.signupModalBackBtn.classList.add("d-inline-block");
			vars.signupModalBackBtn.classList.remove("d-none");
			vars.signupNextBtn.disabled = false;
		}
		headerSetup();

		vars.signupModalBackBtn.addEventListener("click", loginPageScript.signupModalBackToFirstPage);

		vars.checkboxShown.addEventListener("click", loginPageScript.checkBoxCheckedAndUnchecked);
	},

	// Logic to check and uncheck custom checkbox
	checkBoxCheckedAndUnchecked() {
		const checkboxHidden = document.querySelector("[data-checkbox-hidden]");
		if (checkboxHidden.checked) {
			checkboxHidden.checked = false;
			return;
		} else if (!checkboxHidden.checked) {
			checkboxHidden.checked = true;
			return;
		}
	},

	signupModalBackToFirstPage() {
		const vars = loginPageScript.vars;
		vars.headerText.innerHTML = "Step 1 of 5";
		vars.signupModalClose.classList.add("d-inline-block");
		vars.signupModalClose.classList.remove("d-none");
		vars.signupModalBackBtn.classList.remove("d-inline-block");
		vars.signupModalBackBtn.classList.add("d-none");

		vars.signupGroup1.classList.remove("d-none");
		vars.signupGroup1.classList.add("d-block");
		vars.signupGroup2.classList.remove("d-block");
		vars.signupGroup2.classList.add("d-none");
		vars.signupNextBtn.disabled = false;
		loginPageScript.unloadSecondSignupPage();
		loginPageScript.loadFirstSignupPage();
	},

	unloadSecondSignupPage() {
		loginPageScript.vars.signupModalBackBtn.removeEventListener(
			"click",
			loginPageScript.signupModalBackToFirstPage
		);
		loginPageScript.vars.checkboxShown.removeEventListener(
			"click",
			loginPageScript.checkBoxCheckedAndUnchecked
		);
	},

	loadThirdSignupPage() {
		const vars = loginPageScript.vars;
		const headerSetup = () => {
			vars.headerText.innerHTML = "Step 3 of 5";
			vars.signupNextBtn.disabled = false;
		};

		headerSetup();

		let inputSetup = () => {
			const confNameField = document.querySelector("[data-signup-conf-name]");
			const confNameInput = document.querySelector("[data-signup-conf-name-input]");
			const confPhoneField = document.querySelector("[data-signup-conf-phone]");
			const confPhoneInput = document.querySelector("[data-signup-conf-phone-input]");
			const confEmailField = document.querySelector("[data-signup-conf-email]");
			const confEmailInput = document.querySelector("[data-signup-conf-email-input]");
			const confDOBField = document.querySelector("[data-signup-conf-dob]");
			const confDOBInput = document.querySelector("[data-signup-conf-dob-input]");
			const phoneInput = document.querySelector("[data-input-phone]");
			const emailInput = document.querySelector("[data-input-email]");
			const DOBMonth = document.querySelector("[data-select-dob-month]");
			const DOBDay = document.querySelector("[data-select-dob-day]");
			const DOBYear = document.querySelector("[data-select-dob-year]");

			let parseDate = month => {
				switch (month) {
					case 0:
						return "Jan";
					case 1:
						return "Feb";
					case 2:
						return "Mar";
					case 3:
						return "Apr";
					case 4:
						return "May";
					case 5:
						return "June";
					case 6:
						return "July";
					case 7:
						return "Aug";
					case 8:
						return "Sep";
					case 9:
						return "Oct";
					case 10:
						return "Nov";
					case 11:
						return "Dec";
				}
			};

			if (loginPageScript.formValues.name) {
				confNameInput.value = loginPageScript.formValues.name;
			}
			if (loginPageScript.formValues.phone) {
				confPhoneInput.value = loginPageScript.formValues.phone;
				confPhoneField.style.display = "block";
				confEmailField.style.display = "none";
			}
			if (loginPageScript.formValues.email) {
				confEmailInput.value = loginPageScript.formValues.email;
				confEmailField.style.display = "block";
				confPhoneField.style.display = "none";
			}
			if (loginPageScript.formValues.phone && loginPageScript.formValues.email) {
				loginPageScript.formValues.email = null;
			}

			let dateDOB = loginPageScript.formValues.DOB;
			let month = dateDOB.getMonth();
			let day = dateDOB.getDate();
			let year = dateDOB.getFullYear();
			let parsedMonth = parseDate(month);
			confDOBInput.value = `${parsedMonth} ${day}, ${year}`;

			let editInputField = () => {
				const vars = loginPageScript.vars;
				vars.signupGroup3.classList.remove("d-block");
				vars.signupGroup3.classList.add("d-none");
				vars.signupGroup1.classList.remove("d-none");
				vars.signupGroup1.classList.add("d-block");

				vars.signupModalClose.classList.remove("d-none");
				vars.signupModalClose.classList.add("d-inline-block");
				vars.signupModalBackBtn.classList.remove("d-inline-block");
				vars.signupModalBackBtn.classList.add("d-none");

				vars.headerText.innerHTML = "Step 1 of 5";

				loginPageScript.unloadThirdSignupPage();
				loginPageScript.loadFirstSignupPage();
			};

			// FIXME: When field is clicked event listeners double on close input on first page

			let changeNameField = () => {
				vars.signupNameInput.focus();
				editInputField();
			};

			let changePhoneField = () => {
				vars.signupInputPhone.focus();
				editInputField();
			};

			let changeEmailfield = () => {
				vars.signupInputEmail.focus();
				editInputField();
			};

			let changeDOBField = () => {
				editInputField();
			};

			confNameField.addEventListener("click", changeNameField);
			confPhoneField.addEventListener("click", changePhoneField);
			confEmailField.addEventListener("click", changeEmailfield);
			confDOBField.addEventListener("click", changeDOBField);
		};

		inputSetup();

		loginPageScript.vars.signupModalBackBtn.addEventListener(
			"click",
			loginPageScript.backToSecondPage
		);
	},

	backToSecondPage() {
		const vars = loginPageScript.vars;
		vars.signupGroup2.classList.remove("d-none");
		vars.signupGroup2.classList.add("d-block");
		vars.signupGroup3.classList.remove("d-block");
		vars.signupGroup3.classList.add("d-none");
		loginPageScript.unloadThirdSignupPage();
		loginPageScript.loadSecondSignupPage();
	},

	unloadThirdSignupPage() {
		loginPageScript.vars.signupModalBackBtn.removeEventListener(
			"click",
			loginPageScript.backToSecondPage
		);
	},

	loadFourthSignupPage() {
		const vars = loginPageScript.vars;
		if (!vars.verifyInput.value) {
			vars.signupNextBtn.disabled = true;
		}
		if (vars.verifyInput.value) {
			vars.signupNextBtn.disabled = false;
		}
		vars.signupModalBackBtn.addEventListener("click", loginPageScript.backToThirdPage);
		const headerSetup = () => {
			vars.headerText.innerHTML = "Step 4 of 5";
		};
		headerSetup();

		const displayEmailPhone = () => {
			const DNRText = document.querySelector("[data-verify-text-dnr]");
			if (loginPageScript.formValues.phone) {
				const phoneNumber = loginPageScript.formValues.phone;
				let areaCode = phoneNumber.substring(0, 3);
				let localCode = phoneNumber.substring(3, 6);
				let phoneCode = phoneNumber.substring(6, 10);
				loginPageScript.vars.emailPhoneVerifyDisplay.innerHTML = `(${areaCode}) - ${localCode}-${phoneCode}`;
				DNRText.innerHTML = "a text";
				return;
			}
			if (loginPageScript.formValues.email) {
				loginPageScript.vars.emailPhoneVerifyDisplay.innerHTML = `${loginPageScript.formValues.email}`;
				DNRText.innerHTML = "an email";
				return;
			}
		};

		vars.verifyInput.addEventListener("focusout", loginPageScript.onFocusOutVerifyInput);

		vars.verifyOuter.addEventListener("click", loginPageScript.focusVerifyInput);

		vars.verifyInput.addEventListener("focusin", loginPageScript.onFocusVerifyInput);

		vars.verifyInput.addEventListener("input", loginPageScript.onChangeVerifyInput);

		displayEmailPhone();
	},

	focusVerifyInput() {
		loginPageScript.vars.verifyInput.focus();
	},

	onFocusVerifyInput() {
		loginPageScript.vars.verifyInput.placeHolder = "";
		loginPageScript.vars.verifyLabel.style.display = "flex";
	},

	onFocusOutVerifyInput() {
		loginPageScript.vars.verifyInput.placeHolder = "Verification Code";
		loginPageScript.vars.verifyLabel.style.display = "none";
	},

	onChangeVerifyInput() {
		if (loginPageScript.vars.verifyInput.value) {
			loginPageScript.vars.signupNextBtn.disabled = false;
			return;
		}
		loginPageScript.vars.signupNextBtn.disabled = true;
	},

	backToThirdPage() {
		const vars = loginPageScript.vars;
		vars.signupGroup4.classList.remove("d-block");
		vars.signupGroup4.classList.add("d-none");
		vars.signupGroup3.classList.remove("d-none");
		vars.signupGroup3.classList.add("d-block");
		loginPageScript.unloadFourthSignupPage();
		loginPageScript.loadThirdSignupPage();
	},

	unloadFourthSignupPage() {
		const vars = loginPageScript.vars;
		vars.verifyOuter.removeEventListener("click", loginPageScript.focusVerifyInput);
		vars.verifyInput.removeEventListener("focusin", loginPageScript.onFocusVerifyInput);
		vars.verifyInput.removeEventListener("focusout", loginPageScript.onFocusOutVerifyInput);
		vars.verifyInput.removeEventListener("input", loginPageScript.onChangeVerifyInput);
		vars.signupModalBackBtn.removeEventListener("click", loginPageScript.backToThirdPage);
		vars.verifyInput.value = null;
	},

	loadFithSignupPage() {
		const vars = loginPageScript.vars;
		vars.signupNextBtn.disabled = true;
		vars.signupModalBackBtn.addEventListener("click", loginPageScript.backToFourthPage);
		const headerSetup = () => {
			vars.headerText.innerHTML = "Step 5 of 5";
		};
		headerSetup();

		loginPageScript.nextButtonChangeToSignup();
		const submitBtn = document.querySelector(".signup-btn-end");
		submitBtn.addEventListener("click", loginPageScript.submitForm);

		vars.passwordInput.addEventListener("click", loginPageScript.focusPasswordInput);
		vars.passwordInput.addEventListener("focusin", loginPageScript.onFocusPasswordInput);
		vars.passwordInput.addEventListener("focusout", loginPageScript.onFocusOutPasswordInput);
		vars.passwordInput.addEventListener("input", loginPageScript.verifyPasswordLength);
		vars.showHidePassword.addEventListener("click", loginPageScript.showHidePassword);
	},

	nextButtonChangeToSignup() {
		const vars = loginPageScript.vars;
		vars.signupNextBtn.classList.add("signup-btn-end");
		vars.signupNextBtn.innerHTML = "Sign Up";
	},

	nextButtonChangeToNext() {
		const vars = loginPageScript.vars;
		vars.signupNextBtn.classList.remove("signup-btn-end");
		vars.signupNextBtn.style.color = "#000000";
		vars.signupNextBtn.innerHTML = "Next";
	},

	focusPasswordInput() {
		loginPageScript.vars.passwordInput.focus();
	},

	onFocusPasswordInput() {
		loginPageScript.vars.passwordInput.placeHolder = null;
		loginPageScript.vars.passwordLabel.style.display = "flex";
	},

	onFocusOutPasswordInput() {
		if (!loginPageScript.vars.passwordInput.value) {
			loginPageScript.vars.passwordInput.placeHolder = "Password";
			loginPageScript.vars.passwordLabel.style.display = "none";
		}
	},

	verifyPasswordLength() {
		const vars = loginPageScript.vars;
		if (!(vars.passwordInput.value.length >= 8)) {
			vars.signupNextBtn.disabled = true;
			return;
		}
		vars.signupNextBtn.disabled = false;
	},

	showHidePassword() {
		const vars = loginPageScript.vars;
		if (vars.passwordInput.type === "password") {
			vars.passwordInput.type = "text";
			vars.showHidePassword.src = "Icons/hide_password.svg";
		} else if (vars.passwordInput.type === "text") {
			vars.passwordInput.type = "password";
			vars.showHidePassword.src = "Icons/show_password.svg";
		}
	},

	submitForm() {
		let vals = loginPageScript.formValues;
		if (vals.name) {
			if (vals.phone || vals.email) {
				if (vals.DOB) {
					if (vals.password) {
						loginPageScript.sendFormData();
					}
				}
			}
		}
	},

	async sendFormData() {
		let data = loginPageScript.formValues;
		// FIXME: This needs fixed. Can't get it to redirect after receiving response.
		// 		 Data needs to be sent to server and get a response redirecting if everything is ok
	},

	backToFourthPage() {
		const vars = loginPageScript.vars;
		vars.signupGroup5.classList.remove("d-block");
		vars.signupGroup5.classList.add("d-none");
		vars.signupGroup4.classList.remove("d-none");
		vars.signupGroup4.classList.add("d-block");
		loginPageScript.unloadFithSignupPage();
		loginPageScript.loadFourthSignupPage();
	},

	unloadFithSignupPage() {
		const submitBtn = document.querySelector(".signup-btn-end");
		submitBtn.removeEventListener("click", loginPageScript.submitForm);
		loginPageScript.nextButtonChangeToNext();
		loginPageScript.vars.passwordInput.value = null;
		loginPageScript.vars.signupModalBackBtn.removeEventListener(
			"click",
			loginPageScript.backToFourthPage
		);
	},
};

document.addEventListener("DOMContentLoaded", loginPageScript.init());
