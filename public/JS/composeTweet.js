const tweet = {
	init() {
		tweet.addListeners();
	},

	addListeners() {
		window.addEventListener("click", tweet.closeMenus);
		const tweetBox = document.querySelector("[data-tweetBox]");
		const audienceSelect = document.querySelector("[data-audience-select]");
		const audienceEveryone = document.querySelectorAll("[data-audience-everyone]");
		const audienceCircle = document.querySelectorAll("[data-audience-circle]");
		const replySelectionMenu = document.querySelector("[data-reply-selection-menu-btn]");
		const replySelectionEveryone = document.querySelectorAll("[data-reply-selection-everyone]");
		const replySelectionFollow = document.querySelectorAll("[data-reply-selection-follow]");
		const replySelectionMention = document.querySelectorAll("[data-reply-selection-mention]");

		// tweetBox.focus();
		tweetBox.addEventListener("click", () => {
			const goodText = document.querySelector("[data-good-text]");
			goodText.focus();
		});
		tweetBox.addEventListener("input", tweet.tweetBoxChange);
		audienceSelect.addEventListener("click", tweet.audienceSelectToggle);
		audienceEveryone.forEach(el => {
			el.addEventListener("click", tweet.selectAudienceEveryone);
		});
		audienceCircle.forEach(el => {
			el.addEventListener("click", tweet.selectAudienceCircle);
		});
		replySelectionMenu.addEventListener("click", tweet.replyMenuToggle);
		replySelectionEveryone.forEach(el => {
			el.addEventListener("click", tweet.selectEveryone);
		});
		replySelectionFollow.forEach(el => {
			el.addEventListener("click", tweet.selectFollow);
		});
		replySelectionMention.forEach(el => {
			el.addEventListener("click", tweet.selectMention);
		});
	},

	closeMenus(e) {
		const menus = document.querySelectorAll("[data-menu]");
		// const audienceSelect = document.querySelector("[data-audience-select]");
		// const replySelectionMenu = document.querySelector("[data-reply-selection-menu-btn]");
		menus.forEach(menu => {
			if (!menu.classList.contains("d-none") && !menu.firstChild.contains(e.target)) {
				// if()
				console.log("Menu Closed");
				menu.classList.add("d-none");
			}
		});
	},

	tweetBoxChange() {
		const tweetBox = document.querySelector("[data-tweetBox]");
		const tweetBoxPlaceholder = document.querySelector("[data-tweetBoxPlaceholder]");
		const tweetBtn = document.querySelectorAll("[data-submit-tweet]");
		const progressBar = document.querySelector("[data-progress-bar]");
		const progressAddTweetBtn = document.querySelector("[data-progress-add-tweet-btn]");
		const goodTextWrap = document.querySelector("[data-good-text-wrapper]");
		const badTextWrap = document.querySelector("[data-bad-text-wrapper]");
		const goodText = document.querySelector("[data-good-text]");
		const badText = document.querySelector("[data-bad-text]");

		let charcount;
		// console.log(tweetBox.innerText);
		if (tweetBox.innerText.length <= 0) {
			tweetBoxPlaceholder.classList.remove("d-none");
			progressAddTweetBtn.classList.add("d-none");
			progressAddTweetBtn.classList.remove("d-flex");
			tweetBtn[0].disabled = true;
			tweetBtn[1].disabled = true;
		} else {
			tweetBoxPlaceholder.classList.add("d-none");
			progressAddTweetBtn.classList.remove("d-none");
			progressAddTweetBtn.classList.add("d-flex");
			tweetBtn[0].disabled = false;
			tweetBtn[1].disabled = false;
		}

		if (tweetBox.innerText.length <= 256) {
			charcount = tweetBox.innerText.length * 1.40625;
			progressBar.style.background = `conic-gradient(var(--twitter-blue) ${charcount}deg, var(--faded-white) 0deg)`;
		}

		goodText.textContent = tweetBox.textContent.slice(0, 256);
		if (tweetBox.textContent.length > 256) {
			badText.textContent = tweetBox.textContent.slice(256);
		}
		tweetBox.innerText = "";
	},

	selectAudienceEveryone() {
		const everyoneCheck = document.querySelectorAll("[data-audience-everyone-check]");
		const circlecheck = document.querySelectorAll("[data-audience-circle-check]");
		const audienceSelect = document.querySelector("[data-audience-select]");
		const audienceSelectText = document.querySelector("[data-audience-select-text]");
		const audienceSelectDropdown = document.querySelector("[data-audience-select-dropdown]");
		const replySelectedText = document.querySelector("[data-reply-selection-text]");
		const replySelectedImg = document.querySelector("[data-reply-selected-img]");
		const replySelectionMenu = document.querySelector("[data-reply-selection-menu-btn]");
		const replyEveryoneCheck = document.querySelectorAll("[data-reply-everyone-check]");
		const replyFollowCheck = document.querySelectorAll("[data-reply-follow-check]");
		const replyMentioncheck = document.querySelectorAll("[data-reply-mention-check]");
		if (window.innerWidth < 500) {
			if (everyoneCheck[0].classList.contains("d-none")) {
				everyoneCheck[0].classList.remove("d-none");
				everyoneCheck[1].classList.remove("d-none");
				everyoneCheck[0].classList.add("selected");
				everyoneCheck[1].classList.add("selected");
				audienceSelect.classList.add("blue-bg-hover");
				audienceSelectText.classList.add("blue-text");
				audienceSelectDropdown.classList.add("blue-fill");
				audienceSelectText.innerText = "Everyone";
				audienceSelect.classList.remove("green-bg-hover");
				audienceSelectText.classList.remove("green-text");
				audienceSelectDropdown.classList.remove("green-fill");
			}
			if (!circlecheck[0].classList.contains("d-none")) {
				circlecheck[0].classList.add("d-none");
				circlecheck[1].classList.add("d-none");
				circlecheck[0].classList.remove("selected");
				circlecheck[1].classList.remove("selected");
			}
			if (replyEveryoneCheck[0].classList.contains("selected")) {
				const everyoneImgPath =
					"M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z";
				replySelectedText.innerText = "Everyone can reply";
				replySelectedImg.setAttribute("d", everyoneImgPath);
			} else if (replyFollowCheck[0].classList.contains("selected")) {
				const followImgPath =
					"M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zm19.75-7.22l-4.141 6.21L16.1 9.7l1.2-1.6 1.954 1.47 2.969-4.46 1.664 1.11z";
				replySelectedText.innerText = "People you follow can reply";
				replySelectedImg.setAttribute("d", followImgPath);
			} else if (replyMentioncheck[0].classList.contains("selected")) {
				const mentionImgPath =
					"M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z";
				replySelectedText.innerText = "Only people you mention can reply";
				replySelectedImg.setAttribute("d", mentionImgPath);
			}
			replySelectionMenu.classList.remove("opacity-half");
			replySelectionMenu.classList.remove("pointer-events-none");

			tweet.audienceSelectToggle();
		} else {
			if (everyoneCheck[1].classList.contains("d-none")) {
				everyoneCheck[1].classList.remove("d-none");
				everyoneCheck[0].classList.remove("d-none");
				everyoneCheck[1].classList.add("selected");
				everyoneCheck[0].classList.add("selected");
				audienceSelect.classList.add("blue-bg-hover");
				audienceSelectText.classList.add("blue-text");
				audienceSelectDropdown.classList.add("blue-fill");
				audienceSelectText.innerText = "Everyone";
				audienceSelect.classList.remove("green-bg-hover");
				audienceSelectText.classList.remove("green-text");
				audienceSelectDropdown.classList.remove("green-fill");
			}
			if (!circlecheck[1].classList.contains("d-none")) {
				circlecheck[1].classList.add("d-none");
				circlecheck[0].classList.add("d-none");
				circlecheck[1].classList.remove("selected");
				circlecheck[0].classList.remove("selected");
			}
			if (replyEveryoneCheck[1].classList.contains("selected")) {
				const everyoneImgPath =
					"M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z";
				replySelectedText.innerText = "Everyone can reply";
				replySelectedImg.setAttribute("d", everyoneImgPath);
			} else if (replyFollowCheck[1].classList.contains("selected")) {
				const followImgPath =
					"M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zm19.75-7.22l-4.141 6.21L16.1 9.7l1.2-1.6 1.954 1.47 2.969-4.46 1.664 1.11z";
				replySelectedText.innerText = "People you follow can reply";
				replySelectedImg.setAttribute("d", followImgPath);
			} else if (replyMentioncheck[1].classList.contains("selected")) {
				const mentionImgPath =
					"M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z";
				replySelectedText.innerText = "Only people you mention can reply";
				replySelectedImg.setAttribute("d", mentionImgPath);
			}
			replySelectionMenu.classList.remove("opacity-half");
			replySelectionMenu.classList.remove("pointer-events-none");

			tweet.audienceSelectToggle();
		}
	},
	selectAudienceCircle() {
		const everyoneCheck = document.querySelectorAll("[data-audience-everyone-check]");
		const circlecheck = document.querySelectorAll("[data-audience-circle-check]");
		const audienceSelect = document.querySelector("[data-audience-select]");
		const audienceSelectText = document.querySelector("[data-audience-select-text]");
		const audienceSelectDropdown = document.querySelector("[data-audience-select-dropdown]");
		const replySelectedText = document.querySelector("[data-reply-selection-text]");
		const replySelectedImg = document.querySelector("[data-reply-selected-img]");
		const replySelectionMenu = document.querySelector("[data-reply-selection-menu-btn]");
		const imgPath =
			"M17.5 7H17v-.25c0-2.76-2.24-5-5-5s-5 2.24-5 5V7h-.5C5.12 7 4 8.12 4 9.5v9C4 19.88 5.12 21 6.5 21h11c1.39 0 2.5-1.12 2.5-2.5v-9C20 8.12 18.89 7 17.5 7zM13 14.73V17h-2v-2.27c-.59-.34-1-.99-1-1.73 0-1.1.9-2 2-2 1.11 0 2 .9 2 2 0 .74-.4 1.39-1 1.73zM15 7H9v-.25c0-1.66 1.35-3 3-3 1.66 0 3 1.34 3 3V7z";
		if (circlecheck[0].classList.contains("d-none")) {
			circlecheck[0].classList.remove("d-none");
			circlecheck[1].classList.remove("d-none");
			circlecheck[0].classList.add("selected");
			circlecheck[1].classList.add("selected");
			audienceSelect.classList.add("green-bg-hover");
			audienceSelectText.classList.add("green-text");
			audienceSelectDropdown.classList.add("green-fill");
			audienceSelectText.innerText = "Twitter Circle";
			audienceSelect.classList.remove("blue-bg-hover");
			audienceSelectText.classList.remove("blue-text");
			audienceSelectDropdown.classList.remove("blue-fill");
		}
		if (!everyoneCheck[0].classList.contains("d-none")) {
			everyoneCheck[0].classList.add("d-none");
			everyoneCheck[1].classList.add("d-none");
			everyoneCheck[0].classList.remove("selected");
			everyoneCheck[1].classList.remove("selected");
		}
		replySelectedText.innerText = "Only your Twitter Circle can reply";
		replySelectedImg.setAttribute("d", imgPath);
		replySelectionMenu.classList.add("opacity-half");
		replySelectionMenu.classList.add("pointer-events-none");
		tweet.audienceSelectToggle();
	},

	audienceSelectToggle(e) {
		try {
			e.stopPropagation();
		} catch {}
		console.log("Menu was opened");
		const audienceSelectPopout = document.querySelector("[data-audience-select-popout]");
		const mobileAudienceSelection = document.querySelector("[data-mobile-audience-selection]");
		if (window.innerWidth < 500) {
			if (mobileAudienceSelection.classList.contains("d-none")) {
				mobileAudienceSelection.classList.remove("d-none");
			} else {
				mobileAudienceSelection.classList.add("d-none");
			}
		} else {
			if (audienceSelectPopout.classList.contains("d-none")) {
				audienceSelectPopout.classList.remove("d-none");
			} else {
				audienceSelectPopout.classList.add("d-none");
			}
		}
	},

	replyMenuToggle(e) {
		try {
			e.stopPropagation();
		} catch {}
		console.log("Menu was opened");
		const replySelectionMenu = document.querySelector("[data-reply-selection-menu]");
		const mobileReplySelectionMenu = document.querySelector("[data-mobile-reply-selection]");
		if (window.innerWidth < 500) {
			if (mobileReplySelectionMenu.classList.contains("d-none")) {
				mobileReplySelectionMenu.classList.remove("d-none");
			} else {
				mobileReplySelectionMenu.classList.add("d-none");
			}
		} else {
			if (replySelectionMenu.classList.contains("d-none")) {
				replySelectionMenu.classList.remove("d-none");
			} else {
				replySelectionMenu.classList.add("d-none");
			}
		}
	},

	selectEveryone() {
		const replyEveryoneCheck = document.querySelectorAll("[data-reply-everyone-check]");
		const replyFollowCheck = document.querySelectorAll("[data-reply-follow-check]");
		const replyMentioncheck = document.querySelectorAll("[data-reply-mention-check]");
		const replySelectedText = document.querySelector("[data-reply-selection-text]");
		const replySelectedImg = document.querySelector("[data-reply-selected-img]");
		const imgPath =
			"M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z";
		if (
			replyFollowCheck[0].classList.contains("selected") ||
			replyFollowCheck[1].classList.contains("selected")
		) {
			replyFollowCheck[0].classList.remove("selected");
			replyFollowCheck[1].classList.remove("selected");
			replyFollowCheck[0].classList.add("d-none");
			replyFollowCheck[1].classList.add("d-none");
		} else if (
			replyMentioncheck[0].classList.contains("selected") ||
			replyMentioncheck[1].classList.contains("selected")
		) {
			replyMentioncheck[0].classList.remove("selected");
			replyMentioncheck[1].classList.remove("selected");
			replyMentioncheck[0].classList.add("d-none");
			replyMentioncheck[1].classList.add("d-none");
		}
		if (
			replyEveryoneCheck[0].classList.contains("d-none") ||
			replyEveryoneCheck[1].classList.contains("d-none")
		) {
			replyEveryoneCheck[0].classList.remove("d-none");
			replyEveryoneCheck[1].classList.remove("d-none");
		}
		replyEveryoneCheck[0].classList.add("selected");
		replyEveryoneCheck[1].classList.add("selected");
		replySelectedText.innerText = "Everyone can reply";
		replySelectedImg.setAttribute("d", imgPath);
		tweet.replyMenuToggle();
	},
	selectFollow() {
		const replyEveryoneCheck = document.querySelectorAll("[data-reply-everyone-check]");
		const replyFollowCheck = document.querySelectorAll("[data-reply-follow-check]");
		const replyMentioncheck = document.querySelectorAll("[data-reply-mention-check]");
		const replySelectedText = document.querySelector("[data-reply-selection-text]");
		const replySelectedImg = document.querySelector("[data-reply-selected-img]");
		const imgPath =
			"M10 4c-1.105 0-2 .9-2 2s.895 2 2 2 2-.9 2-2-.895-2-2-2zM6 6c0-2.21 1.791-4 4-4s4 1.79 4 4-1.791 4-4 4-4-1.79-4-4zM3.651 19h12.698c-.337-1.8-1.023-3.21-1.945-4.19C13.318 13.65 11.838 13 10 13s-3.317.65-4.404 1.81c-.922.98-1.608 2.39-1.945 4.19zm.486-5.56C5.627 11.85 7.648 11 10 11s4.373.85 5.863 2.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H1.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46zm19.75-7.22l-4.141 6.21L16.1 9.7l1.2-1.6 1.954 1.47 2.969-4.46 1.664 1.11z";
		if (
			replyEveryoneCheck[0].classList.contains("selected") ||
			replyEveryoneCheck[1].classList.contains("selected")
		) {
			replyEveryoneCheck[0].classList.remove("selected");
			replyEveryoneCheck[1].classList.remove("selected");
			replyEveryoneCheck[0].classList.add("d-none");
			replyEveryoneCheck[1].classList.add("d-none");
		} else if (
			replyMentioncheck[0].classList.contains("selected") ||
			replyMentioncheck[1].classList.contains("selected")
		) {
			replyMentioncheck[0].classList.remove("selected");
			replyMentioncheck[1].classList.remove("selected");
			replyMentioncheck[0].classList.add("d-none");
			replyMentioncheck[1].classList.add("d-none");
		}
		if (
			replyFollowCheck[0].classList.contains("d-none") ||
			replyFollowCheck[1].classList.contains("d-none")
		) {
			replyFollowCheck[0].classList.remove("d-none");
			replyFollowCheck[1].classList.remove("d-none");
		}
		replyFollowCheck[0].classList.add("selected");
		replyFollowCheck[1].classList.add("selected");
		replySelectedText.innerText = "People you follow can reply";
		replySelectedImg.setAttribute("d", imgPath);
		tweet.replyMenuToggle();
	},
	selectMention() {
		const replyEveryoneCheck = document.querySelectorAll("[data-reply-everyone-check]");
		const replyFollowCheck = document.querySelectorAll("[data-reply-follow-check]");
		const replyMentioncheck = document.querySelectorAll("[data-reply-mention-check]");
		const replySelectedText = document.querySelector("[data-reply-selection-text]");
		const replySelectedImg = document.querySelector("[data-reply-selected-img]");
		const imgPath =
			"M12 3.786c-4.556 0-8.25 3.694-8.25 8.25s3.694 8.25 8.25 8.25c1.595 0 3.081-.451 4.341-1.233l1.054 1.7c-1.568.972-3.418 1.534-5.395 1.534-5.661 0-10.25-4.589-10.25-10.25S6.339 1.786 12 1.786s10.25 4.589 10.25 10.25c0 .901-.21 1.77-.452 2.477-.592 1.731-2.343 2.477-3.917 2.334-1.242-.113-2.307-.74-3.013-1.647-.961 1.253-2.45 2.011-4.092 1.78-2.581-.363-4.127-2.971-3.76-5.578.366-2.606 2.571-4.688 5.152-4.325 1.019.143 1.877.637 2.519 1.342l1.803.258-.507 3.549c-.187 1.31.761 2.509 2.079 2.629.915.083 1.627-.356 1.843-.99.2-.585.345-1.224.345-1.83 0-4.556-3.694-8.25-8.25-8.25zm-.111 5.274c-1.247-.175-2.645.854-2.893 2.623-.249 1.769.811 3.143 2.058 3.319 1.247.175 2.645-.854 2.893-2.623.249-1.769-.811-3.144-2.058-3.319z";
		if (
			replyEveryoneCheck[0].classList.contains("selected") ||
			replyEveryoneCheck[1].classList.contains("selected")
		) {
			replyEveryoneCheck[0].classList.remove("selected");
			replyEveryoneCheck[1].classList.remove("selected");
			replyEveryoneCheck[0].classList.add("d-none");
			replyEveryoneCheck[1].classList.add("d-none");
		} else if (
			replyFollowCheck[0].classList.contains("selected") ||
			replyFollowCheck[1].classList.contains("selected")
		) {
			replyFollowCheck[0].classList.remove("selected");
			replyFollowCheck[1].classList.remove("selected");
			replyFollowCheck[0].classList.add("d-none");
			replyFollowCheck[1].classList.add("d-none");
		}
		if (
			replyMentioncheck[0].classList.contains("d-none") ||
			replyMentioncheck[1].classList.contains("d-none")
		) {
			replyMentioncheck[0].classList.remove("d-none");
			replyMentioncheck[1].classList.remove("d-none");
		}
		replyMentioncheck[0].classList.add("selected");
		replyMentioncheck[1].classList.add("selected");
		replySelectedText.innerText = "Only people you mention can reply";
		replySelectedImg.setAttribute("d", imgPath);
		tweet.replyMenuToggle();
	},
};

window.addEventListener("DOMContentLoaded", tweet.init());
