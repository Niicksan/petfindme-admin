import { useForm, Controller } from 'react-hook-form';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Box, Typography } from '@mui/material';
import { Head, Link, router } from '@inertiajs/react';

export default function Login({ status, canResetPassword, errors = {} }) {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
    const {
        control,
        handleSubmit,
        formState: { errors: formErrors, isSubmitting },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
        mode: 'onChange',
    });

    const onLoginSubmit = (data, e) => {
        e.preventDefault();
        const submitData = { ...data };

        router.post('login', submitData);
    };

    return (
        <>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <Box component="form" onSubmit={handleSubmit(onLoginSubmit)}>
                <Box sx={{ mt: 2, mb: 3 }}>
                    <InputLabel htmlFor="email" value="Email" />
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: emailRegex,
                                message: 'Enter a valid email address'
                            },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                error={!!(formErrors.email)}
                                id="email"
                                type="email"
                                autoComplete="username"
                                size="small"
                                sx={{ mt: 1, color: 'white' }}
                            />
                        )}
                    />
                    <InputError message={formErrors.email?.message} />
                </Box>

                <Box sx={{ mt: 2, mb: 0 }}>
                    <InputLabel htmlFor="password" value="Password" />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                            minLength: { value: 5, message: 'Password must be at least 5 characters long' },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                error={!!(formErrors.password || errors.password)}
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                size="small"
                                password={true}
                                sx={{ mt: 1, color: 'white' }}
                            />)}
                    />
                    <InputError message={formErrors.password?.message} />
                </Box>

                <InputError message={errors.email || errors.password} />

                <Box sx={{ mt: 2 }}>
                    <Controller
                        id="remember-me"
                        name="remember"
                        control={control}
                        render={({ field }) => (
                            <label className="flex items-center">
                                <Checkbox
                                    {...field}
                                    checked={field.value}
                                    onChange={(e) => field.onChange(e.target.checked)}
                                />
                                <Typography variant="p" component="span" sx={{ color: 'white' }}>
                                    Remember me
                                </Typography>
                            </label>
                        )}
                    />
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', mt: 1, mb: 2 }}>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="ms-2 text-sm text-white"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton sx={{ ml: 2 }} type="submit" disabled={isSubmitting}>
                        Log in
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
};
