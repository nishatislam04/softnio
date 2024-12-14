export default function ColorOptions({
	colors,
	colorSelected,
	setColorSelected,
	setSelectedImage,
}) {
	return (
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
							outlineColor: colorSelected === color.name ? color.code : "transparent",
							outlineOffset: colorSelected === color.name ? "2px" : "none",
						}}></div>
				))}
			</div>
		</div>
	);
}
