export default function Button ({ onClick, text, color }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full h-12 rounded-md mt-2 text-shadow ${color}`}
        >{ text }</button>
    );
}