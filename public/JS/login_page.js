// Switch between phone and email signup
const switcherText = document.querySelector("[data-signup-email-phone-switch]");

// Working on the below. Need to fix switching mechanic

function emailPhoneSwap() {
	const emailSignup = document.querySelector("[data-signup-email]");
	const phoneSignup = document.querySelector("[data-signup-phone]");

	// console.log(switcherText);
	// console.log(phoneSignup.display);

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
	// console.log(elem, i);
	// console.log(inputLabels[i].firstElementChild.firstElementChild);
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

// Open signup modal

const signupModalOpen = document.querySelector("[data-signup-modal-open]");

function openSignupModal() {
	const signupModal = document.querySelector("[data-modal-signup]");
	let scrollPos = Math.floor(window.scrollY);
	signupModal.style.top = scrollPos;
	signupModal.style.display = "flex";
	document.querySelector("html").classList.add("noscroll");

	// Close signup modal

	const signupModalClose = document.querySelector("[data-modal-signup-close]");

	function closeSignupModal() {
		const signupModal = document.querySelector("[data-modal-signup]");
		signupModal.style.display = "none";
		document.querySelector("html").classList.remove("noscroll");
		signupModalClose.removeEventListener("click", closeSignupModal);
	}

	signupModalClose.addEventListener("click", closeSignupModal);
}

signupModalOpen.addEventListener("click", openSignupModal);

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
const signupNextBtn = document.querySelector("[data-modal-signup-next-1]");

function validateAllFields() {
	if (!signupInputDOBYear.value) {
		signupNextBtn.disabled = true;
		return console.log("DOB Year not valid");
	}
	if (!signupInputDOBDay.value) {
		signupNextBtn.disabled = true;
		return console.log("DOB Day not valid");
	}
	if (!signupInputDOBMonth.value) {
		signupNextBtn.disabled = true;
		return console.log("DOB Month not valid");
	}
	if (!validatePhoneSignup() && !validateEmailSignup()) {
		signupNextBtn.disabled = true;
		return console.log("Phone number || email is not valid");
	}
	if (signupNameInput.value.length <= 0) {
		signupNextBtn.disabled = true;
		return console.log("Name is not valid");
	}
	signupNextBtn.disabled = false;
}

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
