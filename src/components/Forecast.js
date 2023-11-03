import React from 'react';
import '../App.css';
import { useLocation } from 'react-router-dom';
import foggyVideo from "../images/fogvideo.mp4"
export default function Forecast() {
    let icons = ["Sunny", "Windy", "Clouds", "Rain", "Stormy", "Mist", "Smoke", 'Clear', "Haze"];
    const location = useLocation();
    const data = location.state;
    const current = data.current;
    const hourdata = data.hourdata;
    const nextday = data.nextday;
    let date = new Date(1000 * current.sys.sunrise);
    let sunset = new Date(1000 * current.sys.sunset);
    let keys = Object.keys(current.main);
    return (
        <>
            <video autoPlay loop muted>
                <source src={foggyVideo} type="video/mp4" />
            </video>
            <div className="body">

                <div className="left">
                    <div className="cur">
                        <div className="temp">
                            <div className="top1">
                                {current.name}
                            </div>
                            <div className="top2">
                                <div className="degrees">
                                    <h1>{(current.main.temp - 273.15).toFixed(2)}°C</h1>
                                    <p>{current.weather[0].description}</p>
                                </div>
                                <div className="logo" key='on'>
                                    {icons.map((icon) => {
                                        if (icon === current.weather[0].main)
                                            return <img src={require(`../${icon}.png`)} width="100px" height="100px" alt="" />
                                        else if (icon === (current.weather[0].description))
                                            return <img src={require(`../${icon}.png`)} width="100px" height="100px" alt="" />

                                    })}
                                </div>
                            </div>
                            <div className="top3">
                                <li>feels_like : {current.main.feels_like}"C</li>
                                <li>humidity : {current.main.humidity}"%</li>
                                <li>Wind : {((current.wind.speed)*5/18).toFixed(3)} Kmph</li>
                            </div>

                        </div>
                        <div className="details">
                            <div className="dleft">
                                <li>Description : {current.weather[0].main}</li>
                                <li>Temp_Max : {(current.main.temp_max - 273.15).toFixed(2)}°C</li>
                                <li>Temp_Min : {(current.main.temp_min - 273.15).toFixed(2)}°C</li>
                                <li>Pressure :  {current.main.pressure}hPa</li>
                                {
                                    keys.map(c => {
                                        if(c === "sea_level"){
                                        return <div className='kr'>
                                            <li>Sea_Level :{current.main.sea_level}hpa</li>
                                            <li>Ground_level : {current.main.grnd_level}hPa</li>
                                        </div>
                                        }
                                    })
                                }



                            </div>
                            <div className="dright">
                                <li>Clouds : {current.clouds.all}%</li>
                                <li>Sunrise : {(date.getHours() > 12 ? date.getHours() % 12 : date.getHours()) + ":" + (date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes()) + (date.getHours() > 12 ? " PM" : " AM")}</li>
                                <li>Sunset : {(sunset.getHours() > 12 ? sunset.getHours() % 12 : sunset.getHours()) + ":" + (sunset.getMinutes() > 9 ? sunset.getMinutes() : "0" + sunset.getMinutes()) + (sunset.getHours() > 12 ? " PM" : " AM")}</li>
                                <li>Wind_Gust : {(current.wind.gust * 5 / 18).toFixed(1)} Kmph</li>
                                <li>Wind_Deg : {current.wind.deg}° </li>
                            </div>
                        </div>
                    </div>
                    <div className="hourly">
                        <div className="hourlytelecast">
                            Hourly Telecast
                        </div>
                        <div className="hourcards">
                            <div className="card">
                                <div className="desc" >Sky</div>
                                <div className="deg" style={{paddingTop:"4px",fontSize:"26px"}}>Temp</div>
                                <div className="time">Time</div>
                            </div>
                            {
                                hourdata.map((hour) => {
                                    return <div className="card1">
                                        <div className="desc">{hour.weather[0].main}</div>
                                        <img src={require(`../${hour.weather[0].main}.png`)} width='40px' height='40px' alt="" />
                                        <div className="deg">{(hour.main.temp - 273.15).toFixed(1)}°C</div>
                                        <div className="time">{new Date(hour.dt_txt).getHours()>12 ? (new Date(hour.dt_txt).getHours()%12 + " PM") : (new Date(hour.dt_txt).getHours() + " AM")} </div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                    <div className="tmrw">
                        <div className="ttelecast">Tommorow's Telecast</div>

                        <div className="tbody">
                            <div className="tleft">
                                <div className="telecast">
                                    <li>{current.name}</li>
                                    <h5>{(nextday.main.temp - 273.15).toFixed(1)}°C</h5>
                                    <li>Description: {nextday.weather[0].description}</li>
                                </div>
                                <div className='imag'>
                                    {icons.map((icon) => {
                                        if (icon === nextday.weather[0].main)
                                            return <img src={require(`../${icon}.png`)} width="100px" height="100px" alt="" />
                                    })}
                                </div>
                                <div className="stelecast">
                                    <li>Temp_max: {(nextday.main.temp_max - 273.15).toFixed(1)}°C</li>
                                    <li>Temp_min: {(nextday.main.temp_min - 273.15).toFixed(1)}°C</li>
                                    <li>Sea Level:{nextday.main.sea_level}hPa</li>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}