// Switch between phone and email signup
const switcherText = document.querySelector("[data-signup-email-phone-switch]");

// Working on the below. Need to fix switching mechanic

function emailPhoneSwap() {
	const emailSignup = document.querySelector("[data-signup-email]");
	const phoneSignup = document.querySelector("[data-signup-phone]");

	console.log(switcherText);
	console.log(phoneSignup.display);

	if (getComputedStyle(phoneSignup).display === "flex") {
		phoneSignup.style.display = "none";
		emailSignup.style.display = "flex";
		switcherText.innerHTML = "Use phone instead";
	} else if (getComputedStyle(emailSignup).display === "flex") {
		phoneSignup.style.display = "flex";
		emailSignup.style.display = "none";
		switcherText.innerHTML = "Use email instead";
	}
}

switcherText.addEventListener("click", function () {
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
