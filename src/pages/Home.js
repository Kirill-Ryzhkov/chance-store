import React, {useEffect} from "react";
import useFetch from "../hooks/useFetch";
import Header from "../components/common/Header";
import Product from "../components/Home/Product";

const API_URL = process.env.REACT_APP_API_URL;

export default function Home ({ page }) {

    const { data } = useFetch(`/store/multiple`, "GET", {type: "cafe"});

    // useEffect(() => {
    //     const fetchData = async () => {
    
    //       try {
    //         const response = await fetch(API_URL + "/store/multiple", {
    //             method: "GET", 
    //             type: "cafe"
    //         });
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! status: ${response.status}`);
    //         }
    //         const result = await response.json();
    //         console.log(result);
    //       } catch (err) {
    //         console.log(err)
    //         }
    //     };
    //     fetchData();
    // }, []);

    console.log(data);

    return (
        <div className="bg-background min-h-screen text-colorPrimary flex">
            <Header page={page}/>
            <Product page={page} products={data} />
        </div>
    );
}