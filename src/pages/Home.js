import React from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/common/Header";
import Product from "../components/Home/Product";

const API_URL = process.env.REACT_APP_API_URL;

export default function Home ({ page }) {

    const data = useFetch(`/store/multiple`, "POST", {type: page});

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <Header page={page}/>
            <Product page={page} products={data} />
        </div>
    );
}