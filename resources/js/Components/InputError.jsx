import { Typography } from "@mui/material";

export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <Typography
            {...props}
            component={"p"}
            sx={{ color: '#d32f2f', textAlign: 'left', pt: 1 }}>
            {message}
        </Typography>
    ) : null;
}
