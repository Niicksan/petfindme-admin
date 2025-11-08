import { useState } from 'react';
import {
	IconButton,
	Menu,
	MenuItem,
	ListItemIcon,
	ListItemText,
	useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ActionsMenu({
	actions = [],
	ariaLabel,
	menuId,
	anchorOrigin = {
		vertical: 'bottom',
		horizontal: 'right',
	},
	transformOrigin = {
		vertical: 'top',
		horizontal: 'right',
	},
	onActionClick,
	iconButtonProps = {},
	iconColor = 'primary',
	// Controlled mode props
	open: controlledOpen,
	anchorEl: controlledAnchorEl,
	onOpen,
	onClose,
}) {
	const theme = useTheme();
	const [internalAnchorEl, setInternalAnchorEl] = useState(null);

	// Use controlled props if provided, otherwise use internal state
	const isControlled = controlledOpen !== undefined;
	const anchorEl = isControlled ? controlledAnchorEl : internalAnchorEl;
	const open = isControlled ? controlledOpen : Boolean(internalAnchorEl);

	if (actions.length === 0) {
		return null;
	}

	const handleMenuClick = (event) => {
		event.stopPropagation();
		if (isControlled) {
			onOpen?.(event);
		} else {
			setInternalAnchorEl(event.currentTarget);
		}
	};

	const handleMenuClose = () => {
		if (isControlled) {
			onClose?.();
		} else {
			setInternalAnchorEl(null);
		}
	};

	// Extract onClick from iconButtonProps to avoid override
	const { onClick: customOnClick, ...restIconButtonProps } = iconButtonProps;

	const handleIconButtonClick = (event) => {
		handleMenuClick(event);
		// Call custom onClick from iconButtonProps if provided
		if (customOnClick) {
			customOnClick(event);
		}
	};

	return (
		<>
			<IconButton
				aria-label={ariaLabel}
				aria-controls={open ? menuId : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleIconButtonClick}
				color={iconColor}
				{...restIconButtonProps}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id={menuId}
				anchorEl={anchorEl}
				open={open}
				onClose={handleMenuClose}
				MenuListProps={{
					'aria-labelledby': `${menuId}-button`,
				}}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
			>
				{actions.map((action, index) => {
					// Handle color - can be a string (theme color name) or a direct color value
					let colorValue = theme.palette.text.primary;
					if (action.color) {
						if (typeof action.color === 'string' && theme.palette[action.color]) {
							colorValue = theme.palette[action.color]?.main || theme.palette.text.primary;
						} else if (typeof action.color === 'string' && action.color.includes('.')) {
							// Handle nested palette paths like 'warning.main'
							const [paletteKey, colorKey] = action.color.split('.');
							colorValue = theme.palette[paletteKey]?.[colorKey] || theme.palette.text.primary;
						} else {
							colorValue = action.color;
						}
					}

					const actionKey = action.key || action.label || index;
					const actionLabel = action.label || '';
					const actionIcon = action.icon || action.startIcon;

					return (
						<MenuItem
							key={actionKey}
							onClick={() => onActionClick(action, action.item)}
							disabled={action.disabled}
							sx={action.sx}
						>
							{actionIcon && (
								<ListItemIcon sx={{ minWidth: 36, color: colorValue }}>
									{actionIcon}
								</ListItemIcon>
							)}
							<ListItemText sx={{ color: colorValue }}>
								{actionLabel}
							</ListItemText>
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};