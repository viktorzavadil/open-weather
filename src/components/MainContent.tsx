import { useEffect, useRef, useState } from "react";
import cityService from "../service/cityService";
import WeatherData from "../service/WeatherData";
import openWeatherService, { UnitType } from "../service/openWeatherService";
import { Alert, Box, Container } from "@mui/material";
import LocationForm from "./LocationForm";
import WeatherTable from "./WeatherTable";
import MapView from "./MapView";

interface MainContentProps {
    onLoadingChange: (state: boolean) => void;
}

interface Error {
    message?: string;
}

export default function MainContent(props: MainContentProps) {
    const [ city, setCity ] = useState(cityService.getDefaultCity);
    const [ weatherData, setWeatherData ] = useState<WeatherData | null>();
    const [ error, setError ] = useState<Error | null>();
    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            fetchWeather(city);
        }
    }, []);

    const handleCity = (city: string) => {
        console.debug("[MainContent] City changed", city);
        setCity(city);
        setWeatherData(null);
        setError(null);
        cityService.setDefaultCity(city);
        fetchWeather(city);
    };

    const fetchWeather = (city: string) => {
        props.onLoadingChange(true);
        setTimeout(() => {
            console.debug("[MainContent] Fetching data", city);
            openWeatherService
                .currentWeather({ city, key: "058654ddce9d980e3f2d3e84f1a3f2dc", units: UnitType.Metric })
                .then((weatherData) => {
                    props.onLoadingChange(false);
                    setWeatherData(weatherData);
                }, (error) => {
                    props.onLoadingChange(false);
                    setError(error);
                });
        }, 1000);
    }

    const renderContent = () => {
        if (error) {
            return (
                <Alert severity="error">{error.message || "Something went wrong"}</Alert>
            );
        } else if (weatherData && weatherData.message && weatherData.cod > 299) {
            return (
                <Alert severity="error">{weatherData.cod}: {weatherData.message}</Alert>
            );
        } else if (weatherData) {
            return (
                <Box>
                    <WeatherTable weatherData={weatherData}></WeatherTable>
                    <MapView weatherData={weatherData}></MapView>
                </Box>
            );
        }
    }

    return (
        <Container maxWidth="sm">
            <LocationForm city={city}
                          onCityChange={handleCity}></LocationForm>
            <Box sx={{ marginTop: "16px" }}>
                {renderContent()}
            </Box>
        </Container>
    );
}
