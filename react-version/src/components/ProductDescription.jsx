import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

export default function ProductDescription({ selectedImage, children }) {
	return (
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

				{children}
			</div>
		</div>
	);
}
