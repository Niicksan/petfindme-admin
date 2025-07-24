import React from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Typography,
} from '@mui/material';

export default function ConfirmationModal({
	open,
	onClose,
	onConfirm,
	title,
	message,
	confirmText = 'Confirm',
	cancelText = 'Cancel',
	severity = 'warning',
}) {
	const getColor = () => {
		switch (severity) {
			case 'error':
				return 'error';
			case 'warning':
				return 'warning';
			case 'success':
				return 'success';
			default:
				return 'primary';
		}
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			aria-labelledby="confirmation-dialog-title"
			aria-describedby="confirmation-dialog-description"
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle id="confirmation-dialog-title">
				<Typography variant="h6" component="div">
					{title}
				</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="confirmation-dialog-description">
					{message}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="inherit">
					{cancelText}
				</Button>
				<Button onClick={onConfirm} color={getColor()} variant="contained" autoFocus>
					{confirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
} 