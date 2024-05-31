import React from "react";

import Navbar from "../components/Navbar/Navbar";
import FoodTab from "../components/FoodTab/FoodTab";

const HomePageLayout = 
    (Component) =>
			 ({...props}) => {
				return (
					<>
						<Navbar/>
						<FoodTab/>
						<Component {...props}/>
					</>
				)
			 }


export default HomePageLayout;			 