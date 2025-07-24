import { Head, router } from '@inertiajs/react';
import {
	Box,
	Paper,
	Typography,
	Button,
	Divider,
	Grid,
	Card,
	CardContent,
	Chip,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import SecurityIcon from '@mui/icons-material/Security';
import GppGoodIcon from '@mui/icons-material/GppGood';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

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

	return (
		<>
			<Head title={`User - ${user.name}`} />

			<Box sx={{ p: 2 }}>
				{/* Header */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
					<Button
						variant="outlined"
						startIcon={<ArrowBackIcon sx={{ mr: 0 }} />}
						onClick={() => router.get('/users')}
					>
						Back to Users
					</Button>

					<Box sx={{ display: 'flex', gap: 2 }}>
						<Button
							variant="contained"
							color="primary"
							startIcon={<EditIcon sx={{ mr: 0 }} />}
							onClick={() => console.log('Edit user:', user)}
						>
							Edit User
						</Button>

						<Button
							variant="contained"
							color="error"
							startIcon={<DeleteIcon sx={{ mr: 0 }} />}
							onClick={handleDelete}
						>
							Delete User
						</Button>
					</Box>
				</Box>

				{/* User Details Card */}
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
							<PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
							<Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
								{user.name}
							</Typography>
						</Box>

						<Divider sx={{ my: 2 }} />

						<Grid container spacing={1} sx={{ display: 'flex', flexDirection: 'column' }}>
							{/* Email Info */}
							<Grid item xs={12} md={12}>
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
							<Grid item xs={12} md={12}>
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
							<Grid item xs={12} md={12}>
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
							<Grid item xs={12} md={12}>
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
				<Card>
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
								<Grid item xs={12} sm={6}>
									<Typography variant="subtitle2" color="text.secondary">
										User ID
									</Typography>
									<Typography variant="body1">
										#{user.id}
									</Typography>
								</Grid>
								<Grid item xs={12} sm={6}>
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
} 