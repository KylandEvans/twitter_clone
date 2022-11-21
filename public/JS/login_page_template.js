// Open Signup modal
// const signupModalOpen = document.querySelector("[data-signup-modal-open]");
// const signupNextBtn = document.querySelector("[data-modal-signup-next]");

// signupModalOpen.addEventListener("click", openSignupModal);

// function openSignupModal() {
// 	const signupModal = document.querySelector("[data-modal-signup]");
// 	let scrollPos = Math.floor(window.scrollY);
// 	signupModal.style.top = scrollPos;
// 	signupModal.style.display = "flex";
// 	document.querySelector("html").classList.add("noscroll");
// 	loadFirstSignupPage();
// }

// Load Script For Signup modal first Page

// function loadFirstSignupPage() {
// Switch between phone and email signup
// const switcherText = document.querySelector("[data-signup-email-phone-switch]");
// let signupNameInput = document.querySelector("[data-signup-name]");

// Close signup modal

// let signupModalClose = document.querySelector("[data-modal-signup-close]");

// let closeSignupModal = () => {
// 	const signupModal = document.querySelector("[data-modal-signup]");
// 	signupModal.style.display = "none";
// 	document.querySelector("html").classList.remove("noscroll");
// 	signupModalClose.removeEventListener("click", closeSignupModal);
// 	unloadFirstSignupPage();
// };

// let unloadFirstSignupPage = () => {
// 	signupNameInput.removeEventListener("focusin", validateAllFields);
// 	signupNameInput.removeEventListener("focusout", validateAllFields);
// 	signupNameInput.removeEventListener("input", validateAllFields);
// 	signupInputDOBMonth.removeEventListener("change", validateAllFields);
// 	signupInputDOBDay.removeEventListener("change", validateAllFields);
// 	signupInputDOBYear.removeEventListener("change", validateAllFields);
// 	signupInputPhone.removeEventListener("input", validateAllFields);
// 	signupInputPhone.removeEventListener("focusout", validateAllFields);
// 	signupInputEmail.removeEventListener("input", validateAllFields);
// 	signupInputEmail.removeEventListener("focusout", validateAllFields);
// 	signupInputEmail.removeEventListener("focusout", validateEmailSignup);
// 	signupModalClose.removeEventListener("click", closeSignupModal);
// };

// signupModalClose.addEventListener("click", closeSignupModal);

// Working on the below. Need to fix switching mechanic

// function emailPhoneSwap() {
// 	const emailSignup = document.querySelector("[data-signup-email]");
// 	const phoneSignup = document.querySelector("[data-signup-phone]");

// 	if (getComputedStyle(phoneSignup).display === "flex") {
// 		phoneSignup.style.display = "none";
// 		emailSignup.style.display = "flex";
// 		switcherText.innerHTML = "Use phone instead";
// 		invalidText[1].style.display = "none";
// 		signupInputEmail.value = "";
// 		signupInputPhone.value = "";
// 		validateAllFields();
// 	} else if (getComputedStyle(emailSignup).display === "flex") {
// 		phoneSignup.style.display = "flex";
// 		emailSignup.style.display = "none";
// 		switcherText.innerHTML = "Use email instead";
// 		invalidText[2].style.display = "none";
// 		signupInputPhone.value = "";
// 		signupInputEmail.value = "";
// 		validateAllFields();
// 	}
// }

// switcherText.addEventListener("click", function () {
// 	emailPhoneSwap();
// });

// Change Styles for inputs when focused. //////////////// use the inputlabels var to change color to red if value is <= 0
// const inputLabels = document.querySelectorAll("[data-input-label]");
// const signupInputs = document.querySelectorAll("[data-input-text]");
// const invalidText = document.querySelectorAll("[data-signup-invalid-text]");

// function invalidInputValue(elem, i) {
// 	if (elem.value.length <= 0) {
// 		inputLabels[i].classList.add("invalid-input");
// 		inputLabels[i].firstElementChild.firstElementChild.classList.add("invalid-text-color");
// 		invalidText[i].style.display = "block";
// 	} else if (elem.value.length > 0) {
// 		inputLabels[i].classList.remove("invalid-input");
// 		inputLabels[i].firstElementChild.firstElementChild.classList.remove("invalid-text-color");
// 		invalidText[i].style.display = "none";
// 	}
// }

// function styleFocusedTextBox(elem) {
// 	elem.classList.add("input-focused");
// 	elem.firstElementChild.style.display = "flex";
// }

// function styleUnfocusedTextBox(elem) {
// 	elem.classList.remove("input-focused");
// 	elem.firstElementChild.style.display = "none";
// }

// inputLabels.forEach(elem => {
// 	elem.addEventListener("focusin", function () {
// 		styleFocusedTextBox(elem);
// 	});
// 	elem.addEventListener("focusout", function () {
// 		styleUnfocusedTextBox(elem);
// 	});
// });

// signupInputs.forEach((elem, i) => {
// 	elem.addEventListener("input", function () {
// 		invalidInputValue(elem, i);
// 	});
// });

// function updateSignupWordLength() {
// 	const wordCountField = document.querySelector("[data-signup-word-count]");
// 	wordCountField.innerHTML = ` ${signupNameInput.value.length} / 50`;
// }

// signupNameInput.addEventListener("input", function () {
// 	updateSignupWordLength();
// 	validateAllFields();
// });

// Validate Phone Signup

// let signupInputPhone = document.querySelector("[data-input-phone]");

// Returns value if true returns null if false
// function validatePhoneSignup() {
// 	return signupInputPhone.value.match(
// 		/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
// 	);
// }

// signupInputPhone.addEventListener("focusout", validatePhoneSignup);

//Validate Email Signup

// let signupInputEmail = document.querySelector("[data-input-email]");

// function validateEmailSignup() {
// 	return signupInputEmail.value.match(
// 		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// 	);
// }

// signupInputEmail.addEventListener("focusout", validateEmailSignup);

// Validate All Fields On First Signup Page

// let signupInputDOBMonth = document.querySelector("[data-select-dob-month]");
// let signupInputDOBDay = document.querySelector("[data-select-dob-day]");
// let signupInputDOBYear = document.querySelector("[data-select-dob-year]");
// let signupNextBtn = document.querySelector("[data-modal-signup-next]");

// let validateAllFields = () => {
// 	if (!signupInputDOBYear.value) {
// 		signupNextBtn.disabled = true;
// 		return;
// 	}
// 	if (!signupInputDOBDay.value) {
// 		signupNextBtn.disabled = true;
// 		return;
// 	}
// 	if (!signupInputDOBMonth.value) {
// 		signupNextBtn.disabled = true;
// 		return;
// 	}
// 	if (!validatePhoneSignup() && !validateEmailSignup()) {
// 		signupNextBtn.disabled = true;
// 		return;
// 	}
// 	if (signupNameInput.value.length <= 0) {
// 		signupNextBtn.disabled = true;
// 		return;
// 	}
// 	signupNextBtn.disabled = false;
// };

// signupNameInput.focus();

// Event listeners to check if signup form is fully filled out correctly
// 	signupNameInput.addEventListener("focusout", validateAllFields);

// 	signupInputPhone.addEventListener("input", validateAllFields);

// 	signupInputPhone.addEventListener("focusout", validateAllFields);

// 	signupInputEmail.addEventListener("input", validateAllFields);

// 	signupInputEmail.addEventListener("focusout", validateAllFields);

// 	signupInputDOBMonth.addEventListener("change", validateAllFields);

// 	signupInputDOBDay.addEventListener("change", validateAllFields);

// 	signupInputDOBYear.addEventListener("change", validateAllFields);

// 	loadFirstSignupPage.unloadFirstSignupPage = unloadFirstSignupPage;
// }

// Load Script For Signup modal Second Page

// function loadSecondSignupPage() {
// 	const signupModalBackBtn = document.querySelector("[data-modal-signup-back]");

// 	function headerSetup() {
// 		const headerText = document.querySelector("[data-steps-header]");
// 		headerText.innerHTML = "Step 2 of 5";
// 		const signupModalCloseBtn = document.querySelector("[data-modal-signup-close]");
// 		signupModalCloseBtn.classList.remove("d-inline-block");
// 		signupModalCloseBtn.classList.add("d-none");
// 		signupModalBackBtn.classList.add("d-inline-block");
// 		signupModalBackBtn.classList.remove("d-none");
// 	}
// 	headerSetup();

// 	function signupModalBackToFirstPage() {
// 		const headerText = document.querySelector("[data-steps-header]");
// 		headerText.innerHTML = "Step 1 of 5";
// 		const signupModalCloseBtn = document.querySelector("[data-modal-signup-close]");
// 		signupModalCloseBtn.classList.add("d-inline-block");
// 		signupModalCloseBtn.classList.remove("d-none");
// 		signupModalBackBtn.classList.remove("d-inline-block");
// 		signupModalBackBtn.classList.add("d-none");

// 		const signupGroup1 = document.querySelector("[data-signup-group-1]");
// 		const signupGroup2 = document.querySelector("[data-signup-group-2]");
// 		signupGroup1.classList.remove("d-none");
// 		signupGroup1.classList.add("d-block");
// 		signupGroup2.classList.remove("d-block");
// 		signupGroup2.classList.add("d-none");
// 		signupNextBtn.disabled = false;
// 		unloadSecondSignupPage();
// 		loadFirstSignupPage();
// 	}

// 	signupModalBackBtn.addEventListener("click", signupModalBackToFirstPage);

// 	// Logic to check and uncheck custom checkbox
// 	const checkboxShown = document.querySelector("[data-checkbox-shown]");

// 	const checkBoxCheckedAndUnchecked = () => {
// 		const checkboxHidden = document.querySelector("[data-checkbox-hidden]");
// 		if (checkboxHidden.checked) {
// 			checkboxHidden.checked = false;
// 			console.log(checkboxHidden.checked);
// 			return;
// 		} else if (!checkboxHidden.checked) {
// 			checkboxHidden.checked = true;
// 			console.log(checkboxHidden.checked);
// 			return;
// 		}
// 	};

// 	checkboxShown.addEventListener("click", checkBoxCheckedAndUnchecked);

// 	function unloadSecondSignupPage() {
// 		signupModalBackBtn.removeEventListener("click", signupModalBackToFirstPage);
// 		checkboxShown.removeEventListener("click", checkBoxCheckedAndUnchecked);
// 	}

// }

// Load Script For Signup modal Third Page

function loadThirdSignupPage() {
	const headerSetup = () => {
		const stepsHeader = document.querySelector("[data-steps-header]");
		stepsHeader.innerHTML = "Step 3 of 5";
	};

	headerSetup();

	let backToSecondPageBtn = document.querySelector("[data-modal-signup-back]");
	let backToSecondPage = () => {
		const signupGroup2 = document.querySelector("[data-signup-group-2]");
		const signupGruop3 = document.querySelector("[data-signup-group-3]");
		signupGroup2.classList.remove("d-none");
		signupGroup2.classList.add("d-block");
		signupGruop3.classList.remove("d-block");
		signupGruop3.classList.add("d-none");
		unloadThirdSignupPage();
		loadSecondSignupPage();
	};

	let inputSetup = () => {
		const confNameField = document.querySelector("[data-signup-conf-name]");
		const confNameInput = document.querySelector("[data-signup-conf-name-input]");
		const confPhoneField = document.querySelector("[data-signup-conf-phone]");
		const confPhoneInput = document.querySelector("[data-signup-conf-phone-input]");
		const confEmailField = document.querySelector("[data-signup-conf-email]");
		const confEmailInput = document.querySelector("[data-signup-conf-email-input]");
		const confDOBField = document.querySelector("[data-signup-conf-dob]");
		const confDOBInput = document.querySelector("[data-signup-conf-dob-input]");
		const nameInput = document.querySelector("[data-signup-name]");
		const phoneInput = document.querySelector("[data-input-phone]");
		const emailInput = document.querySelector("[data-input-email]");
		const DOBMonth = document.querySelector("[data-select-dob-month]");
		const DOBDay = document.querySelector("[data-select-dob-day]");
		const DOBYear = document.querySelector("[data-select-dob-year]");

		let parseDate = month => {
			switch (month) {
				case "January":
					return "Jan";
				case "February":
					return "Feb";
				case "March":
					return "Mar";
				case "April":
					return "Apr";
				case "May":
					return "May";
				case "June":
					return "June";
				case "July":
					return "July";
				case "August":
					return "Aug";
				case "September":
					return "Sep";
				case "October":
					return "Oct";
				case "November":
					return "Nov";
				case "December":
					return "Dec";
			}
		};

		if (nameInput.value) {
			confNameInput.value = nameInput.value;
		}
		if (phoneInput.value) {
			confPhoneInput.value = phoneInput.value;
		}
		if (emailInput.value) {
			confEmailInput.value = emailInput.value;
		}
		if (emailInput.value && phoneInput.value) {
			emailInput.value = null;
			confEmailInput.value = null;
		}
		if (DOBMonth.value && DOBDay.value && DOBYear.value) {
			let parsedMonth = parseDate(DOBMonth.value);
			confDOBInput.value = `${parsedMonth} ${DOBDay.value}, ${DOBYear.value}`;
		}

		let editInputField = () => {
			const signupGroup3 = document.querySelector("[data-signup-group-3]");
			const signupGroup1 = document.querySelector("[data-signup-group-1]");
			signupGroup3.classList.remove("d-block");
			signupGroup3.classList.add("d-none");
			signupGroup1.classList.remove("d-none");
			signupGroup1.classList.add("d-block");

			const modalClose = document.querySelector("[data-modal-signup-close]");
			const modalBackBtn = document.querySelector("[data-modal-signup-back]");

			modalClose.classList.remove("d-none");
			modalClose.classList.add("d-inline-block");
			modalBackBtn.classList.remove("d-inline-block");
			modalBackBtn.classList.add("d-none");

			const stepsHeader = document.querySelector("[data-steps-header]");
			stepsHeader.innerHTML = "Step 1 of 5";

			unloadThirdSignupPage();
			loadFirstSignupPage();
		};

		// FIXME: When field is clicked event listeners double on close input on first page

		let changeNameField = () => {
			nameInput.focus();
			editInputField();
		};

		confNameField.addEventListener("click", changeNameField);
	};

	inputSetup();

	let unloadThirdSignupPage = () => {
		backToSecondPageBtn.removeEventListener("click", backToSecondPage);
	};

	backToSecondPageBtn.addEventListener("click", backToSecondPage);
}

// const signupFormGroups = document.querySelectorAll("[data-signup-form-group]");

// function getNextFormPage() {
// 	if (signupFormGroups[0].classList.contains("d-block")) {
// 		loadFirstSignupPage.unloadFirstSignupPage();
// 		loadSecondSignupPage();
// 		signupFormGroups[0].classList.remove("d-block");
// 		signupFormGroups[1].classList.remove("d-none");
// 		signupFormGroups[0].classList.add("d-none");
// 		signupFormGroups[1].classList.add("d-block");
// 		return;
// 	} else if (signupFormGroups[1].classList.contains("d-block")) {
// 		loadSecondSignupPage.unloadSecondSignupPage();
// 		loadThirdSignupPage();
// 		signupFormGroups[1].classList.remove("d-block");
// 		signupFormGroups[2].classList.remove("d-none");
// 		signupFormGroups[1].classList.add("d-none");
// 		signupFormGroups[2].classList.add("d-block");
// 		return;
// 	} else if (signupFormGroups[2].classList.contains("d-block")) {
// 		signupFormGroups[2].classList.remove("d-block");
// 		signupFormGroups[3].classList.remove("d-none");
// 		signupFormGroups[2].classList.add("d-none");
// 		signupFormGroups[3].classList.add("d-block");
// 		return;
// 	} else if (signupFormGroups[3].classList.contains("d-block")) {
// 		signupFormGroups[3].classList.remove("d-block");
// 		signupFormGroups[4].classList.remove("d-none");
// 		signupFormGroups[3].classList.add("d-none");
// 		signupFormGroups[4].classList.add("d-block");
// 		return;
// 	}
// }

// signupNextBtn.addEventListener("click", function (e) {
// 	e.preventDefault();
// 	getNextFormPage();
// });
