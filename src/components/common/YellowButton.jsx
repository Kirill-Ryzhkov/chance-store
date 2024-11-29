export default function YellowButton ({ onClick, text }) {
    return (
        <button 
            onClick={onClick}
            className="w-full h-12 bg-yellow-400 rounded-md mt-2"
        >{ text }</button>
    );
}