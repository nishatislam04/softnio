import { useEffect, useState } from "react";
import "./style.scss";

import SizeOptions from "./components/SizeOptions";
import ColorOptions from "./components/ColorOptions";
import ProductDescription from "./components/ProductDescription";
import AddCart from "./components/AddCart";
import Cart from "./components/Cart";
import Overlay from "./components/Overlay";
import CheckoutButton from "./components/CheckoutButton";
import { colors, productName, sizes } from "./utils/constants";
import toast, { Toaster } from "react-hot-toast";

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
		setQuantity(1);
		toast.success("Item Add to Cart Success", {
			duration: 3000,
			style: {
				border: "1px solid #4caf50",
				padding: "16px 24px",
				color: "#4caf50",
				fontSize: "15px",
			},
		});
	}

	function handleCheckout() {
		setCart([]);
		setShowCart(false);
		setShowOverlay(false);
		toast.success("Checkout Success", {
			duration: 3000,
			style: {
				border: "1px solid #4caf50",
				padding: "16px 24px",
				color: "#4caf50",
				fontSize: "15px",
			},
		});
	}

	useEffect(
		function () {
			setQuantity(1);
		},
		[colorSelected, sizeAndPrice]
	);

	return (
		<>
			<Toaster position="top-right" />
			<ProductDescription selectedImage={selectedImage}>
				<ColorOptions
					colors={colors}
					colorSelected={colorSelected}
					setColorSelected={setColorSelected}
					setSelectedImage={setSelectedImage}
				/>

				<SizeOptions
					sizes={sizes}
					sizeAndPrice={sizeAndPrice}
					setSizeAndPrice={setSizeAndPrice}
				/>

				<AddCart
					quantity={quantity}
					setQuantity={setQuantity}
					handleAddCart={handleAddCart}
					setIsBookmark={setIsBookmark}
					isBookmark={isBookmark}
				/>
			</ProductDescription>

			<CheckoutButton
				setShowCart={setShowCart}
				setShowOverlay={setShowOverlay}
				totalQuantity={totalQuantity}
			/>

			{/* cart modal */}
			{showCart && (
				<Cart
					cart={cart}
					setCart={setCart}
					productName={productName}
					totalQuantity={totalQuantity}
					setShowOverlay={setShowOverlay}
					setShowCart={setShowCart}
					totalPrice={totalPrice}
					handleCheckout={handleCheckout}
				/>
			)}

			{showOverlay && (
				<Overlay setShowOverlay={setShowOverlay} setShowCart={setShowCart} />
			)}
		</>
	);
}

export default App;
