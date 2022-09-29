// Open Signup modal
const signupModalOpen = document.querySelector("[data-signup-modal-open]");
const signupNextBtn = document.querySelector("[data-modal-signup-next]");

signupModalOpen.addEventListener("click", openSignupModal);

function openSignupModal() {
	const signupModal = document.querySelector("[data-modal-signup]");
	let scrollPos = Math.floor(window.scrollY);
	signupModal.style.top = scrollPos;
	signupModal.style.display = "flex";
	document.querySelector("html").classList.add("noscroll");
	loadFirstSignupPage();
}

const signupFormGroups = document.querySelectorAll("[data-signup-form-group]");

// Load Script For Signup modal first Page

function loadFirstSignupPage() {
	// Switch between phone and email signup
	const switcherText = document.querySelector("[data-signup-email-phone-switch]");

	// Close signup modal

	const signupModalClose = document.querySelector("[data-modal-signup-close]");

	function closeSignupModal() {
		const signupModal = document.querySelector("[data-modal-signup]");
		signupModal.style.display = "none";
		document.querySelector("html").classList.remove("noscroll");
		signupModalClose.removeEventListener("click", closeSignupModal);
	}

	signupModalClose.addEventListener("click", closeSignupModal);

	// Working on the below. Need to fix switching mechanic

	function emailPhoneSwap() {
		const emailSignup = document.querySelector("[data-signup-email]");
		const phoneSignup = document.querySelector("[data-signup-phone]");

		if (getComputedStyle(phoneSignup).display === "flex") {
			phoneSignup.style.display = "none";
			emailSignup.style.display = "flex";
			switcherText.innerHTML = "Use phone instead";
			invalidText[1].style.display = "none";
			signupInputEmail.value = "";
			signupInputPhone.value = "";
			validateAllFields();
		} else if (getComputedStyle(emailSignup).display === "flex") {
			phoneSignup.style.display = "flex";
			emailSignup.style.display = "none";
			switcherText.innerHTML = "Use email instead";
			invalidText[2].style.display = "none";
			signupInputPhone.value = "";
			signupInputEmail.value = "";
			validateAllFields();
		}
	}

	switcherText.addEventListener("click", function () {
		emailPhoneSwap();
	});

	// Change Styles for inputs when focused. //////////////// use the inputlabels var to change color to red if value is <= 0
	const inputLabels = document.querySelectorAll("[data-input-label]");
	const signupInputs = document.querySelectorAll("[data-input-text]");
	const invalidText = document.querySelectorAll("[data-signup-invalid-text]");

	function invalidInputValue(elem, i) {
		if (elem.value.length <= 0) {
			inputLabels[i].classList.add("invalid-input");
			inputLabels[i].firstElementChild.firstElementChild.classList.add("invalid-text-color");
			invalidText[i].style.display = "block";
		} else if (elem.value.length > 0) {
			inputLabels[i].classList.remove("invalid-input");
			inputLabels[i].firstElementChild.firstElementChild.classList.remove("invalid-text-color");
			invalidText[i].style.display = "none";
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

	// Keep track of length in signup name input
	const signupNameInput = document.querySelector("[data-signup-name]");

	function updateSignupWordLength() {
		const wordCountField = document.querySelector("[data-signup-word-count]");
		wordCountField.innerHTML = ` ${signupNameInput.value.length} / 50`;
	}

	signupNameInput.addEventListener("input", function () {
		updateSignupWordLength();
		validateAllFields();
	});

	// Validate Phone Signup

	const signupInputPhone = document.querySelector("[data-input-phone]");

	// Returns value if true returns null if false
	function validatePhoneSignup() {
		return signupInputPhone.value.match(
			/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
		);
	}

	signupInputPhone.addEventListener("focusout", function () {
		validatePhoneSignup();
	});

	//Validate Email Signup

	const signupInputEmail = document.querySelector("[data-input-email]");

	function validateEmailSignup() {
		return signupInputEmail.value.match(
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
		);
	}

	signupInputEmail.addEventListener("focusout", function () {
		validateEmailSignup();
	});

	// Validate All Fields On First Signup Page

	const signupInputDOBMonth = document.querySelector("[data-select-dob-month]");
	const signupInputDOBDay = document.querySelector("[data-select-dob-day]");
	const signupInputDOBYear = document.querySelector("[data-select-dob-year]");
	const signupNextBtn = document.querySelector("[data-modal-signup-next]");

	function validateAllFields() {
		if (!signupInputDOBYear.value) {
			signupNextBtn.disabled = true;
			return;
		}
		if (!signupInputDOBDay.value) {
			signupNextBtn.disabled = true;
			return;
		}
		if (!signupInputDOBMonth.value) {
			signupNextBtn.disabled = true;
			return;
		}
		if (!validatePhoneSignup() && !validateEmailSignup()) {
			signupNextBtn.disabled = true;
			return;
		}
		if (signupNameInput.value.length <= 0) {
			signupNextBtn.disabled = true;
			return;
		}
		signupNextBtn.disabled = false;
	}

	signupNameInput.focus();

	// Event listeners to check if signup form is fully filled out correctly
	signupNameInput.addEventListener("focusout", function () {
		validateAllFields();
	});

	signupInputPhone.addEventListener("input", function () {
		validateAllFields();
	});

	signupInputPhone.addEventListener("focusout", function () {
		validateAllFields();
	});

	signupInputEmail.addEventListener("input", function () {
		validateAllFields();
	});

	signupInputEmail.addEventListener("focusout", function () {
		validateAllFields();
	});

	signupInputDOBMonth.addEventListener("change", function () {
		validateAllFields();
	});

	signupInputDOBDay.addEventListener("change", function () {
		validateAllFields();
	});

	signupInputDOBYear.addEventListener("change", function () {
		validateAllFields();
	});
}

// function unloadFirstSignupPage() {
// 	const signupModalClose = document.querySelector("[data-modal-signup-close]");

// 	function closeSignupModal() {
// 		const signupModal = document.querySelector("[data-modal-signup]");
// 		signupModal.style.display = "none";
// 		document.querySelector("html").classList.remove("noscroll");
// 		signupModalClose.removeEventListener("click", )
// 	}
// 	signupModalClose.removeEventListener("click", closeSignupModal);
// }

// Load Script For Signup modal Second Page

function loadSecondSignupPage() {
	const headerText = document.querySelector("[data-steps-header]");
	headerText.innerHTML = "Step 2 of 5";
	const modalControl = document.querySelector("[data-in-modal-control-img]");
	modalControl.src = "Icons/back_arrow.svg";
}

function getNextFormPage() {
	if (signupFormGroups[0].classList.contains("d-block")) {
		loadSecondSignupPage();
		signupFormGroups[0].classList.remove("d-block");
		signupFormGroups[1].classList.remove("d-none");
		signupFormGroups[0].classList.add("d-none");
		signupFormGroups[1].classList.add("d-block");
		signupNextBtn.disabled = true;
		return;
	} else if (signupFormGroups[1].classList.contains("d-block")) {
		signupFormGroups[1].classList.remove("d-block");
		signupFormGroups[2].classList.remove("d-none");
		signupFormGroups[1].classList.add("d-none");
		signupFormGroups[2].classList.add("d-block");
		signupNextBtn.disabled = true;
		return;
	} else if (signupFormGroups[2].classList.contains("d-block")) {
		signupFormGroups[2].classList.remove("d-block");
		signupFormGroups[3].classList.remove("d-none");
		signupFormGroups[2].classList.add("d-none");
		signupFormGroups[3].classList.add("d-block");
		signupNextBtn.disabled = true;
		return;
	} else if (signupFormGroups[3].classList.contains("d-block")) {
		signupFormGroups[3].classList.remove("d-block");
		signupFormGroups[4].classList.remove("d-none");
		signupFormGroups[3].classList.add("d-none");
		signupFormGroups[4].classList.add("d-block");
		signupNextBtn.disabled = true;
		return;
	}
}

signupNextBtn.addEventListener("click", function (e) {
	e.preventDefault();
	getNextFormPage();
});
