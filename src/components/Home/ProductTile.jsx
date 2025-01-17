export default function ProductTile ({ item }) {

    const IMAGE_URL = process.env.REACT_APP_IMAGE_SERVER;

    return (
        <div className="bg-background text-colorPrimary shadow-custom rounded-lg p-4 flex flex-col items-center text-center">
            <div className="w-full xl:h-52 md:h-44 h-36 overflow-hidden rounded-md mb-2">
                <img src={IMAGE_URL + item.image} alt={item.name} className="w-full xl:h-52 md:h-40 h-36 object-cover rounded-md mb-2" />
            </div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <span className="text-lg font-bold">${item.price.toFixed(2)}</span>
        </div>
    )
}