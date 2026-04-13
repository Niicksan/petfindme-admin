import { useForm, Controller } from 'react-hook-form';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Box } from '@mui/material';
import { Head, Link, router } from '@inertiajs/react';

export default function Register({ canLogin = true, loginUrl, errors = {} }) {
    const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i);
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors: formErrors, isSubmitting },
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
        mode: 'onChange',
    });

    const onRegisterSubmit = (data, e) => {
        e.preventDefault();
        const submitData = { ...data };
        router.post('register', submitData);
    };

    return (
        <>
            <Head title="Register" />

            <Box component="form" onSubmit={handleSubmit(onRegisterSubmit)}>
                <Box sx={{ mt: 2, mb: 3 }}>
                    <InputLabel htmlFor="name" value="Name" />
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            required: 'Name is required',
                            maxLength: {
                                value: 255,
                                message: 'Name must be at most 255 characters',
                            },
                        }}
                        render={({ field }) => (
                            <TextInput
                                {...field}
                                error={!!(formErrors.name || errors.name)}
                                id="name"
                                autoComplete="name"
                                size="small"
                                sx={{ mt: 1, color: 'white' }}
                            />
                        )}
                    />
                    <InputError message={formErrors.name?.message} />
                    <InputError message={errors.name} />
                </Box>

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
                    <InputError message={formErrors.email?.message} />
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
                    {canLogin && (
                        <Link
                            href={loginUrl ?? route('login')}
                            className="ms-2 text-sm text-white"
                        >
                            Already registered?
                        </Link>
                    )}

                    <PrimaryButton sx={{ ml: 2 }} type="submit" disabled={isSubmitting}>
                        Register
                    </PrimaryButton>
                </Box>
            </Box>
        </>
    );
}
