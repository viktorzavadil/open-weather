import { TableCell, TableRow } from "@mui/material";

interface WeatherTableRowProps {
    title: string;
    value: string;
}

export default function WeatherTableRow(props: WeatherTableRowProps) {
    return (
        <TableRow key={props.title}>
            <TableCell component="th" scope="row">
                {props.title}
            </TableCell>
            <TableCell>
                {props.value}
            </TableCell>
        </TableRow>
    );
}
