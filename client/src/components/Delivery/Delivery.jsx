import React, { useState } from "react";

// components
import DeliveryCarousel from "./DeliveryCarousel";
import RestaurantCard from "../RestaurantCard";

const Delivery = () => {
    const [restaurantList, setRestaurantList] = useState([
        {
            _id: "124ksjf435245jv34fg3",
            isPro: true,
            isOff: true,
            name: "Nathu's Sweets",
            restaurantReviewValue: "3.7",
            cuisine: [
                "Mithai",
                "South Indian",
                "Chinese",
                "Street Food",
                "Fast Food",
                "Desserts",
                "North Indian",
            ],
            averageCost: "450",
        },
        {
            _id: "sdffdsadadsfadfadsfadsf",
            isPro: true,
            isOff: false,
            name: "Master Koii's",
            restaurantReviewValue: "4.6",
            cuisine: ["Asian", "Chinese", "Thai", "Malaysian", "Korean"],
            averageCost: "600",
        },
        {
            _id: "asb2314hsbd7823bsd8237",
            isPro: false,
            isOff: false,
            name: "Spicy Delight",
            restaurantReviewValue: "4.2",
            cuisine: [
                "Indian",
                "Thai",
                "Chinese",
                "Street Food",
                "Beverages"
            ],
            averageCost: "600",
        },
        {
            _id: "kjh234jhb24hjb24jhb23",
            isPro: true,
            isOff: false,
            name: "The Pizza Factory",
            restaurantReviewValue: "4.5",
            cuisine: [
                "Italian",
                "Fast Food",
                "Beverages",
                "Desserts"
            ],
            averageCost: "800",
        },
        {
            _id: "h1b2c3j4h5b6j7k8l9m0n1",
            isPro: true,
            isOff: true,
            name: "Burger Barn",
            restaurantReviewValue: "3.9",
            cuisine: [
                "American",
                "Fast Food",
                "Beverages"
            ],
            averageCost: "500",
        },
        {
            _id: "qwe123rty456uio789pasd",
            isPro: false,
            isOff: true,
            name: "Sushi World",
            restaurantReviewValue: "4.7",
            cuisine: [
                "Japanese",
                "Seafood",
                "Desserts"
            ],
            averageCost: "1200",
        },
        {
            _id: "lkj098mnb765vcx432zqa",
            isPro: false,
            isOff: false,
            name: "Curry House",
            restaurantReviewValue: "4.0",
            cuisine: [
                "North Indian",
                "South Indian",
                "Beverages",
                "Desserts"
            ],
            averageCost: "550",
        },
        {
            _id: "poi987lkj654mnb321vcx",
            isPro: true,
            isOff: false,
            name: "Taco Town",
            restaurantReviewValue: "4.3",
            cuisine: [
                "Mexican",
                "Fast Food",
                "Beverages"
            ],
            averageCost: "650",
        },
        {
            _id: "zxc123vbn456mkl789qwe",
            isPro: true,
            isOff: true,
            name: "Pasta Paradise",
            restaurantReviewValue: "4.1",
            cuisine: [
                "Italian",
                "Beverages",
                "Desserts"
            ],
            averageCost: "700",
        },
        {
            _id: "rty567uio890jkl123asd",
            isPro: false,
            isOff: true,
            name: "BBQ Nation",
            restaurantReviewValue: "4.8",
            cuisine: [
                "Barbecue",
                "American",
                "Beverages",
                "Desserts"
            ],
            averageCost: "1000",
        }
        
    ]);

    return (
        <>
            <DeliveryCarousel />
            <h1 className="text-xl mt-4 mb-2 md:mt-8 md:text-3xl md:font-semibold">
                Delivery Restaurants in NCR (Delhi)
            </h1>
            <div className="grid gap-0 md:gap-2 md:grid-cols-2 grid-cols-1 lg:grid-cols-3">
                {restaurantList.map((restaurant) => (
                    <RestaurantCard {...restaurant} key={restaurant._id} />
                ))}
            </div>
        </>
    );
};

export default Delivery;