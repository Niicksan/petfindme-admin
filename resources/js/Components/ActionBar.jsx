import { useState } from 'react';
import { router } from '@inertiajs/react';
import {
	Box,
	Button,
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ActionBar({
	backUrl,
	backLabel = 'Back',
	actions = [],
	onBackClick
}) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleBackClick = () => {
		if (onBackClick) {
			onBackClick();
		} else if (backUrl) {
			router.get(backUrl);
		}
	};

	const handleMenuClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleActionClick = (action) => {
		handleMenuClose();
		if (action.onClick) {
			action.onClick();
		}
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
			<Button
				variant="outlined"
				startIcon={<ArrowBackIcon sx={{ mr: 0 }} />}
				onClick={handleBackClick}
				size={isMobile ? 'small' : 'medium'}
			>
				{backLabel}
			</Button>

			{actions.length > 0 && (
				<>
					{/* Desktop/Tablet: Show buttons */}
					{!isMobile && (
						<Box sx={{ display: 'flex', gap: 2 }}>
							{actions?.map((action, index) => (
								<Button
									key={index}
									variant={action.variant || 'contained'}
									color={action.color || 'primary'}
									startIcon={action.startIcon}
									onClick={action.onClick}
									disabled={action.disabled}
								>
									{action.label}
								</Button>
							))}
						</Box>
					)}

					{/* Mobile: Show three-dot menu */}
					{isMobile && (
						<>
							<IconButton
								aria-label="more actions"
								aria-controls={open ? 'action-menu' : undefined}
								aria-haspopup="true"
								aria-expanded={open ? 'true' : undefined}
								onClick={handleMenuClick}
								color="primary"
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="action-menu"
								anchorEl={anchorEl}
								open={open}
								onClose={handleMenuClose}
								MenuListProps={{
									'aria-labelledby': 'action-menu-button',
								}}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
							>
								{actions?.map((action, index) => {
									const actionColor = action.color || 'primary';
									const colorValue = theme.palette[actionColor]?.main || theme.palette.text.primary;

									return (
										<MenuItem
											key={index}
											onClick={() => handleActionClick(action)}
											disabled={action.disabled}
										>
											{action.startIcon && (
												<ListItemIcon sx={{ minWidth: 36, color: colorValue }}>
													{action.startIcon}
												</ListItemIcon>
											)}
											<ListItemText sx={{ color: colorValue }}>
												{action.label}
											</ListItemText>
										</MenuItem>
									);
								})}
							</Menu>
						</>
					)}
				</>
			)}
		</Box>
	);
};