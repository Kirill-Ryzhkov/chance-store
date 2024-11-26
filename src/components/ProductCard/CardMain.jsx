const IMAGE_URL = process.env.REACT_APP_IMAGE_SERVER;

export default function CardMain ({ product }) {
    return (
        <div className="w-full">
            <div className="flex md:justify-start justify-center">
                <img alt={product?.name} className="mt-3 w-3/4" src={IMAGE_URL + product?.image} />
            </div>
            <div className="regular-bold-font md:text-4xl text-3xl mt-3">{ product?.name }</div>
            <div className="regular-not-bold-font md:text-3xl text-2xl mt-3">${ product?.price.toFixed(2) }</div>
        </div>
    );
    
}