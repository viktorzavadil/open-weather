const DEFAULT_CITY = "Kladno";
const LOCAL_STORAGE_KEY = "weather.city";

class CityService {
    getDefaultCity() {
        console.debug("[CityService] Default city loaded");
        return window.localStorage && window.localStorage.getItem(LOCAL_STORAGE_KEY) || DEFAULT_CITY;
    }

    setDefaultCity(city: string) {
        if (window.localStorage) {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, city);
        }
    }

    isLocalStorageAvailable() {
        return !!window.localStorage;
    }
}

const cityService = new CityService();
export default cityService;
