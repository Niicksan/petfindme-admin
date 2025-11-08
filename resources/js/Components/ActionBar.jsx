import { router } from '@inertiajs/react';
import {
	Box,
	Button,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ActionsMenu from '@/Components/ActionsMenu';

export default function ActionBar({
	backUrl,
	backLabel = 'Back',
	actions = [],
}) {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('md'));

	const handleBackClick = () => {
		router.get(backUrl);
	};

	const handleActionClick = (action) => {
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
						<ActionsMenu
							actions={actions}
							ariaLabel="more actions"
							menuId="action-menu"
							onActionClick={handleActionClick}
						/>
					)}
				</>
			)}
		</Box>
	);
};