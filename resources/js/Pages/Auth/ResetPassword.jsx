import { useForm, Controller } from 'react-hook-form';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Box } from '@mui/material';
import { Head, Link, router } from '@inertiajs/react';

export default function ResetPassword({ token, email, errors = {} }) {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors: formErrors, isValid, isSubmitting },
    } = useForm({
        defaultValues: {
            email: email ?? '',
            password: '',
            password_confirmation: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        router.post(route('password.store'), { ...data, token }, {
            onFinish: () =>
                reset({
                    email: email ?? '',
                    password: '',
                    password_confirmation: '',
                }),
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ mt: 2, mb: 3 }}>
                    <InputLabel htmlFor="email" value="Email" />
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: emailRegex,
                                message: 'Enter a valid email address',
                            },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                error={!!(formErrors.email || errors.email)}
                                id="email"
                                type="email"
                                autoComplete="username"
                                size="small"
                                sx={{ mt: 1, color: 'white' }}
                            />
                        )}
                    />
                    <InputError style={{ color: 'red' }} message={formErrors.email?.message} />
                    <InputError message={errors.email} />
                </Box>

                <Box sx={{ mt: 2, mb: 0 }}>
                    <InputLabel htmlFor="password" value="Password" />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: {
                                value: 5,
                                message: 'Password must be at least 5 characters long',
                            },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                error={!!(formErrors.password || errors.password)}
                                id="password"
                                type="password"
                                autoComplete="new-password"
                                size="small"
                                password={true}
                                sx={{ mt: 1, color: 'white' }}
                            />
                        )}
                    />
                    <InputError message={formErrors.password?.message} />
                    <InputError message={errors.password} />
                </Box>

                <Box sx={{ mt: 2, mb: 0 }}>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                    />
                    <Controller
                        name="password_confirmation"
                        control={control}
                        rules={{
                            required: 'Please confirm your password',
                            validate: (value) =>
                                value === getValues('password') ||
                                'Passwords do not match',
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                error={
                                    !!(
                                        formErrors.password_confirmation ||
                                        errors.password_confirmation
                                    )
                                }
                                id="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                size="small"
                                password={true}
                                sx={{ mt: 1, color: 'white' }}
                            />
                        )}
                    />
                    <InputError message={formErrors.password_confirmation?.message} />
                    <InputError message={errors.password_confirmation} />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                        alignItems: 'center',
                        my: 2,
                    }}
                >
                    <Link href={route('login')} className="ms-2 text-sm text-white">
                        Back to log in
                    </Link>

                    <PrimaryButton
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        sx={{
                            ml: 2,
                            color: 'common.white',
                            '&.Mui-disabled': {
                                color: 'rgba(255, 255, 255, 0.85)',
                            },
                        }}
                    >
                        Reset Password
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
}
