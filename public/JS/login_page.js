// Switch between phone and email signup
const emailPhoneSwitch = document.querySelector("[data-signup-email-phone-switch]");

// Working on the below. Trying to stop if from needing to be pressed twice to get other email signup
function emailPhoneSwap() {
	const emailSignup = document.querySelector("[data-signup-email]");
	const phoneSignup = document.querySelector("[data-signup-phone]");
	const switcherText = document.querySelector("[data-email-phone-switch-text]");

	if (phoneSignup.style.display === "flex") {
		phoneSignup.style.display = "none";
		emailSignup.style.display = "flex";
		switcherText.innerHTML = "Use phone instead";
	} else {
		phoneSignup.style.display = "flex";
		emailSignup.style.display = "none";
		switcherText.innerHTML = "Use email instead";
	}
}

emailPhoneSwitch.addEventListener("click", function () {
	emailPhoneSwap();
});

// Change Styles for inputs when focused
const inputLabels = document.querySelectorAll("[data-input-label]");

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
