export default function AddToCartButton ({ onClick }) {
    return (
        <button 
            onClick={onClick}
            className="w-full h-12 bg-green-500 rounded-md sticky  bottom-4 right-0"
        >Add to Cart</button>
    );
}