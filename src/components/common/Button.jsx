export default function Button ({ onClick, text, color, disabled = false, isLoading = false }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full h-12 rounded-md mt-2 text-shadow ${color} disabled:bg-gray-400 relative flex items-center justify-center`}
            disabled={disabled}
        >
        {isLoading ? (
                <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            ) : 
            ( text )
        }
        </button>
    );
}