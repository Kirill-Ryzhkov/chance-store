import React, { useState, useEffect } from "react";
import CartTable from "./CartTable";
import CartTileMobile from "./CartTileMobile";
import Button from "../common/Button";
import ProductTitle from "../common/ProductTitle";
import UnderLine from "../common/UnderLine";
import EmptyCart from "./EmptyCart";
import { useNavigate } from "react-router-dom";
import { useStatusStoreQuery } from "../../services/redux/apiSlice";


export default function CartMain({ cart, page, setCart }) {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  const { data: statusStore, refetch } = useStatusStoreQuery();
  const [status, setStatus] = useState(statusStore?.status?.open);
  const [refreshing, setRefreshing] = useState(false);

  let fields;
  if(page === "cafe") {
    fields = ['name', 'count', 'syrup', 'price', 'delete'];
  } else {
    fields = ['name', 'count', 'size', 'price', 'delete'];
  }

  const handleCheckout = () => {
    if(!status && page === "cafe"){
      return "Store is closed";
    } else {
      navigate(`/checkout/${page}`, { state: { cart } });
    }
  };

  const refetchStatus = async () => {
      setRefreshing(true);

      try {
          const { data } = await refetch();
          setStatus(data?.status?.open);
      } catch (error) {
          console.error("Failed to refresh status:", error);
      } finally {
          setRefreshing(false);
      }
  }

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex justify-center h-fit">
      {cart.length > 0 ? (
        screenWidth < 768 ? (
          <div className="flex flex-col w-full space-y-4 px-4">
            <div className="title-font text-5xl pt-5">CART</div>
            <UnderLine />
            {cart.map((item, index) => (
              <CartTileMobile
                key={index}
                item={item}
                index={index}
                fields={fields}
                setCart={setCart}
              />
            ))}
            <div className="sticky mt-2 bottom-2 right-0 text-center">
                {!status && page === 'cafe' && 
                    <div className='bg-background'>
                        <p className='text-xl'>The store is currently closed</p>
                        <p className='text-xs'>{ refreshing ? "Refreshing..." : "If it remains closed for a long time, click the button below to refresh the status"}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={refetchStatus}
                        >
                            Refresh Store Status
                        </button>
                    </div>
                }
                <Button
                  disabled={!status && page === 'cafe'}
                  onClick={handleCheckout}
                  text={"Checkout"}
                  color={"bg-green-500"}
                />
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-4/5">
            <ProductTitle page={"Cart"} />
            <CartTable
              fields={fields}
              cart={cart}
              setCart={setCart}
              page={page}
            />
            <div className="w-full mt-4 sticky mt-2 bottom-2 right-0 text-center">
                {!status && page === 'cafe' && 
                    <div className='bg-background'>
                        <p className='text-xl'>The store is currently closed</p>
                        <p className='text-xs'>{ refreshing ? "Refreshing..." : "If it remains closed for a long time, click the button below to refresh the status"}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={refetchStatus}
                        >
                            Refresh Store Status
                        </button>
                    </div>
                }
                <Button
                  disabled={!status && page === 'cafe'}
                  onClick={handleCheckout}
                  text={"Checkout"}
                  color={"bg-green-500"}
                />
            </div>
          </div>
        )
      ) : (
        <EmptyCart />
      )}
    </div>
  );
}
