import { useForm, Controller } from 'react-hook-form';
import { Head, router } from '@inertiajs/react';
import {
	Box,
	Paper,
	Typography,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function SignalEdit({ signal, categories, cities, statuses, errors = {} }) {
	const phoneRegex = new RegExp(/^\+?\d{5,13}$/);
	const {
		control,
		handleSubmit,
		formState: { errors: formErrors, isValid, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			title: signal.title || '',
			description: signal.description || '',
			contact_name: signal.contact_name || '',
			phone: signal.phone || '',
			geolocation: signal.geolocation ? JSON.stringify(signal.geolocation) : '',
			category_id: signal.category_id || '',
			city_id: signal.city_id || '',
			status_id: signal.status_id || '',
		},
	});

	const onSubmit = (data) => {
		// Parse geolocation if it's a valid JSON string
		const submitData = { ...data };
		if (submitData.geolocation) {
			try {
				submitData.geolocation = JSON.stringify(submitData.geolocation);

			} catch (error) {
				// If parsing fails, keep as string
				console.warn('Invalid geolocation JSON format');
			}
		}

		router.patch(`/signals/${signal.id}`, submitData);
	};

	const handleCancel = () => {
		router.get('/signals');
	};

	return (
		<>
			<Head title={`Edit Signal - ${signal.title}`} />
			<Box sx={{ p: 2, pb: 0 }}>
				{/* Header */}
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
					<Button
						variant="outlined"
						startIcon={<ArrowBackIcon />}
						onClick={() => router.get('/signals')}
					>
						Back to Signals
					</Button>
				</Box>
			</Box>
			<Box sx={{ p: 3, pt: 0, maxWidth: 800, mx: 'auto' }}>
				{/* Edit Form */}
				<Paper sx={{ p: 3 }}>
					<Typography variant="h4" gutterBottom sx={{ textAlign: 'center', py: 1 }}>
						Edit Signal
					</Typography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
							{/* Title */}
							<Controller
								name="title"
								control={control}
								rules={{
									required: 'Title is required',
									minLength: { value: 3, message: 'Title must be at least 3 characters long' },
									maxLength: { value: 255, message: 'Title must be less than 255 characters long' },
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Title"
										error={!!(formErrors.title || errors.title)}
										helperText={formErrors.title?.message || errors.title}
										required
									/>
								)}
							/>

							{/* Category */}
							<Controller
								name="category_id"
								control={control}
								rules={{ required: 'Category is required' }}
								render={({ field }) => (
									<FormControl fullWidth error={!!(formErrors.category_id || errors.category_id)}>
										<InputLabel>Category</InputLabel>
										<Select {...field} label="Category" required>
											{categories?.map((category) => (
												<MenuItem key={category.id} value={category.id}>
													{category.name}
												</MenuItem>
											))}
										</Select>
										{(formErrors.category_id || errors.category_id) && (
											<Typography variant="caption" color="error">
												{formErrors.category_id?.message || errors.category_id}
											</Typography>
										)}
									</FormControl>
								)}
							/>

							{/* City */}
							<Controller
								name="city_id"
								control={control}
								rules={{ required: 'City is required' }}
								render={({ field }) => (
									<FormControl fullWidth error={!!(formErrors.city_id || errors.city_id)}>
										<InputLabel>City</InputLabel>
										<Select {...field} label="City" required>
											{cities?.map((city) => (
												<MenuItem key={city.id} value={city.id}>
													{city.name}
												</MenuItem>
											))}
										</Select>
										{(formErrors.city_id || errors.city_id) && (
											<Typography variant="caption" color="error">
												{formErrors.city_id?.message || errors.city_id}
											</Typography>
										)}
									</FormControl>
								)}
							/>

							{/* Geolocation */}
							<Controller
								name="geolocation"
								control={control}
								rules={{ required: 'Geolocation is required' }}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Geolocation (JSON)"
										error={!!(formErrors.geolocation || errors.geolocation)}
										helperText={formErrors.geolocation?.message || errors.geolocation || "Enter coordinates as JSON (e.g., {'lat': 42.123, 'lng': 23.456})"}
										required
									/>
								)}
							/>

							{/* Contact Name */}
							<Controller
								name="contact_name"
								control={control}
								rules={{
									required: 'Contact name is required',
									minLength: { value: 3, message: 'Name must be at least 3 characters' },
									maxLength: { value: 255, message: 'Name must be less than 255 characters' },
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Contact Name"
										error={!!(formErrors.contact_name || errors.contact_name)}
										helperText={formErrors.contact_name?.message || errors.contact_name}
										required
									/>
								)}
							/>

							{/* Phone */}
							<Controller
								name="phone"
								control={control}
								rules={{
									required: 'Phone is required',
									pattern: {
										value: phoneRegex,
										message: 'Enter a valid phone number'
									},
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Phone"
										error={!!(formErrors.phone || errors.phone)}
										helperText={formErrors.phone?.message || errors.phone}
										required
									/>
								)}
							/>

							{/* Description */}
							<Controller
								name="description"
								control={control}
								rules={{
									required: 'Description is required',
									minLength: { value: 20, message: 'Description must be at least 20 characters long' },
									maxLength: { value: 3000, message: 'Description must be less than 3000 characters long' },
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Description"
										error={!!(formErrors.description || errors.description)}
										helperText={formErrors.description?.message || errors.description}
										multiline
										rows={4}
										required
									/>
								)}
							/>

							{/* Status */}
							<Controller
								name="status_id"
								control={control}
								rules={{ required: 'Status is required' }}
								render={({ field }) => (
									<FormControl fullWidth error={!!(formErrors.status_id || errors.status_id)}>
										<InputLabel>Status</InputLabel>
										<Select {...field} label="Status" required>
											{statuses?.map((status) => (
												<MenuItem key={status.id} value={status.id}>
													{status.name}
												</MenuItem>
											))}
										</Select>
										{(formErrors.status_id || errors.status_id) && (
											<Typography variant="caption" color="error">
												{formErrors.status_id?.message || errors.status_id}
											</Typography>
										)}
									</FormControl>
								)}
							/>

							{/* Form Actions */}
							<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 3 }}>
								<Button
									variant="outlined"
									startIcon={<Cancel />}
									onClick={handleCancel}
									color="error"
								>
									Cancel
								</Button>
								<Button
									disabled={!isValid || isSubmitting}
									type="submit"
									variant="contained"
									startIcon={<Save />}
									color="success"
								>
									Save Changes
								</Button>
							</Box>
						</Box>
					</form>
				</Paper>
			</Box>
		</>
	);
}