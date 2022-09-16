import { Box, Paper } from "@mui/material";
import { useEffect, useRef } from "react";
import { map, tileLayer, marker, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import WeatherData from "../service/WeatherData";
import openWeatherService from "../service/openWeatherService";

interface MapViewProps {
    weatherData: WeatherData;
}

export default function MapView(props: MapViewProps) {

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            const { coord, weather } = props.weatherData;
            const [ weatherItem ] = weather;
            const mapView = map("map-view").setView([ coord.lat, coord.lon ], 12);
            tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapView);
            const markerIcon = icon({ iconUrl: openWeatherService.getIconUrl(weatherItem.icon) });
            marker([ coord.lat, coord.lon ], {
                title: weatherItem.description,
                icon: markerIcon
            }).addTo(mapView);
            initialized.current = true;
        }
    }, []);

    return (
        <Paper sx={{ marginTop: "16px" }} elevation={0}>
            <Box id="map-view" sx={{ height: "300px" }}>
            </Box>
        </Paper>
    );
}
