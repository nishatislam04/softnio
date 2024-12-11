import { state } from "./state";

const firstColor = document.querySelector(".color-option");
const color = firstColor.dataset.color;
firstColor.style.outlineColor = color;
firstColor.style.outlineOffset = "2px";
firstColor.classList.add("active");

const firstSize = document.querySelector(".size-option");
firstSize.classList.add("active");
firstSize.classList.add("active");

const quantityInput = document.querySelector("#quantity");
quantityInput.value = state.quantity || "1";
