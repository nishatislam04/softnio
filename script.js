"use strict";
const state = {
	cart: [],
	quantity: 1, // tempo
};

// Update cart UI
function updateCartUI() {
	const productName = document.querySelector(".product-details h1").textContent;
	const selectedColor = document.querySelector(".color-option.active").dataset.color;
	const selectedSize = document.querySelector(".size-option.active").dataset.size;
	const selectedPrice = document
		.querySelector(".size-option.active .price")
		.textContent.replace("$", "");
	const itemQuantity = document.querySelector("#quantity").value;

	const item = {
		name: productName,
		color: selectedColor,
		size: selectedSize,
		price: +selectedPrice,
		quantity: +itemQuantity,
	};
	state.cart.push(item);

	document.querySelector(".cart-count").textContent = state.cart.reduce(
		(acc, item) => acc + item.quantity,
		0
	);
	const totalPrice = state.cart.reduce(
		(acc, item) => acc + item.price * item.quantity,
		0
	);

	const cartItems = document.getElementById("cartItems");
	cartItems.innerHTML = "";
	let html = state.cart
		.map((item) => {
			return `
                <tr class="product-item">
                    <td class="item-column">
                        <img src="/images/${item.color}.png" alt="Classy Modern Smart Watch" />
                        <p>${item.name}</p>
                    </td>
                    <td>${item.color}</td>
                    <td>${item.size}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                </tr>
               
            `;
		})
		.join("");
	html += ` <tr>
                    <td class="cart-total">Total</td>
                    <td colspan="2"></td>
                    <td class="cart-total-quantity">${state.quantity}</td>
                    <td id="cartTotal">$${totalPrice}</td>
                </tr>`;

	cartItems.insertAdjacentHTML("afterbegin", html);

	// Update total

	// document.getElementById("cartTotal").textContent = total.toFixed(2);
}

const quantity = document.getElementById("quantity");
const increaseQty = document.getElementById("increaseQty");
const decreaseQty = document.getElementById("decreaseQty");
const addToCart = document.getElementById("addToCart");
const checkoutFloat = document.getElementById("checkoutFloat");
const cartModal = document.getElementById("cartModal");
const continueShopBtn = document.getElementById("continueShoppingBtn");
const overlay = document.getElementById("overlay");

document.addEventListener("click", function (e) {
	if (e.target.id === "addToCart") {
		updateCartUI();
	}

	if (e.target.id === "bookmark") {
		e.target.classList.contains("fa-regular")
			? e.target.classList.replace("fa-regular", "fa-solid")
			: e.target.classList.replace("fa-solid", "fa-regular");
	}
	if (e.target.id === "overlay") {
		e.target.classList.remove("active");
		cartModal.style.display = "none";
	}

	if (e.target.id === "continueShoppingBtn") {
		overlay.classList.remove("active");
		document.getElementById("cartModal").style.display = "none";
	}

	if (e.target.id === "checkoutFloat") {
		overlay.classList.add("active");
		cartModal.style.display = "block";
	}

	if (e.target.closest("#increaseQty")) {
		state.quantity++;
		quantity.value = state.quantity;
	}

	if (e.target.closest("#decreaseQty")) {
		if (state.quantity > 1) {
			state.quantity--;
			document.getElementById("quantity").value = state.quantity;
		}
	}

	// if (e.target.id === "addToCart") {
	// 	const item = {
	// 		name: "Classy Modern Smart watch",
	// 		color: state.selectedColor,
	// 		size: state.selectedSize,
	// 		quantity: state.quantity,
	// 		price: 79.0,
	// 	};

	// 	state.cart.push(item);
	// 	updateCartUI();
	// }

	// upodate color element
	if (e.target.classList.contains("color-option")) {
		removeStyles(".color-option", "active");

		const element = e.target;
		element.classList.add("active");
		element.style.outlineColor = element.dataset.color;
	}

	// update image
	if (e.target.classList.contains("color-option")) {
		const element = e.target;
		state.selectedColor = element.dataset.color;
		document.querySelector("#mainImage").src = `images/${state.selectedColor}.png`;
		document.querySelector(".color-option.active").classList.remove("active");
		element.classList.add("active");
	}

	if (e.target.closest(".size-option")) {
		const element = e.target.closest(".size-option");
		state.selectedSize = element.dataset.size;
		document.querySelector(".size-option.active")?.classList.remove("active");
		element.classList.add("active");
	}
});

// helper function
function removeStyles(selector, className) {
	const elements = document.querySelectorAll(selector);
	elements.forEach((element) => element.classList.remove(className));
}

document.addEventListener("DOMContentLoaded", function (e) {
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
});
