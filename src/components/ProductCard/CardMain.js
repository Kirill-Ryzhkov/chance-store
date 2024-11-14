import CappuccinoImage from '../../assets/images/cappuccino.webp';

export default function CardMain ({ product }) {
    return (
        <div className="w-full">
            <div className="flex md:justify-start justify-center">
                <img alt='latte' className="mt-3 w-3/4" src={CappuccinoImage} />
            </div>
            <div className="regular-bold-font md:text-4xl text-3xl mt-3">{ product }</div>
            <div className="regular-not-bold-font md:text-3xl text-2xl mt-3">$3.00</div>
        </div>
    )
}