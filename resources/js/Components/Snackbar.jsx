import React, { useState, useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { usePage } from '@inertiajs/react';

export default function SnackbarComponent() {
	const { flash } = usePage().props;
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState('success');

	useEffect(() => {
		if (flash.success) {
			setMessage(flash.success);
			setSeverity('success');
			setOpen(true);
		} else if (flash.error) {
			setMessage(flash.error);
			setSeverity('error');
			setOpen(true);
		}
	}, [flash.success, flash.error]);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
		>
			<Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
} 