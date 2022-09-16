import WeatherData from "./WeatherData";

const API_URL = "https://api.openweathermap.org/data/2.5/weather";
const ICON_URL = "https://openweathermap.org/img/wn/${icon}${size}.png";

export enum UnitType {
    Standard = "standard",
    Metric = "metric",
    Imperial = "imperial"
}

export interface CurrentWeatherOptions {
    city?: string;
    latitude?: number;
    longitude?: number;
    key: string;
    lang?: string;
    units?: UnitType;
}

class OpenWeatherService {
    currentWeather({ city, latitude, longitude, key, lang, units }: CurrentWeatherOptions): Promise<WeatherData> {
        const url = new URL(API_URL);
        if (city) {
            url.searchParams.append("q", city);
        }
        if (!city && latitude) {
            url.searchParams.append("lat", latitude.toString());
        }
        if (!city && longitude) {
            url.searchParams.append("lon", longitude.toString());
        }
        if (key) {
            url.searchParams.append("appid", key);
        }
        if (lang) {
            url.searchParams.append("lang", lang);
        }
        if (units) {
            url.searchParams.append("units", units);
        }
        console.debug(`[OpenWeatherService] Fetch weather`, url.toString());
        return fetch(url.toString()).then((result) => {
            return result.json();
        })
    }

    /**
     *
     * @param icon code
     * @param size 1, 2, 4
     */
    getIconUrl(icon: string, size = 1) {
        const iconSize = this.getIconSize(size);
        return ICON_URL.replace("${icon}", icon).replace("${size}", iconSize);
    }

    getIconSize(size = 1) {
        switch (size) {
            case 2:
                return "@2x";
            case 4:
                return "@4x";
            case 1:
            default:
                return "";
        }
    }
}

const openWeatherService = new OpenWeatherService();
export default openWeatherService;
