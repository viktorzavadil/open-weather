import { FormEvent, useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface LocationForm {
    city: string;
    onCityChange: (city: string) => void;
}

export default function LocationForm(props: LocationForm) {
    const [ city, setCity ] = useState(props.city);

    const handleSubmit = (event: FormEvent) => {
        console.debug("[LocationForm] handle submit", city);
        event.preventDefault();
        props.onCityChange(city);
    }

    return (
        <form onSubmit={handleSubmit}>
            <Box sx={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center"
            }}>
                <TextField sx={{ width: "100%" }}
                           variant="standard"
                           size="small"
                           label="City" type="text" value={city} name="city"
                           onChange={(event) => setCity(event.target.value)}/>
                <Button sx={{ minWidth: "150px", marginLeft: "16px" }}
                        variant="contained"
                        type="submit">Load weather</Button>
            </Box>
        </form>
    );
}
