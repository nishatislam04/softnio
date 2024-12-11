// helper function
export function removeStyles(selector, className) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => {
		element.classList.remove(className);
		element.style.outlineColor = "";
	});
}
