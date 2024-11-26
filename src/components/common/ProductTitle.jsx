import UnderLine from "./UnderLine";

export default function ProductTitle ({ page }) {
    return (
        <>
            <div className="title-font lg:text-7xl md:text-6xl text-5xl md:pt-6 pt-5 md:pl-10 pl-6 ">
                { page.toUpperCase() }
            </div>
            <UnderLine />
        </>
    );
}