import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, error, helperText, sx, password, ...props },
    ref,
) {
    const localRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <OutlinedInput
            {...props}
            type={showPassword ? 'text' : type}
            variant="outlined"
            fullWidth
            error={!!error}
            ref={localRef}
            sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.9)',
                },
                '& .MuiInputBase-input': {
                    color: 'white',
                },
                '& .MuiOutlinedInput-input': {
                    height: '1.8rem',
                },
                ...sx
            }}
            endAdornment={password ? (
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff sx={{ color: 'white' }} /> : <Visibility sx={{ color: 'white' }} />}
                    </IconButton>
                </InputAdornment>
            ) : null}
        />
    );
});
