const app = {
	init() {
		app.addListeners();
	},
	addListeners() {
		const searchbox = document.querySelector("[data-desktop-searchbox]");
		const largeAccountButton = document.querySelector("[data-large-desktop-account-button]");
		const accountButton = document.querySelector("[data-desktop-account-button]");
		const largeDesktopAside = document.querySelector(".large-desktop-aside");
		const desktopMoreItemsButton = document.querySelector("[data-desktop-extra-links-button]");
		const newTweetBtn = document.querySelector("[data-submit-tweet-btn]");
		const likeBtns = document.querySelectorAll("[data-likes-buttons]");
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

		newTweetBtn.addEventListener("click", app.getTweetBox);
		accountButton.addEventListener("click", app.desktopOpenAccountOptions);
		largeAccountButton.addEventListener("click", app.desktopOpenAccountOptions);
		desktopMoreItemsButton.addEventListener("click", app.openMoreItemsMenu);
		moreItemsButton.addEventListener("click", app.openMoreItemsMenu);
		likeBtns.forEach(btn => {
			btn.addEventListener("click", app.sendLike);
		});
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
		if (window.innerWidth <= 500) {
			app.loadMobile();
		}
	},

	windowResize() {
		const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
		if (window.innerWidth <= 500) {
			app.loadMobile();
			// app.unloadDesktop();
		} else {
			// app.loadDesktop();
			// app.unloadMobile();
		}

		if (!accountOptionsBox.classList.contains("d-none")) {
			app.positionAcountPopout();
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
		const elementSm = document.querySelector("[data-desktop-account-button]");
		const main = document.querySelector("main");
		if (!e) {
			accountOptionsBox.classList.add("d-none");
			main.classList.remove("pointer-events-none");
			return;
		}
		if (
			e.target !== element &&
			e.target !== elementSm &&
			!element.contains(e.target) &&
			!elementSm.contains(e.target) &&
			!accountOptionsBox.contains(e.target) &&
			!accountOptionsBox.classList.contains("d-none")
		) {
			accountOptionsBox.classList.add("d-none");
			main.classList.remove("pointer-events-none");
		}
	},

	positionAcountPopout() {
		if (window.innerWidth > 499) {
			const accountOptionsBox = document.querySelector("[data-large-desktop-account-popout]");
			let openAccountOptionsButton;
			if (window.innerWidth >= 1300) {
				openAccountOptionsButton = document.querySelector(
					"[data-large-desktop-account-button]"
				);
			} else if (window.innerWidth < 1300 && window.innerWidth >= 500) {
				openAccountOptionsButton = document.querySelector("[data-desktop-account-button]");
			}

			let btnPos = openAccountOptionsButton.getBoundingClientRect();
			let eleStyles = window.getComputedStyle(accountOptionsBox);
			accountOptionsBox.style.top = btnPos.top - parseFloat(eleStyles.height) - 35 + "px";
			accountOptionsBox.style.left = btnPos.left + 10 + "px";
			console.log(btnPos);
		} else if (window.innerWidth <= 499) {
			app.desktopCloseAccountOptions();
		}
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
		if (!e) {
			extraItemsMenu.classList.add("d-none");
			main.classList.remove("pointer-events-none");
			return;
		}

		if (!extraItemsMenu.classList.contains("d-none")) {
			if (e.target !== largedesktopItemsButton && !largedesktopItemsButton.contains(e.target)) {
				if (e.target !== desktopMoreItemsButton && !desktopMoreItemsButton.contains(e.target)) {
					if (e.target !== extraItemsMenu && !extraItemsMenu.contains(e.target)) {
						extraItemsMenu.classList.add("d-none");
						main.classList.remove("pointer-events-none");
					}
				}
			}
		}
	},

	setMoreButtonsPopoutPosition() {
		if (window.innerWidth >= 500) {
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
		} else if (window.innerWidth < 500) {
			app.closeMoreItemsMenu();
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
	async getTweetBox() {
		const response = await fetch("/compose/tweet");
		console.log(await response.text());
	},

	sendLike(e) {
		e.stopPropagation();
		if (!e.target.classList.contains("liked")) {
			let likeId = e.target.dataset.likeId;
			async function postLike(url) {
				const response = await fetch(url, {
					method: "POST",
				});
				if (response.ok) {
					const allElements = document.querySelectorAll(`[data-like-id="${likeId}"]`);
					for (let i = 0; i < allElements.length; i++) {
						allElements[i].classList.add("liked");
						if (allElements[i].classList.contains("action-button-text")) {
							allElements[i].style.color = "var(--red)";
							let currVal = parseInt(allElements[i].textContent);
							currVal++;
							allElements[i].textContent = currVal;
						}
						if (allElements[i].tagName === "path") {
							let newPath =
								"M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z";
							allElements[i].setAttribute("d", newPath);
							allElements[i].style.fill = "var(--red)";
						}
					}
				}
			}
			postLike(`/like/${likeId}`);
		} else if (e.target.classList.contains("liked")) {
			let likeId = e.target.dataset.likeId;
			async function postUnlike(url) {
				const response = await fetch(url, {
					method: "POST",
				});
				if (response.ok) {
					const allElements = document.querySelectorAll(`[data-like-id="${likeId}"]`);
					for (let i = 0; i < allElements.length; i++) {
						allElements[i].classList.remove("liked");
						if (allElements[i].classList.contains("action-button-text")) {
							allElements[i].style.color = "unset";
							let currVal = parseInt(allElements[i].textContent);
							currVal--;
							allElements[i].textContent = currVal;
						}
						if (allElements[i].tagName === "path") {
							let newPath =
								"M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z";
							allElements[i].setAttribute("d", newPath);
							allElements[i].style.fill = "unset";
						}
					}
				}
			}
			postUnlike(`/unlike/${likeId}`);
		}
	},
};

window.addEventListener("DOMContentLoaded", app.init);
