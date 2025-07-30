import { FormLabel } from '@mui/material';

export default function InputLabel({
    value,
    className = '',
    children,
    ...props
}) {
    return (
        <FormLabel
            {...props}
            sx={{
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500,
                display: 'block',
                ...className
            }}
        >
            {value ? value : children}
        </FormLabel>
    );
};
