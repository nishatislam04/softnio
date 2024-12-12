export default function Cart({
	cart,
	productName,
	totalQuantity,
	setShowOverlay,
	setShowCart,
	totalPrice,
}) {
	return (
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
									<img src={`/images/${item.color.name}.png`} alt={productName} />
									<p>{item.name}</p>
								</td>
								<td>{item.color.name}</td>
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
	);
}
