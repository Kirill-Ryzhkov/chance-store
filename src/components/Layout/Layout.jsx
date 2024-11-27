import React from "react";
import Header from "../common/Header";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div className="md:mt-28 mt-20 justify-center">{children}</div>
    </div>
  );
}
