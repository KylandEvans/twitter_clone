const app = {
	init() {
		app.addListeners();
		console.log("JS Init");
	},
	addListeners() {
		window.addEventListener("resize", app.windowResize);
		if (window.innerWidth <= 500) {
			app.loadMobile();
			// app.unloadDesktop();
		} else {
			// app.loadDesktop();
			// app.unloadMobile();
		}
	},

	windowResize() {
		if (window.innerWidth <= 500) {
			app.loadMobile();
			app.unloadDesktop();
			console.log(window.innerWidth);
		} else {
			app.loadDesktop();
			app.unloadMobile();
		}
	},

	unloadMobileAside() {
		const mobileAsideCloseBtn = document.querySelector("[data-mobile-aside-close]");
		const mobileAside = document.querySelector("[data-mobile-aside]");
		const creatorStudioToggle = document.querySelector("[data-creator-studio-toggle]");
		const professionalToolsToggle = document.querySelector("[data-professional-tools-toggle]");
		const settingsSupportToggle = document.querySelector("[data-settings-support-toggle]");
		mobileAsideCloseBtn.removeEventListener("click", app.closeMobileAside);
		creatorStudioToggle.removeEventListener("click", app.toggleCreatorStudio);
		professionalToolsToggle.removeEventListener("click", app.toggleProfessionalTools);
		settingsSupportToggle.removeEventListener("click", app.toggleSettingsSupport);
	},

	closeMobileAside() {
		const mobileAside = document.querySelector("[data-mobile-aside]");
		const feedOuter = document.querySelector("[data-feed-outer]");
		mobileAside.classList.remove("animate--mobile-aside-slide-open");
		mobileAside.classList.add("animate--mobile-aside-slide-close");
		mobileAside.classList.remove("d-block");
		setTimeout(() => {
			mobileAside.classList.add("d-none");
		}, 250);
		feedOuter.classList.remove("white-overlay");
		app.unloadMobileAside();
	},

	mobileAsideOpen() {
		const mobileAside = document.querySelector("[data-mobile-aside]");
		const mobileAsideCloseBtn = document.querySelector("[data-mobile-aside-close]");
		const feedOuter = document.querySelector("[data-feed-outer]");
		const creatorStudioToggle = document.querySelector("[data-creator-studio-toggle]");
		const professionalToolsToggle = document.querySelector("[data-professional-tools-toggle]");
		const settingsSupportToggle = document.querySelector("[data-settings-support-toggle]");
		mobileAside.classList.remove("animate--mobile-aside-slide-close");
		mobileAside.classList.add("d-block");
		mobileAside.classList.remove("d-none");
		mobileAside.classList.add("animate--mobile-aside-slide-open");
		creatorStudioToggle.addEventListener("click", app.toggleCreatorStudio);
		professionalToolsToggle.addEventListener("click", app.toggleProfessionalTools);
		settingsSupportToggle.addEventListener("click", app.toggleSettingsSupport);
		feedOuter.classList.add("white-overlay");

		mobileAsideCloseBtn.addEventListener("click", app.closeMobileAside);
	},

	toggleCreatorStudio() {
		const creatorStudioItems = document.querySelector("[data-creator-studio-items]");
		const dropdown = document.querySelector("[data-creator-studio-items-dropdown]");
		if (creatorStudioItems.classList.contains("d-none")) {
			creatorStudioItems.classList.remove("d-none");
			dropdown.classList.add("mobile-dropdown-arrow-open");
			dropdown.classList.remove("mobile-dropdown-arrow-close");
		} else {
			creatorStudioItems.classList.add("d-none");
			dropdown.classList.remove("mobile-dropdown-arrow-open");
			dropdown.classList.add("mobile-dropdown-arrow-close");
		}
	},

	toggleProfessionalTools() {
		const professionalToolsItems = document.querySelector("[data-professional-tools-items]");
		const dropdown = document.querySelector("[data-professional-tools-dropdown]");
		if (professionalToolsItems.classList.contains("d-none")) {
			professionalToolsItems.classList.remove("d-none");
			dropdown.classList.add("mobile-dropdown-arrow-open");
			dropdown.classList.remove("mobile-dropdown-arrow-close");
		} else {
			professionalToolsItems.classList.add("d-none");
			dropdown.classList.remove("mobile-dropdown-arrow-open");
			dropdown.classList.add("mobile-dropdown-arrow-close");
		}
	},

	toggleSettingsSupport() {
		const settingsSupportItems = document.querySelector("[data-settings-support-items]");
		const dropdown = document.querySelector("[data-settings-support-dropdown]");
		if (settingsSupportItems.classList.contains("d-none")) {
			settingsSupportItems.classList.remove("d-none");
			dropdown.classList.add("mobile-dropdown-arrow-open");
			dropdown.classList.remove("mobile-dropdown-arrow-close");
		} else {
			settingsSupportItems.classList.add("d-none");
			dropdown.classList.remove("mobile-dropdown-arrow-open");
			dropdown.classList.add("mobile-dropdown-arrow-close");
		}
	},

	loadMobile() {
		const mobileHeaderImage = document.querySelector("[data-mobile-aside-open]");
		mobileHeaderImage.addEventListener("click", app.mobileAsideOpen);
	},

	unloadMobile() {
		const mobileHeaderImage = document.querySelector("[data-mobile-aside-open]");
		mobileHeaderImage.removeEventListener("click", app.mobileAsideOpen);
	},
};

window.addEventListener("DOMContentLoaded", app.init);
