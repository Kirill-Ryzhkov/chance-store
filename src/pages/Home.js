import Header from "../components/common/Header";
import Product from "../components/Home/Product";

export default function Home ({ page }) {
    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <Header page={page}/>
            <Product page={page} />
        </div>
    );
}