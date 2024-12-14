"use strict";

import { removeStyles } from "./helper";
import { state } from "./state";

// Update cart UI
function updateCartUI() {
	const productName = document.querySelector(".product-details h1").textContent;
	const selectedColor = document.querySelector(".color-option.active").dataset.name;
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
	const totalQuantity = state.cart.reduce((acc, curr) => acc + curr.quantity, 0);

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
                    <td class="cart-total-quantity">${totalQuantity}</td>
                    <td id="cartTotal">$${totalPrice}</td>
                </tr>`;
	console.log(state);
	cartItems.insertAdjacentHTML("afterbegin", html);
}

const quantity = document.getElementById("quantity");
const cartModal = document.getElementById("cartModal");
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
		if (state.cart.length === 0) document.querySelector("#checkoutBtn").disabled = true;
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

	// upodate color element
	if (e.target.classList.contains("color-option")) {
		removeStyles(".color-option", "active");

		state.quantity = 1;
		document.querySelector("#quantity").value = state.quantity;

		const element = e.target;
		element.classList.add("active");
		element.style.outlineColor = element.dataset.color;
	}

	// update image
	if (e.target.classList.contains("color-option")) {
		const element = e.target;
		state.selectedColor = element.dataset.name;
		document.querySelector("#mainImage").src = `images/${state.selectedColor}.png`;
		document.querySelector(".color-option.active").classList.remove("active");
		element.classList.add("active");
	}

	if (e.target.closest(".size-option")) {
		state.quantity = 1;
		document.querySelector("#quantity").value = state.quantity;

		const element = e.target.closest(".size-option");
		state.selectedSize = element.dataset.size;
		document.querySelector(".size-option.active")?.classList.remove("active");
		element.classList.add("active");
	}

	if (e.target.id === "checkoutBtn") {
		state.cart = [];
		state.quantity = 0;
		document.querySelector(".cart-table tbody").innerHTML = "";
		document.querySelector(".cart-table tbody").innerHTML = `<tr>
								<td colspan=5 class="cart-data-not-found">
									No Items were found on cart
								</td>
							</tr>`;
		document.querySelector(".cart-count").textContent = "0";
		document.querySelector("#cartModal").style.display = "none";
		document.querySelector("#overlay").classList.remove("active");
	}
});
