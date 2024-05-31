import React from "react";
import {Outlet} from "react-router-dom"

//Layout
import RestaurantLayout from "../layouts/RestaurantLayout";

const RestaurantPage = () =>{
    return (
        <>
           <div>Restaurant</div>
            <Outlet/>
        </>

    );
};

export default RestaurantLayout(RestaurantPage);