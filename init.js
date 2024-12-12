import { state } from "./state";

const firstColor = document.querySelector(".color-option");
const colorCode = firstColor.dataset.color;
const colorName = firstColor.dataset.name;
firstColor.style.outlineColor = colorCode;
firstColor.style.outlineOffset = "2px";
firstColor.classList.add("active");

const firstSize = document.querySelector(".size-option");
firstSize.classList.add("active");
firstSize.classList.add("active");

const quantityInput = document.querySelector("#quantity");
quantityInput.value = state.quantity || "1";
