import React from 'react'
import { useLocation, useNavigate, useParams } from "react-router-dom";
import './default.css'

function Default() {
    const navigate = useNavigate();

return (
    <div className="">
        <div className="default" >
        <p id="">{window.location.origin}</p>
        <button type="button" onClick={() => navigate('/two')}>2MB</button>
        <button type="button" onClick={() => navigate('/four')}>4MB</button>
        <button type="button" onClick={() => navigate('/six')}>6MB</button>
        <button type="button" onClick={() => navigate('/eight')}>8.5MB</button>
        <button type="button" onClick={() => navigate('/ten')}>10MB</button>
        <button type="button" onClick={() => navigate('/twenty')}>19MB</button>
        </div>
    </div>
);
}

export default Default