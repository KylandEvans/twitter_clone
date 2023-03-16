const app = {
	init() {
		app.addListeners();
	},
	addListeners() {
		const searchbox = document.querySelector("[data-desktop-searchbox]");
		const largeAccountButton = document.querySelector("[data-large-desktop-account-button]");
		const largeDesktopAside = document.querySelector(".large-desktop-aside");
		const desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button]");
		searchbox.addEventListener("focus", app.searchboxFocused);
		searchbox.addEventListener("blur", app.searchboxBlured);
		searchbox.addEventListener("input", app.searchboxChange);
		largeAccountButton.addEventListener("click", app.largeDesktopOpenAccountOptions);
		desktopMoreItemsButton.addEventListener("click", app.setMoreButtonsPopoutPosition);
		window.addEventListener("click", app.largeDesktopCloseAccountOptions);
		window.addEventListener("resize", app.setMoreButtonsPopoutPosition);

		window.addEventListener("resize", app.windowResize);
	},

	windowResize() {
		if (window.innerWidth <= 500) {
			app.loadMobile();
			// app.unloadDesktop();
			console.log(window.innerWidth);
		} else {
			// app.loadDesktop();
			// app.unloadMobile();
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

	// unloadMobile() {
	// 	const mobileHeaderImage = document.querySelector("[data-mobile-aside-open]");
	// 	mobileHeaderImage.removeEventListener("click", app.mobileAsideOpen);
	// },

	searchboxFocused() {
		const searchboxWrapper = document.querySelector("[data-desktop-searchbox-wrapper]");
		const searchboxClear = document.querySelector("[data-desktop-searchbox-clear]");
		const searchbox = document.querySelector("[data-desktop-searchbox]");
		searchboxWrapper.style.backgroundColor = "transparent";
		searchboxWrapper.style.border = "solid 1px var(--twitter-blue)";
		if (searchbox.value.length > 0) {
			searchboxClear.classList.add("d-flex");
			searchboxClear.classList.remove("d-none");
		} else {
			searchboxClear.classList.remove("d-flex");
			searchboxClear.classList.add("d-none");
		}
	},

	searchboxBlured() {
		const searchboxWrapper = document.querySelector("[data-desktop-searchbox-wrapper]");
		const searchboxClear = document.querySelector("[data-desktop-searchbox-clear]");
		const searchbox = document.querySelector("[data-desktop-searchbox]");
		searchboxWrapper.style.backgroundColor = "rgba(32, 35, 39, 0.7)";
		searchboxWrapper.style.border = "none";
		searchboxClear.classList.add("d-none");
		searchboxClear.classList.remove("d-flex");
	},

	searchboxChange() {
		const searchboxWrapper = document.querySelector("[data-desktop-searchbox-wrapper]");
		const searchboxClear = document.querySelector("[data-desktop-searchbox-clear]");
		const searchbox = document.querySelector("[data-desktop-searchbox]");
		const searchboxPlaceholder = document.querySelector("[data-dekstop-search-placeholder]");
		if (searchbox.value.length > 0) {
			searchboxPlaceholder.classList.remove("d-flex");
			searchboxPlaceholder.classList.add("d-none");
			searchboxClear.classList.add("d-flex");
			searchboxClear.classList.remove("d-none");
		} else {
			searchboxPlaceholder.classList.add("d-flex");
			searchboxPlaceholder.classList.remove("d-none");
			searchboxClear.classList.remove("d-flex");
			searchboxClear.classList.add("d-none");
		}
	},

	largeDesktopOpenAccountOptions() {
		const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
		const main = document.querySelector("main");
		if (accountOptionsBox.classList.contains("d-none")) {
			accountOptionsBox.classList.remove("d-none");
			main.classList.add("pointer-events-none");
		}
	},

	largeDesktopCloseAccountOptions(e) {
		const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
		const element = document.querySelector("[data-large-desktop-account-button]");
		const main = document.querySelector("main");
		if (e.target !== element && !element.contains(e.target)) {
			accountOptionsBox.classList.add("d-none");
			main.classList.remove("pointer-events-none");
		}
	},

	setMoreButtonsPopoutPosition() {
		const desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button]");
		const extraItemsMenu = document.querySelector("[data-desktop-aside-extras-menu]");
		let elePos = desktopMoreItemsButton.getBoundingClientRect();
		extraItemsMenu.style.right = window.innerWidth - elePos.left - 350 + "px";
		extraItemsMenu.style.top = window.innerHeight - elePos.bottom - 100 + "px";

		if (extraItemsMenu.classList.contains("d-none")) {
			extraItemsMenu.classList.remove("d-none");
		}
		let menuPos = window.getComputedStyle(extraItemsMenu);
		console.log(parseInt(menuPos.height) + parseInt(menuPos.top));
		console.log(menuPos.bottom);
		if (parseFloat(menuPos.bottom) < 0) {
			extraItemsMenu.style.bottom = 0;
		}
	},
};

window.addEventListener("DOMContentLoaded", app.init);
