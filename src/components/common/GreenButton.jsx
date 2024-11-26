export default function GreenButton ({ onClick, text }) {
    return (
        <button 
            onClick={onClick}
            className="w-full h-12 bg-green-500 rounded-md sticky mt-2 bottom-2 right-0"
        >{ text }</button>
    );
}