import { router } from '@inertiajs/react';
import {
	Box,
	Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function ActionBar({
	backUrl,
	backLabel = 'Back',
	actions = [],
	onBackClick
}) {
	const handleBackClick = () => {
		if (onBackClick) {
			onBackClick();
		} else if (backUrl) {
			router.get(backUrl);
		}
	};

	return (
		<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
			<Button
				variant="outlined"
				startIcon={<ArrowBackIcon sx={{ mr: 0 }} />}
				onClick={handleBackClick}
			>
				{backLabel}
			</Button>

			{actions.length > 0 && (<Box sx={{ display: 'flex', gap: 2 }}>
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
			</Box>)}
		</Box>
	);
};