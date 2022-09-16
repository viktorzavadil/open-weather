import WeatherData from "../service/WeatherData";
import moment from "moment";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import WeatherTableRow from "./WeatherTableRow";

interface WeatherStatsProps {
    weatherData: WeatherData
}

export default function WeatherTable({ weatherData: data }: WeatherStatsProps) {
    const toDate = (dateSec: number) => {
        return moment(dateSec * 1000).format('LTS');
    };

    const windDirectionEmoji = (val: number) => {
        return "⬇↙↙⬅⬅↖↖⬆⬆↗↗➡➡↘↘⬇".charAt(Math.floor(val / WeatherTable.DEGREES_STEP));
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="weather statistics">
                <TableHead>
                    <WeatherTableRow title={data.name}
                                     value={`${data.main.temp} °C (feels like ${data.main.feels_like} °C)`}></WeatherTableRow>
                </TableHead>
                <TableBody>
                    <WeatherTableRow title="Description" value={data.weather[ 0 ].description}></WeatherTableRow>
                    <WeatherTableRow title="Humidity" value={`${data.main.humidity} %`}></WeatherTableRow>
                    <WeatherTableRow title="Pressure" value={`${data.main.pressure} hPa`}></WeatherTableRow>
                    <WeatherTableRow title="Wind"
                                     value={`${windDirectionEmoji(data.wind.deg)} ${data.wind.speed} m/s`}></WeatherTableRow>
                    <WeatherTableRow title="Visibility" value={`${data.visibility} m`}></WeatherTableRow>
                    <WeatherTableRow title="Sunrise" value={`${toDate(data.sys.sunrise)}`}></WeatherTableRow>
                    <WeatherTableRow title="Sunset" value={`${toDate(data.sys.sunset)}`}></WeatherTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}

WeatherTable.DEGREES_STEP = 22.5;
