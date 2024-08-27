import { NavLink, Outlet } from "react-router-dom";

import Header from "./Header";

export default function Root() {
    //const Events =
    
    return (
    <div>
        <div className="header-container">
            <Header/>
            <div className="navbar">
                {/* <ul> */}
                     <NavLink to="/">Home</NavLink>
                {/* </ul> */}
            </div>
            <Outlet/>
        </div>
    </div>
    ) 
    
}