import React from "react";
import { TbSlashes } from "react-icons/tb";
import { Link } from "react-router-dom";

export default function Breadcrumbs () {

    const urlArr = window.location.pathname.split("/");
    urlArr.splice(0, 1);

    return (
        <div className="flex items-center md:pl-10 pl-6 mt-3 regular-not-bold-font text-lg">
            {urlArr.map((url, index) => (
                <React.Fragment key={index}>
                    {index < urlArr.length - 1 ? (
                        <Link to={`/${url}`} className="underline">
                            {url}
                        </Link>
                    ) : (
                        <span>{url}</span>
                    )}
                    {index < urlArr.length - 1 && <TbSlashes className="mx-2" />}
                </React.Fragment>
            ))}
        </div>
    )
}