import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';
export default function Navbar() {
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const api = '3acc32822871b3b8f3da2bbb29a3dad1';

        let city = document.getElementsByClassName('cityInput')[0].value;

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`);
        let dat = await res.json();
        const lat = dat.coord.lat;
        const lon = dat.coord.lon;


        let hour = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`);
        let hourly = await hour.json();

        let curdate = new Date(hourly.list[0].dt_txt);

        let cd = curdate.getDate();
        let hr = hourly.list.filter((hour) => {
            return new Date(hour.dt_txt).getDate() === cd;
        });
        let tmr = hourly.list[hr.length + 1];
        let info = { "current": dat, "hourdata": hr, "nextday": tmr };
        navigate("/forecast", { state: info });
    }
    return (
        <>
            <div className='navbar'>

                <h3 id='title'>Weather Forecast</h3>
                <li><Link className='homebtn' id ="hmbtn" to="/">Home </Link></li>
                <div className='search'>
                    <input className='cityInput' onChange={(e) => { e.preventDefault(); }} type='text'></input>
                    <li><Link class="searchbtn" onClick={handleClick} style={{ width: "30px" }} href="/forecast">Search </Link></li>

                </div>
            </div>
        </>
    )

}

