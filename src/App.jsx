import { useState } from "react";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMinus,
	faPlus,
	faStar,
	faStarHalf,
	faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faEmptyHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

const productName = "Classy Modern Smart watch";
const colors = [
	{ name: "purple", code: "#816BFF" },
	{ name: "cyan", code: "#1FCEC9" },
	{ name: "blue", code: "#4B97D3" },
	{ name: "black", code: "#3B4747" },
];
const sizes = [
	{ name: "S", price: 69 },
	{ name: "M", price: 79 },
	{ name: "L", price: 89 },
	{ name: "XL", price: 99 },
];

function App() {
	const [selectedImage, setSelectedImage] = useState(colors[0].name);
	const [quantity, setQuantity] = useState(1);
	const [isBookmark, setIsBookmark] = useState(false);
	const [colorSelected, setColorSelected] = useState(colors[0]);
	const [sizeAndPrice, setsizeAndPrice] = useState(sizes[0]);
	const [showCart, setShowCart] = useState(false);
	const [showOverlay, setShowOverlay] = useState(false);
	const [cart, setCart] = useState([]);
	const totalQuantity = cart.reduce((acc, curr) => acc + curr.quantity, 0);
	const totalPrice = cart.reduce((acc, curr) => acc + curr.price, 0);

	function setSizeAndPrice(value) {
		setsizeAndPrice(value);
	}

	function handleAddCart() {
		const { name: sizeName, price } = sizeAndPrice;
		setCart((prevState) => [
			...prevState,
			{
				name: productName,
				size: sizeName,
				price,
				color: colorSelected,
				quantity: quantity,
			},
		]);
	}
	return (
		<>
			<div className="product-container">
				<div className="product-image">
					<img id="mainImage" src={`images/${selectedImage}.png`} alt="Smart Watch" />
				</div>

				<div className="product-details">
					<h1>Classy Modern Smart watch</h1>
					<div className="product-rating">
						<div className="stars">
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStar} />
							<FontAwesomeIcon icon={faStarHalf} />
							<FontAwesomeIcon icon={faStarEmpty} />
						</div>
						<span className="review-count">(2 Reviews)</span>
					</div>
					<div className="product-price">
						<span className="original-price">$99.00</span>
						<span className="discounted-price">$79.00</span>
					</div>

					<div className="product-description">
						<p>
							I must explain to you how all this mistaken idea of denoun cing ple praising
							pain was born and I will give you a complete account of the system, and
							expound the actual teaching.
						</p>
					</div>

					<div className="product-vendor">
						<div className="first">
							<p>Type</p>
							<p>Watch</p>
						</div>
						<div className="second">
							<p>Model Number</p>
							<p>Forerunner 290XT</p>
						</div>
					</div>

					<div className="color-selection">
						<h3>Band Color</h3>
						<div className="color-options">
							{colors.map((color, i) => (
								<div
									key={i}
									className="color-option"
									onClick={() => {
										setColorSelected(color.name);
										setSelectedImage(color.name);
									}}
									style={{
										backgroundColor: color.code,
										outlineColor:
											colorSelected === color.name ? color.code : "transparent",
										outlineOffset: colorSelected === color.name ? "2px" : "none",
									}}></div>
							))}
						</div>
					</div>

					<div className="size-selection">
						<h3>Wrist Size</h3>
						<div className="size-options">
							{sizes.map((size, i) => (
								<div
									key={i}
									className="size-option"
									style={{
										border:
											size.name === sizeAndPrice.name ? "2px solid #8b49ff" : "none",
										color: size.name === sizeAndPrice.name ? "#8b49ff" : "#8091a7",
									}}
									onClick={() => setSizeAndPrice({ name: size.name, price: size.price })}>
									{size.name} <span className="price">${size.price}</span>
								</div>
							))}
						</div>
					</div>

					<div className="product-bottom">
						<div className="quantity-selector">
							<button
								id="decreaseQty"
								className="decrement-btn"
								onClick={() =>
									setQuantity((prevState) => (prevState > 1 ? quantity - 1 : 1))
								}>
								<FontAwesomeIcon icon={faMinus} />
							</button>
							<input
								id="quantity"
								type="text"
								value={quantity}
								min="1"
								className="counter-input"
								disabled={true}
							/>
							<button
								id="increaseQty"
								className="increment-btn"
								onClick={() => setQuantity(quantity + 1)}>
								<FontAwesomeIcon icon={faPlus} />
							</button>
						</div>
						<button
							id="addToCart"
							className="add-to-cart"
							onClick={() => handleAddCart()}>
							Add to Cart
						</button>
						<div
							className="favorite"
							onClick={() => setIsBookmark((prevState) => !prevState)}>
							{isBookmark ? (
								<FontAwesomeIcon icon={faHeart} />
							) : (
								<FontAwesomeIcon icon={faEmptyHeart} />
							)}
						</div>
					</div>
				</div>
			</div>
			<div
				className="checkout-float"
				id="checkoutFloat"
				onClick={() => {
					setShowCart((prevState) => !prevState);
					setShowOverlay((prevState) => !prevState);
				}}>
				Checkout <span className="cart-count">{totalQuantity}</span>
			</div>

			{/* cart modal */}
			{showCart && (
				<div className="cart-modal" id="cartModal">
					<h2>Your Cart</h2>
					<div className="table-scroll-wrapper">
						<table className="cart-table">
							<thead>
								<tr>
									<th>Item</th>
									<th>Color</th>
									<th>Size</th>
									<th>Qnt</th>
									<th>Price</th>
								</tr>
							</thead>

							<tbody id="cartItems">
								{cart.map((item, i) => (
									<tr key={i} className="product-item">
										<td className="item-column">
											<img src={`/images/${item.color}.png`} alt={productName} />
											<p>{item.name}</p>
										</td>
										<td>{item.color}</td>
										<td>{item.size}</td>
										<td>{item.quantity}</td>
										<td>${item.price}</td>
									</tr>
								))}
								<tr>
									<td className="cart-total">Total</td>
									<td colSpan="2"></td>
									<td className="cart-total-quantity">{totalQuantity}</td>
									<td id="cartTotal">${totalPrice}</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="cart-actions">
						<button
							id="continueShoppingBtn"
							onClick={() => {
								setShowOverlay((prevState) => !prevState);
								setShowCart((prevState) => !prevState);
							}}>
							Continue Shopping
						</button>
						<button id="checkoutBtn">Checkout</button>
					</div>
				</div>
			)}

			{showOverlay && (
				<div
					className="overlay"
					id="overlay"
					onClick={() => {
						setShowOverlay((prevState) => !prevState);
						setShowCart((prevState) => !prevState);
					}}></div>
			)}
		</>
	);
}

export default App;
