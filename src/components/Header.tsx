import { AppBar, LinearProgress, Toolbar, Typography, Box } from "@mui/material";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import React from "react";

interface HeaderProps {
    loading: boolean;
}

const Header: React.FunctionComponent<HeaderProps> = (props) => {
    return (
        <AppBar position="static" className="header">
            <Toolbar>
                <ThunderstormIcon/>
                <Typography variant="h6" component="h1" sx={{ flexGrow: 1, marginLeft: "16px" }}>
                    Actual Weather
                </Typography>
            </Toolbar>
            {props.loading ? <LinearProgress/> : <Box sx={{ height: "4px" }}>&nbsp;</Box>}
        </AppBar>)
}
export default Header;
