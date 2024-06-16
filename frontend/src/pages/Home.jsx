import React from "react";
import { useNavigate } from "react-router-dom";
const Home = ()=>{
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={()=>navigate("/tree-species")}>Tree Species</button>
            <button onClick={()=>navigate("/tree-count")}>Tree Count</button>
        </div>
    )
}

export default Home;