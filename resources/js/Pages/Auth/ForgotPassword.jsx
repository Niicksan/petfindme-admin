import { useForm, Controller } from 'react-hook-form';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Box, Typography } from '@mui/material';
import { Head, Link, router } from '@inertiajs/react';

export default function ForgotPassword({ status, errors = {} }) {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isValid, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (data, e) => {
        e.preventDefault();
        router.post(route('password.email'), { email: data.email });
    };

    return (
        <>
            <Head title="Forgot Password" />

            <Typography variant="body2" sx={{ mb: 2, color: 'rgba(255, 255, 255, 0.85)' }}>
                Forgot your password? No problem. Just let us know your email address and we
                will email you a password reset link that will allow you to choose a new one.
            </Typography>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

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
                                name="email"
                                autoComplete="username"
                                size="small"
                                sx={{ mt: 1, color: 'white' }}
                            />
                        )}
                    />
                    <InputError message={formErrors.email?.message} />
                    <InputError message={errors.email} />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 1, mb: 2 }}>
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
                        Email Password Reset Link
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
}
