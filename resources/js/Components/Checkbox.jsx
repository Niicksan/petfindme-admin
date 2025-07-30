import { Checkbox as MuiCheckbox } from '@mui/material';

export default function Checkbox({ className = '', sx, ...props }) {
    return (
        <MuiCheckbox
            {...props}
            sx={{
                color: 'rgba(156, 163, 175, 0.5)',
                '&.Mui-checked': {
                    color: '#6366f1',
                },
                '&:hover': {
                    backgroundColor: 'rgba(99, 102, 241, 0.04)',
                },
                ...sx
            }}
        />
    );
}
