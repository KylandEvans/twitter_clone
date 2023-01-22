const signinPageScript = {
	init() {
		signinPageScript.vars.signinModalOpen.addEventListener(
			"click",
			signinPageScript.openSigninModal
		);
	},

	vars: {
		signinModalOpen: document.querySelector("[data-signin-modal-open]"),
		signinModal: document.querySelector("[data-modal-signin]"),
		modalClose: document.querySelector("[data-signin-modal-close]"),
		usernameField: document.querySelector("[data-signin-username-field]"),
		usernameLabel: document.querySelector("[data-signin-username-label]"),
		usernameInput: document.querySelector("[data-signin-username-input]"),
		signinNextBtn: document.querySelector("[data-signin-next-button]"),
		signinFirstPage: document.querySelector("[data-signin-page-1]"),
		signinSecondPage: document.querySelector("[data-signin-page-2]"),
		signinBtn: document.querySelector("[data-login-button-field]"),
		signinButton: document.querySelector("[data-login-button]"),
		signinSecondPageUsn: document.querySelector("[data-signin-page-2-username]"),
		passwordField: document.querySelector("[data-password-field]"),
		passwordLabel: document.querySelector("[data-password-label]"),
		passwordInput: document.querySelector("[data-password-input]"),
		showHidePassword: document.querySelector("[data-login-show-hide-password]"),
	},

	openSigninModal() {
		let scrollPos = Math.floor(window.scrollY);
		signinPageScript.vars.signinModal.style.top = scrollPos;
		signinPageScript.vars.signinModal.style.display = "flex";
		document.querySelector("html").classList.add("noscroll");
		signinPageScript.loadFirstLoginPage();
	},

	modalClose() {
		const vars = signinPageScript.vars;
		vars.signinModal.style.display = "none";
		document.querySelector("html").classList.remove("noscroll");
		vars.usernameInput.value = null;
		signinPageScript.unloadFirstLoginPage();
		signinPageScript.unloadSecondPage();
	},

	loadFirstLoginPage() {
		const vars = signinPageScript.vars;
		vars.usernameField.addEventListener("click", signinPageScript.focusUsernameInput);
		vars.usernameInput.addEventListener("focusout", signinPageScript.focusOutUsernameInput);
		signinPageScript.vars.modalClose.addEventListener("click", signinPageScript.modalClose);
		// vars.signinNextBtn.addEventListener("click", signinPageScript.loadSecondPage);
		vars.signinNextBtn.addEventListener("click", signinPageScript.checkUser);
	},

	async checkUser() {
		const usn = document.querySelector("[data-signin-username-input]");
		const data = { username: usn.value };
		// console.log(data);
		const response = await fetch("/getuser", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			signinPageScript.loadSecondPage();
		}
	},

	focusUsernameInput() {
		const vars = signinPageScript.vars;
		vars.usernameInput.focus();
		vars.usernameLabel.style.display = "flex";
		vars.usernameInput.placeolder = null;
		vars.usernameField.classList.add("input-focused");
	},

	focusOutUsernameInput() {
		const vars = signinPageScript.vars;
		if (!vars.usernameInput.value.length) {
			vars.usernameLabel.style.display = "none";
			vars.usernameInput.placeolder = "Phone, email, or username";
			vars.usernameField.classList.remove("input-focused");
			return;
		}
		vars.usernameField.classList.remove("input-focused");
	},

	unloadFirstLoginPage() {
		signinPageScript.vars.modalClose.removeEventListener("click", signinPageScript.modalClose);
		signinPageScript.vars.usernameField.removeEventListener(
			"click",
			signinPageScript.focusUsernameInput
		);
		signinPageScript.vars.usernameInput.removeEventListener(
			"focusout",
			signinPageScript.focusOutUsernameInput
		);
	},

	loadSecondPage() {
		const vars = signinPageScript.vars;
		vars.signinFirstPage.classList.remove("d-block");
		vars.signinFirstPage.classList.add("d-none");
		vars.signinSecondPage.classList.add("d-block");
		vars.signinSecondPage.classList.remove("d-none");
		vars.signinBtn.classList.remove("d-none");
		vars.signinBtn.classList.add("d-block");
		vars.signinSecondPageUsn.value = vars.usernameInput.value;
		vars.passwordInput.addEventListener("focusin", signinPageScript.focusPasswordInput);
		vars.passwordInput.addEventListener("focusout", signinPageScript.focusOutPasswordInput);
		vars.showHidePassword.addEventListener("click", signinPageScript.showHidePasswordHandler);
		vars.passwordInput.addEventListener("input", signinPageScript.showLoginBtn);
		vars.signinButton.addEventListener("click", signinPageScript.checkPwd);
	},

	unloadSecondPage() {
		const vars = signinPageScript.vars;
		vars.signinFirstPage.classList.add("d-block");
		vars.signinFirstPage.classList.remove("d-none");
		vars.signinSecondPage.classList.remove("d-block");
		vars.signinSecondPage.classList.add("d-none");
		vars.signinBtn.classList.add("d-none");
		vars.signinBtn.classList.remove("d-block");
		vars.signinSecondPageUsn.value = vars.usernameInput.value;
		vars.passwordInput.removeEventListener("focusin", signinPageScript.focusPasswordInput);
		vars.passwordInput.removeEventListener("focusout", signinPageScript.focusOutPasswordInput);
		vars.showHidePassword.removeEventListener("click", signinPageScript.showHidePasswordHandler);
		vars.passwordInput.removeEventListener("input", signinPageScript.showLoginBtn);
	},

	focusPasswordInput() {
		const vars = signinPageScript.vars;
		vars.passwordLabel.style.display = "flex";
		vars.passwordInput.placeolder = null;
		vars.passwordField.classList.add("input-focused");
	},

	focusOutPasswordInput() {
		const vars = signinPageScript.vars;
		if (!vars.passwordInput.value.length) {
			vars.passwordLabel.style.display = "none";
			vars.passwordInput.placeolder = "Password";
			vars.passwordField.classList.remove("input-focused");
			return;
		}
		vars.passwordField.classList.remove("input-focused");
	},

	showHidePasswordHandler() {
		const vars = signinPageScript.vars;
		if (vars.passwordInput.type === "password") {
			vars.passwordInput.type = "text";
			vars.showHidePassword.src = "Icons/hide_password.svg";
			return;
		}
		if (vars.passwordInput.type === "text") {
			vars.passwordInput.type = "password";
			vars.showHidePassword.src = "Icons/show_password.svg";
		}
	},

	showLoginBtn() {
		const vars = signinPageScript.vars;
		if (!vars.passwordInput.value.length) {
			vars.signinButton.disabled = true;
			return;
		}
		vars.signinButton.disabled = false;
	},

	async checkPwd() {
		const usn = document.querySelector("[data-signin-page-2-username]");
		const pwd = document.querySelector("[data-password-input]");
		const data = {
			username: usn.value,
			password: pwd.value,
		};

		const response = await fetch("/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (response.ok) {
			location.reload();
		}
	},
};

document.addEventListener("DOMContentLoaded", signinPageScript.init);
