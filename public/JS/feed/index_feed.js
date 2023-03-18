const app = {
	init() {
		app.addListeners();
	},
	addListeners() {
		const searchbox = document.querySelector("[data-desktop-searchbox]");
		const largeAccountButton = document.querySelector("[data-large-desktop-account-button]");
		const largeDesktopAside = document.querySelector(".large-desktop-aside");
		const desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button]");
		const moreItemsButton = (extraItemsMenu = document.querySelector(
			"[data-desktop-extra-links-button-sm]"
		));
		const openCreatorMenuBtn = document.querySelectorAll("[data-large-desktop-creator-open-btn]");
		const openProfessionalsMenuBtn = document.querySelectorAll(
			"[data-large-desktop-professionals-open-btn]"
		);
		const openSettingsMenuBtn = document.querySelectorAll(
			"[data-large-desktop-settings-open-btn]"
		);
		searchbox.addEventListener("focus", app.searchboxFocused);
		searchbox.addEventListener("blur", app.searchboxBlured);
		searchbox.addEventListener("input", app.searchboxChange);
		// ATTENTION: MAKE THE DEKSTIOP ACCOUNT OPTIONS WORK FOR UNDER 1300PX NOT WORKING!!!!!!!!!!!!
		largeAccountButton.addEventListener("click", app.desktopOpenAccountOptions);
		desktopMoreItemsButton.addEventListener("click", app.openMoreItemsMenu);
		moreItemsButton.addEventListener("click", app.openMoreItemsMenu);
		openCreatorMenuBtn.forEach(ele => {
			ele.addEventListener("click", app.toggleCreatorMenu);
		});
		openProfessionalsMenuBtn.forEach(ele => {
			ele.addEventListener("click", app.toggleProfessionalsMenu);
		});
		openSettingsMenuBtn.forEach(ele => {
			ele.addEventListener("click", app.toggleSettingsMenu);
		});
		window.addEventListener("click", app.desktopCloseAccountOptions);
		window.addEventListener("click", app.closeMoreItemsMenu);
		window.addEventListener("resize", app.setMoreButtonsPopoutPosition);
		window.addEventListener("resize", app.windowResize);
	},

	windowResize() {
		if (window.innerWidth <= 500) {
			app.loadMobile();
			// app.unloadDesktop();
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

	desktopOpenAccountOptions() {
		const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
		const main = document.querySelector("main");
		if (accountOptionsBox.classList.contains("d-none")) {
			accountOptionsBox.classList.remove("d-none");
			main.classList.add("pointer-events-none");
		}
		app.positionAcountPopout();
	},

	desktopCloseAccountOptions(e) {
		const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
		const element = document.querySelector("[data-large-desktop-account-button]");
		const main = document.querySelector("main");
		if (
			e.target !== element &&
			!element.contains(e.target) &&
			!accountOptionsBox.classList.contains("d-none")
		) {
			accountOptionsBox.classList.add("d-none");
			main.classList.remove("pointer-events-none");
		}
	},

	positionAcountPopout() {
		const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
		let openAccountOptionsButton;
		if (window.innerWidth >= 1300) {
			openAccountOptionsButton = document.querySelector("[data-large-desktop-account-button]");
		} else if (window.innerWidth < 1300 && window.innerWidth >= 500) {
			openAccountOptionsButton = document.querySelector("[data-desktop-account-button]");
		}

		let btnPos = openAccountOptionsButton.getBoundingClientRect();
		let eleStyles = document.getComputedStyle(accountOptionsBox);
		console.log(btnPos);
		accountOptionsBox.style.top = btnPos.top - parseFloat(eleStyles.height) + "px";
	},

	openMoreItemsMenu() {
		let extraItemsMenu;
		if (window.innerWidth >= 1300) {
			extraItemsMenu = document.querySelector("[data-desktop-extra-links-button]");
		} else if (window.innerWidth < 1300 && window.innerWidth >= 500) {
			extraItemsMenu = document.querySelector("[data-desktop-extra-links-button-sm]");
		}
		extraItemsMenu = document.querySelector("[data-desktop-aside-extras-menu]");
		const main = document.querySelector("main");
		console.log(main);
		if (extraItemsMenu.classList.contains("d-none")) {
			extraItemsMenu.classList.remove("d-none");
			app.setMoreButtonsPopoutPosition();
			main.classList.add("pointer-events-none");
		}
	},

	closeMoreItemsMenu(e) {
		const extraItemsMenu = document.querySelector("[data-desktop-aside-extras-menu]");
		const largedesktopItemsButton = document.querySelector("[data-desktop-extra-links-button]");
		const desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button-sm]");
		const main = document.querySelector("main");
		if (!extraItemsMenu.classList.contains("d-none")) {
			if (e.target !== largedesktopItemsButton && !largedesktopItemsButton.contains(e.target)) {
				if (e.target !== desktopMoreItemsButton && !desktopMoreItemsButton.contains(e.target)) {
					if (e.target !== extraItemsMenu && !extraItemsMenu.contains(e.target)) {
						extraItemsMenu.classList.add("d-none");
						main.classList.remove("pointer-events-none");
						console.log("close menu");
					}
				}
			}
		}
	},

	setMoreButtonsPopoutPosition() {
		let desktopMoreItemsButton;
		if (window.innerWidth >= 1300) {
			desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button]");
		} else if (window.innerWidth < 1300 && window.innerWidth >= 500) {
			desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button-sm]");
		}
		const extraItemsMenu = document.querySelector("[data-desktop-aside-extras-menu]");
		let elePos = desktopMoreItemsButton.getBoundingClientRect();
		extraItemsMenu.style.right = window.innerWidth - elePos.left - 350 + "px";
		extraItemsMenu.style.top = window.innerHeight - elePos.bottom - 100 + "px";

		let menuPos = window.getComputedStyle(extraItemsMenu);
		extraItemsMenu.style.bottom = "unset";
		if (parseFloat(menuPos.bottom) < 0) {
			extraItemsMenu.style.bottom = 0;
		}
	},

	toggleCreatorMenu() {
		const menu = document.querySelector("[data-desktop-creator-menu]");
		const dropdown = document.querySelector("[data-desktop-creator-dropdown-arrow]");
		if (menu.classList.contains("d-none")) {
			if (dropdown.classList.contains("popout-item-dropdown-img-close")) {
				dropdown.classList.remove("popout-item-dropdown-img-close");
			}
			dropdown.classList.add("popout-item-dropdown-img-open");
			menu.classList.remove("d-none");
		} else {
			if (dropdown.classList.contains("popout-item-dropdown-img-open")) {
				dropdown.classList.remove("popout-item-dropdown-img-open");
			}
			dropdown.classList.add("popout-item-dropdown-img-close");
			menu.classList.add("d-none");
		}
		app.setMoreButtonsPopoutPosition();
	},
	toggleProfessionalsMenu() {
		const menu = document.querySelector("[data-desktop-professionals-menu]");
		const dropdown = document.querySelector("[data-desktop-professionals-dropdown-arrow]");
		if (menu.classList.contains("d-none")) {
			if (dropdown.classList.contains("popout-item-dropdown-img-close")) {
				dropdown.classList.remove("popout-item-dropdown-img-close");
			}
			dropdown.classList.add("popout-item-dropdown-img-open");
			menu.classList.remove("d-none");
		} else {
			if (dropdown.classList.contains("popout-item-dropdown-img-open")) {
				dropdown.classList.remove("popout-item-dropdown-img-open");
			}
			dropdown.classList.add("popout-item-dropdown-img-close");
			menu.classList.add("d-none");
		}
		app.setMoreButtonsPopoutPosition();
	},
	toggleSettingsMenu() {
		const menu = document.querySelector("[data-desktop-settings-menu]");
		const dropdown = document.querySelector("[data-desktop-settings-dropdown-arrow]");
		if (menu.classList.contains("d-none")) {
			if (dropdown.classList.contains("popout-item-dropdown-img-close")) {
				dropdown.classList.remove("popout-item-dropdown-img-close");
			}
			dropdown.classList.add("popout-item-dropdown-img-open");
			menu.classList.remove("d-none");
		} else {
			if (dropdown.classList.contains("popout-item-dropdown-img-open")) {
				dropdown.classList.remove("popout-item-dropdown-img-open");
			}
			dropdown.classList.add("popout-item-dropdown-img-close");
			menu.classList.add("d-none");
		}
		app.setMoreButtonsPopoutPosition();
	},
};

window.addEventListener("DOMContentLoaded", app.init);
