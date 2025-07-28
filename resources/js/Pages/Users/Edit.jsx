import { Head, router } from '@inertiajs/react';
import { useForm, Controller } from 'react-hook-form';
import {
	Box,
	Paper,
	Typography,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ActionBar from '@/Components/ActionBar';

export default function Edit({ auth, user, roles, errors = {} }) {
	const {
		control,
		handleSubmit,
		formState: { errors: formErrors, isValid, isSubmitting },
	} = useForm({
		mode: "onChange",
		defaultValues: {
			name: user.name || '',
			email: user.email || '',
			password: '',
			password_confirmation: '',
			role_id: user.role_id || '',
			is_active: user.is_active || false,
		},
	});

	const onSubmit = (data) => {
		// Convert is_active from string to boolean if needed
		const submitData = {
			...data,
			is_active: typeof data.is_active === 'string' ? data.is_active === 'active' : data.is_active
		};

		router.patch(`/users/${user.id}`, submitData);
	};

	const handleCancel = () => {
		router.get('/users');
	};

	return (
		<>
			<Head title={`Edit User - ${user.name}`} />

			{/* Header */}
			<ActionBar
				backUrl="/users"
				backLabel="Back to Users"
			/>

			<Box sx={{ p: 2 }}>
				<Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
					<Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
						Edit User
					</Typography>

					<form onSubmit={handleSubmit(onSubmit)}>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
							{/* Name Field */}
							<Controller
								name="name"
								control={control}
								rules={{
									required: 'Name is required',
									minLength: { value: 2, message: 'Name must be at least 2 characters long' },
									maxLength: { value: 255, message: 'Name must be less than 255 characters long' },
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Name"
										error={!!(formErrors.name || errors.name)}
										helperText={formErrors.name?.message || errors.name}
										required
										autoFocus
									/>
								)}
							/>

							{/* Email Field */}
							<Controller
								name="email"
								control={control}
								rules={{
									required: 'Email is required',
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: 'Enter a valid email address'
									},
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Email"
										type="email"
										error={!!(formErrors.email || errors.email)}
										helperText={formErrors.email?.message || errors.email}
										required
									/>
								)}
							/>

							{/* Password Field */}
							<Controller
								name="password"
								control={control}
								rules={{
									minLength: { value: 5, message: 'Password must be at least 5 characters long' },
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Password (leave empty to keep current)"
										type="password"
										error={!!(formErrors.password || errors.password)}
										helperText={formErrors.password?.message || errors.password}
									/>
								)}
							/>

							{/* Password Confirmation Field */}
							<Controller
								name="password_confirmation"
								control={control}
								rules={{
									validate: (value, formValues) => {
										if (formValues.password !== '' && value !== formValues.password) {
											return 'Password confirmation does not match';
										}
										return true;
									}
								}}
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label="Confirm Password"
										type="password"
										error={!!(formErrors.password_confirmation || errors.password_confirmation)}
										helperText={formErrors.password_confirmation?.message || errors.password_confirmation}
									/>
								)}
							/>

							{/* Role Field */}
							<Controller
								name="role_id"
								control={control}
								rules={{ required: 'Role is required' }}
								render={({ field }) => (
									<FormControl fullWidth error={!!(formErrors.role_id || errors.role_id)} required>
										<InputLabel id="role-label">Role</InputLabel>
										<Select
											{...field}
											labelId="role-label"
											label="Role"
										>
											{roles.map((role) => (
												<MenuItem key={role.id} value={role.id}>
													{role.name === 'user' ? 'User' : 'Admin'}
												</MenuItem>
											))}
										</Select>
										{(formErrors.role_id || errors.role_id) && (
											<Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
												{formErrors.role_id?.message || errors.role_id}
											</Typography>
										)}
									</FormControl>
								)}
							/>

							{/* Active Status Field */}
							<Controller
								name="is_active"
								control={control}
								render={({ field }) => (
									<FormControl fullWidth error={!!(formErrors.is_active || errors.is_active)}>
										<InputLabel id="status-label">Status</InputLabel>
										<Select
											{...field}
											labelId="status-label"
											label="Status"
											value={field.value ? 'active' : 'inactive'}
											onChange={(e) => field.onChange(e.target.value === 'active')}
										>
											<MenuItem value="active">Active</MenuItem>
											<MenuItem value="inactive">Inactive</MenuItem>
										</Select>
										{(formErrors.is_active || errors.is_active) && (
											<Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
												{formErrors.is_active?.message || errors.is_active}
											</Typography>
										)}
									</FormControl>
								)}
							/>

							{/* Buttons */}
							<Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
								<Button
									variant="outlined"
									startIcon={<ArrowBackIcon />}
									onClick={handleCancel}
									color="error"
								>
									Cancel
								</Button>
								<Button
									disabled={!isValid || isSubmitting}
									type="submit"
									variant="contained"
									startIcon={<SaveIcon />}
									color="success"
								>
									Update User
								</Button>
							</Box>
						</Box>
					</form>
				</Paper>
			</Box>
		</>
	);
}