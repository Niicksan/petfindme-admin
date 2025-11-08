import { Head, router } from '@inertiajs/react';
import {
	Box,
	Paper,
	Typography,
	Divider,
	Grid,
	Card,
	CardContent,
	Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';
import ActionBar from '@/Components/ActionBar';

export default function UsersPreview({ user }) {
	const {
		modalState,
		closeModal,
		confirmUserDelete,
		handleConfirm
	} = useConfirmationModal();

	const handleDelete = () => {
		confirmUserDelete(user);
	};

	const getStatusColor = (status) => {
		return status === 'Active' ? 'success' : 'error';
	};

	const getStatusIcon = (status) => {
		return status === 'Active' ? <CheckCircleIcon /> : <CancelIcon />;
	};

	const actionButtons = [
		{
			label: 'Edit User',
			color: 'primary',
			startIcon: <EditIcon sx={{ mr: 0 }} />,
			onClick: () => router.get(`/users/edit/${user.id}?from=preview`)
		},
		{
			label: 'Delete User',
			color: 'error',
			startIcon: <DeleteIcon sx={{ mr: 0 }} />,
			onClick: handleDelete
		}
	];

	return (
		<>
			<Head title={`User - ${user.name}`} />

			<Box sx={{ p: 2 }}>
				{/* Header */}
				<ActionBar
					backUrl="/users"
					backLabel="Back to Users"
					actions={actionButtons}
				/>

				{/* User Details Card */}
				<Card sx={{ mb: 3, maxWidth: 800, mx: 'auto' }}>
					<CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
							<AccountCircleIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
							<Typography variant="h5" sx={{ color: 'primary', fontWeight: 'bold' }}>
								{user.name} ({user.email})
							</Typography>
						</Box>

						<Divider sx={{ my: 2 }} />

						<Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column' }}>
							{/* Name Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="h7" component="span" sx={{ minWidth: '60px' }}>
										Name:
									</Typography>
									<Typography variant="body1" sx={{ ml: 3 }}>
										{user.name}
									</Typography>
								</Box>
							</Grid>
							{/* Email Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="h7" component="span" sx={{ minWidth: '60px' }}>
										Email:
									</Typography>
									<Typography variant="body1" sx={{ ml: 3 }}>
										{user.email}
									</Typography>
								</Box>
							</Grid>

							{/* Role Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<SecurityIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="h7" component="span" sx={{ minWidth: '60px' }}>
										Role:
									</Typography>
									<Typography variant="body1" sx={{ ml: 3 }}>
										{user.role || 'No role assigned'}
									</Typography>
								</Box>
							</Grid>

							{/* Status Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>

									<GppGoodIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="h7" component="span" sx={{ minWidth: '60px' }}>
										Status:
									</Typography>
									<Chip
										icon={getStatusIcon(user.status)}
										label={user.status}
										color={getStatusColor(user.status)}
										variant="outlined"
										sx={{ ml: 3 }}
									/>
								</Box>
							</Grid>

							{/* Date Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="h7" component="span" sx={{ minWidth: '60px' }}>
										Created:
									</Typography>
									<Typography variant="body1" sx={{ ml: 3 }}>
										{user.created_at}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Additional Information Card */}
				<Card sx={{ maxWidth: 800, mx: 'auto' }}>
					<CardContent>
						<Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
							User Information
						</Typography>

						<Paper
							variant="outlined"
							sx={{
								p: 3,
								backgroundColor: '#fafafa',
								minHeight: '100px'
							}}
						>
							<Grid container spacing={2}>
								<Grid>
									<Typography variant="subtitle2" color="text.secondary">
										User ID
									</Typography>
									<Typography variant="body1">
										#{user.id}
									</Typography>
								</Grid>
								<Grid>
									<Typography variant="subtitle2" color="text.secondary">
										Account Type
									</Typography>
									<Typography variant="body1">
										{user.role === 'Admin' ? 'Administrator' : 'Regular User'}
									</Typography>
								</Grid>
							</Grid>
						</Paper>
					</CardContent>
				</Card>
			</Box>

			<ConfirmationModal
				open={modalState.open}
				onClose={closeModal}
				onConfirm={handleConfirm}
				title={modalState.title}
				message={modalState.message}
				confirmText={modalState.confirmText}
				severity={modalState.severity}
			/>
		</>
	);
};