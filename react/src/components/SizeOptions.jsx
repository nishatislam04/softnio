export default function SizeOptions({ sizes, sizeAndPrice, setSizeAndPrice }) {
	return (
		<div className="size-selection">
			<h3>Wrist Size</h3>
			<div className="size-options">
				{sizes.map((size, i) => (
					<div
						key={i}
						className="size-option"
						style={{
							border: size.name === sizeAndPrice.name ? "2px solid #8b49ff" : "none",
							color: size.name === sizeAndPrice.name ? "#8b49ff" : "#8091a7",
						}}
						onClick={() => setSizeAndPrice({ name: size.name, price: size.price })}>
						{size.name} <span className="price">${size.price}</span>
					</div>
				))}
			</div>
		</div>
	);
}
