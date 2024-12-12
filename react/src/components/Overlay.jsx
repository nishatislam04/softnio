export default function Overlay({ setShowOverlay, setShowCart }) {
	return (
		<div
			className="overlay"
			id="overlay"
			onClick={() => {
				setShowOverlay((prevState) => !prevState);
				setShowCart((prevState) => !prevState);
			}}></div>
	);
}
