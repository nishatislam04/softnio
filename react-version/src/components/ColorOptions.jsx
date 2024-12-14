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
							setColorSelected(color);
							setSelectedImage(color.name);
						}}
						style={{
							backgroundColor: color.code,
							outlineColor:
								colorSelected.name === color.name ? color.code : "transparent",
							outlineOffset: colorSelected.name === color.name ? "2px" : "none",
						}}></div>
				))}
			</div>
		</div>
	);
}
