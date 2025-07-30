import { Button } from '@mui/material';

export default function PrimaryButton({
    className = "",
    disabled,
    children,
    sx,
    ...props
}) {
    return (
        <Button
            {...props}
            variant="contained"
            disabled={disabled}
            sx={{
                backgroundColor: '#6366f1',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                textTransform: 'none',
                backgroundColor: '#4f46e5',
                outlineOffset: '2px',
                ...sx
            }}
        >
            {children}
        </Button>
    );
};
