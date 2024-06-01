import React from "react";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom"

//Layout
//import RestaurantLayout from "../layouts/RestaurantLayout";

const RestaurantPage = () =>{
    const { id } = useParams();
    const { pathname } = useLocation();
  
    if (`/restaurant/${id}` === pathname) {
      return <Navigate to={`/restaurant/${id}/overview`} />;
    }

    return (
        <>
           <div>Restaurant</div>
            <Outlet/>
        </>

    );
};

export default RestaurantPage;