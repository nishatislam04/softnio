import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faEmptyHeart } from "@fortawesome/free-regular-svg-icons";

export default function AddCart({
	quantity,
	setQuantity,
	handleAddCart,
	setIsBookmark,
	isBookmark,
}) {
	return (
		<div className="product-bottom">
			<div className="quantity-selector">
				<button
					id="decreaseQty"
					className="decrement-btn"
					onClick={() => setQuantity((prevState) => (prevState > 1 ? quantity - 1 : 1))}>
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
			<button id="addToCart" className="add-to-cart" onClick={() => handleAddCart()}>
				Add to Cart
			</button>
			<div className="favorite" onClick={() => setIsBookmark((prevState) => !prevState)}>
				{isBookmark ? (
					<FontAwesomeIcon icon={faHeart} />
				) : (
					<FontAwesomeIcon icon={faEmptyHeart} />
				)}
			</div>
		</div>
	);
}
