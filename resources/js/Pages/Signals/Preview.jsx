import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from 'react-image-gallery';
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
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CategoryIcon from '@mui/icons-material/Category';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DescriptionIcon from '@mui/icons-material/Description';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';
import ActionBar from '@/Components/ActionBar';
import { Map } from '@/Components/Map';

export default function SignalsPreview({ signal, images: signalImages }) {
	const images = [];
	const zoom = 17;
	const height = '400px';
	const position = [
		signal?.geolocation?.latitude || 42.798165,
		signal?.geolocation?.longitude || 25.6275174
	];
	const coords = {
		latitude: signal?.geolocation?.latitude,
		longitude: signal?.geolocation?.longitude
	};

	const {
		modalState,
		closeModal,
		confirmSignalAction,
		handleConfirm
	} = useConfirmationModal();

	for (let i = 0; i < signalImages?.length; i++) {
		const image = {
			original: `/storage/${signalImages[i]?.path}`,
			thumbnail: `/storage/${signalImages[i]?.path}`,
			fullscreen: `/storage/${signalImages[i]?.path}`,
		};

		images.push(image);
	}

	const getStatusColor = (status) => {
		switch (status) {
			case 'Активен':
				return 'success';
			case 'Изчакващ':
				return 'warning';
			case 'Архивиран':
				return 'secondary';
			case 'Изтрит':
				return 'error';
			default:
				return 'default';
		}
	};

	const getStatusIcon = (status) => {
		switch (status) {
			case 'Активен':
				return <CheckCircleIcon />;
			case 'Изчакващ':
				return <PendingIcon />;
			case 'Архивиран':
				return <ArchiveIcon />;
			case 'Изтрит':
				return <CancelIcon />;
			default:
				return <PendingIcon />;
		}
	};

	const actionButtons = [
		{
			label: 'Edit Signal',
			color: 'primary',
			startIcon: <EditIcon sx={{ mr: 0 }} />,
			onClick: () => router.get(`/signals/edit/${signal.id}?from=preview`)
		},
		...(signal.status.name === 'Активен' ? [{
			label: 'Deactivate',
			color: 'warning',
			startIcon: <VisibilityOffIcon sx={{ mr: 0 }} />,
			onClick: () => confirmSignalAction('deactivate', signal)
		}] : [{
			label: 'Activate',
			color: 'success',
			startIcon: <VisibilityIcon sx={{ mr: 0 }} />,
			onClick: () => confirmSignalAction('activate', signal)
		}]),
		{
			label: 'Archive',
			color: 'secondary',
			startIcon: <ArchiveIcon sx={{ mr: 0 }} />,
			onClick: () => confirmSignalAction('archive', signal)
		},
		{
			label: 'Delete',
			color: 'error',
			startIcon: <DeleteIcon sx={{ mr: 0 }} />,
			onClick: () => confirmSignalAction('delete', signal)
		}
	];

	return (
		<>
			<Head title={`Signal - ${signal.title}`} />

			<Box sx={{ p: 2, mt: 2 }}>
				{/* Header */}
				<ActionBar
					backUrl="/signals"
					backLabel="Back to Signals"
					actions={actionButtons}
				/>

				<Grid container spacing={3} sx={{ display: 'flex', flexDirection: 'column', maxWidth: 800, mx: 'auto' }}>
					{/* Signal Details Card */}
					<Grid>
						{/* Images Gallery */}
						<Grid>
							<Card sx={{ mb: 2 }}>
								<CardContent>
									{images.length > 0 ? (
										<ReactImageGallery
											showBullets={true}
											showPlayButton={false}
											showIndex={true}
											items={images}
										/>
									) : (
										<Paper
											variant="outlined"
											sx={{
												p: 4,
												textAlign: 'center',
												backgroundColor: '#fafafa',
												height: 200,
												display: 'flex',
												alignItems: 'center',
												justifyContent: 'center'
											}}
										>
											<Typography variant="body1" color="text.secondary">
												No images available for this signal
											</Typography>
										</Paper>
									)}
								</CardContent>
							</Card>
						</Grid>

						{/* Signal Details Card */}
						<Card sx={{ mb: 2 }}>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<PetsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
									<Typography variant="h5" sx={{ color: 'primary', fontWeight: 'bold' }}>
										{signal.title}
									</Typography>
								</Box>

								<Divider sx={{ my: 2 }} />

								<Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
									{/* Status */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<CheckCircleIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												Status:
											</Typography>
											<Chip
												icon={getStatusIcon(signal.status.name)}
												label={signal.status.name}
												color={getStatusColor(signal.status.name)}
												variant="outlined"
												sx={{ ml: 2 }}
											/>
										</Box>
									</Grid>

									{/* Category */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<CategoryIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												Category:
											</Typography>
											<Typography variant="body1" sx={{ ml: 2 }}>
												{signal.category?.name || 'No category'}
											</Typography>
										</Box>
									</Grid>

									{/* City */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<LocationOnIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												City:
											</Typography>
											<Typography variant="body1" sx={{ ml: 2 }}>
												{signal.city?.name || 'No city'}
											</Typography>
										</Box>
									</Grid>

									{/* Contact Name */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												Contact:
											</Typography>
											<Typography variant="body1" sx={{ ml: 2 }}>
												{signal.contact_name || 'No contact name'}
											</Typography>
										</Box>
									</Grid>

									{/* Phone */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												Phone:
											</Typography>
											<Typography variant="body1" sx={{ ml: 2 }}>
												{signal.phone || 'No phone'}
											</Typography>
										</Box>
									</Grid>

									{/* User */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												User:
											</Typography>
											<Typography variant="body1" sx={{ ml: 2 }}>
												{signal.user?.name || 'No user'} ({signal.user?.email || 'No email'})
											</Typography>
										</Box>
									</Grid>

									{/* Created Date */}
									<Grid>
										<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
											<ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
											<Typography variant="subtitle2" component="span" sx={{ minWidth: '80px' }}>
												Created:
											</Typography>
											<Typography variant="body1" sx={{ ml: 2 }}>
												{signal.created_at}
											</Typography>
										</Box>
									</Grid>
								</Grid>
							</CardContent>
						</Card>

						{/* Description Card */}
						<Card sx={{ mb: 2 }}>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<DescriptionIcon sx={{ fontSize: 30, mr: 1, color: 'primary.main' }} />
									<Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 0 }}>
										Description
									</Typography>
								</Box>
								<Paper
									variant="outlined"
									sx={{
										p: 3,
										backgroundColor: '#fafafa',
										minHeight: '100px'
									}}
								>
									<Typography variant="body1">
										{signal.description || 'No description provided'}
									</Typography>
								</Paper>
							</CardContent>
						</Card>

						{/* Location Card */}
						<Card>
							<CardContent>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<LocationOnIcon sx={{ fontSize: 30, mr: 0.8, color: 'primary.main' }} />
									<Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 0 }}>
										Location
									</Typography>
								</Box>
								<Map coords={coords} mapPosition={position} mapHeight={height} mapZoom={zoom} editable={false} borderRadius={12} />
							</CardContent>
						</Card>
					</Grid>
				</Grid>
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