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
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SubjectIcon from '@mui/icons-material/Subject';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

export default function ContactsPreview({ contact }) {
	const {
		modalState,
		closeModal,
		confirmContactDelete,
		handleConfirm
	} = useConfirmationModal();

	const handleDelete = () => {
		confirmContactDelete(contact);
	};

	return (
		<>
			<Head title={`Contact - ${contact.subject}`} />

			<Box sx={{ p: 2 }}>
				{/* Header */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
					<Button
						variant="outlined"
						startIcon={<ArrowBackIcon />}
						onClick={() => router.get('/contacts')}
					>
						Back to Emails
					</Button>

					<Button
						variant="contained"
						color="error"
						startIcon={<DeleteIcon />}
						onClick={handleDelete}
					>
						Delete Email
					</Button>
				</Box>

				{/* Contact Details Card */}
				<Card sx={{ mb: 3 }}>
					<CardContent>
						<Typography variant="h5" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
							{contact.subject}
						</Typography>

						<Divider sx={{ my: 2 }} />

						<Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
							{/* Sender Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 0, mt: 1 }}>
									<PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="body1" fontWeight="bold" sx={{ minWidth: '50px' }}>
										From:
									</Typography>
									<Typography variant="body2" sx={{ ml: 1, }}>
										{contact.name}
									</Typography>
								</Box>
							</Grid>

							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 0, mt: 1 }}>
									<EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="body1" fontWeight="bold" sx={{ minWidth: '50px' }}>
										Email:
									</Typography>
									<Typography variant="body2" sx={{ ml: 1 }}>
										{contact.email}
									</Typography>
								</Box>
							</Grid>

							{/* Date Info */}
							<Grid>
								<Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
									<ScheduleIcon sx={{ mr: 1, color: 'primary.main' }} />
									<Typography variant="body1" fontWeight="bold" sx={{ minWidth: '50px' }}>
										Date:
									</Typography>
									<Typography variant="body2" sx={{ ml: 1 }}>
										{contact.created_at}
									</Typography>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>

				{/* Message Content */}
				<Card>
					<CardContent>
						<Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
							<SubjectIcon sx={{ mr: 1, color: 'primary.main' }} />
							<Typography variant="h6">
								Message
							</Typography>
						</Box>

						<Paper
							variant="outlined"
							sx={{
								p: 3,
								backgroundColor: '#fafafa',
								minHeight: '200px',
								whiteSpace: 'pre-wrap'
							}}
						>
							<Typography variant="body1" sx={{ lineHeight: 1.6 }}>
								{contact.message}
							</Typography>
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