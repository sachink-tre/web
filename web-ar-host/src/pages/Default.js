import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './default.css'

function Default() {
    const navigate = useNavigate();

return (
    <div className="">
        <div className="default" >
        <p id="">{window.location.origin}</p>
        <button type="button" onClick={() => navigate('/currency')}>Currency</button>
        </div>
    </div>
);
}

export default Default