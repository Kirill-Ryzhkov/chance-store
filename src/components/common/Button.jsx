export default function Button ({ onClick, text, color, disabled=false }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full h-12 rounded-md mt-2 text-shadow ${color} disabled:bg-gray-400`}
            disabled={disabled}
        >{ text }</button>
    );
}