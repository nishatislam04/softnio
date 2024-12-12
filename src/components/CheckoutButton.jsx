export default function CheckoutButton({ setShowCart, setShowOverlay, totalQuantity }) {
	return (
		<div
			className="checkout-float"
			id="checkoutFloat"
			onClick={() => {
				setShowCart((prevState) => !prevState);
				setShowOverlay((prevState) => !prevState);
			}}>
			Checkout <span className="cart-count">{totalQuantity}</span>
		</div>
	);
}
