
import React from 'react';
import next from "../arrow.png"
import '../App.css';
import { useNavigate } from 'react-router-dom';
export default function Home(props) {
    let cities = ['Bangalore', 'Kochi', 'Hyderabad', "Chennai", "Dehradun",  "Indore", "Jaipur", "Jodhpur", "Lucknow", "Madurai", "Mumbai", "Varanasi"];
    const navigate = useNavigate();


    const fetchData = async (c) => {
        const api = '3acc32822871b3b8f3da2bbb29a3dad1';

        let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${c}&appid=${api}`);
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
            <div className='content'>
                <div className="des" style={{ margin: "0px 100px", paddingTop: "20px", alignContent: "center", fontSize: "20px" }}>
                    The application provides users with real-time and future weather information for a specified location.
                    <br />
                    Current Conditions: The application displays the current weather conditions, including temperature, humidity, wind speed, and direction. It may also provide information on atmospheric pressure and sealevel.
                    <br />

                    Hourly Forecast: Users can view the weather forecast for the next few hours, including temperature changes and atmospheric details.
                    <br />
                </div>
                <div className="desc" style={{ marginLeft: "400px", padding: "20px 0px" }}><h2>Know Weather from Popular cities</h2></div>
                <div className="container" key={cities[0]}>
                    {
                        cities.map(c => {
                            return <div className='city'>

                                <img style={{ marginTop: "3px" }} src={require(`../images/${c}.jpg`)} width="200px" height="70px" alt="" onClick={() => {
                                    fetchData(c);
                                }}
                                ></img>
                                <div className='direct' onClick={() => {
                                        fetchData(c);
                                    }}>
                                    <p style={{ paddingLeft: "20px" }} >{c}</p>
                                    <img src={next} width="20px" height="20px" alt=""/>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
};
