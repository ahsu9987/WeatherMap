import Card from "react-bootstrap/Card";
import "../Component/Weather.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import searchicon from "./Asset/search.png";
import Image from "react-bootstrap/Image";
import humidity from "./Asset/humidity.png";
import wind from "./Asset/wind.png"
import { Container } from "react-bootstrap";
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import close from './Asset/close.png'
import weatherhome from './Asset/weatherhome.png'

const api_key = process.env.REACT_APP_API_KEY;

function Weather (){
    const [searchcity, setSearchcity] = useState("");
    const [weather , setWeather] = useState (null);

    const searchpressed =  () => {
        if (!searchcity) {
            // If searchcity is empty, don't make the API call
            return;
        }


        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchcity}&units=metric&appid=${api_key}`)
        .then(res => res.json())
        .then((result) =>{
            setWeather(result);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const clearWeather = () => {
        setWeather(null);
        setSearchcity("");
    }

    return (
        <>
            <Container>
                <h1 className="text-center mt-5 text-light">WEATHER-APP</h1>
                <Card  className="maincard   p-1">
                    <InputGroup className="mb-3 p-4 ">
                        <Form.Control
                            border="primary"
                            placeholder="Search..."
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            className="input-section"
                            value={searchcity}
                            onChange={(e) => setSearchcity(e.target.value) }  
                        />
                     
                            <Button variant="outline-light" onClick={searchpressed}  style={{ borderRadius: "60px", marginLeft: "10px" }}><Image src={searchicon}  /></Button>
                            <Button variant="outline-danger" onClick={clearWeather} style={{ borderRadius: "60px", marginLeft: "10px" }}><Image src={close}  /></Button>
                    </InputGroup>

                   
                    {weather && (
                        <>
                            <Container>
                                <Card.Img variant="top" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} style={{height:'8rem', width:'8rem',margin:'auto', display:'flex', justifyContent:'center'}} />
                            </Container>
                            <Container className="weather-location text-black">{weather.weather[0].main}</Container>
                            <Container className="weather-temp  text-black weather-temp">{weather.main.temp}°C</Container>
                            <Container className="weather-location text-black">{weather.name}</Container>

                            <Card.Body className="bodycard mt-3 lastfooter" >
                                <Card.Text style={{ display: "flex" }}>
                                    <Card.Img variant="top" src={humidity} className="ms-2 me-2" style={{ height: "50px", width: "50px" }} />
                                    <Card.Text className="text-black humdity-percent">
                                        {weather.main.humidity}%<br></br>
                                        <span style={{ fontSize: "13px" }} >Humidity</span>
                                    </Card.Text>
                                </Card.Text>
                                <Card.Text style={{ display: "flex" }}>
                                    <Card.Img variant="top" src={wind} className="ms-2 me-2" style={{ height: "50px", width: "50px" }} />
                                    <Card.Text className="text-black Wind-rate">
                                        {weather.wind.speed}km/h<br></br>
                                        <span style={{ fontSize: "13px" }} >Wind Speed</span>
                                    </Card.Text>  
                                </Card.Text>
                            </Card.Body>
                        </>
                    )}

{!weather && (
                        <Container>
                            <Image src={weatherhome} fluid  className="cloud-img mt-3"/>
                        </Container>
                    )}
                </Card>
            </Container>
        </>
    );
}

export default Weather;
