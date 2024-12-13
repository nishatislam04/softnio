import { useState } from "react";
import "./style.scss";

import SizeOptions from "./components/SizeOptions";
import ColorOptions from "./components/ColorOptions";
import ProductDescription from "./components/ProductDescription";
import AddCart from "./components/AddCart";
import Cart from "./components/Cart";
import Overlay from "./components/Overlay";
import CheckoutButton from "./components/CheckoutButton";
import { colors, productName, sizes } from "./utils/constants";

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
				/>
			)}

			{showOverlay && (
				<Overlay setShowOverlay={setShowOverlay} setShowCart={setShowCart} />
			)}
		</>
	);
}

export default App;
