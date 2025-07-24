import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout";
import GuestLayout from "./Layouts/GuestLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

// Define admin routes that should use AuthenticatedLayout
const adminRoutes = [
    'Dashboard',
    'Users/Index',
    'Users/Preview',
    'Signals/Index',
    'Signals/Edit',
    'Contacts/Index',
    'Contacts/Preview',
    'Profile/Edit',
    'Profile/Partials/DeleteUserForm',
    'Profile/Partials/UpdatePasswordForm',
    'Profile/Partials/UpdateProfileInformationForm'
];

// Define guest routes that should use GuestLayout
const guestRoutes = [
    'Auth/Login',
    'Auth/Register',
    'Auth/ForgotPassword',
    'Auth/ResetPassword',
    'Auth/ConfirmPassword',
    'Auth/VerifyEmail'
];

createInertiaApp({
    title: (title) => `${appName} - ${title}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        );

        return page.then((module) => {
            const Component = module.default;

            // Create a wrapper component that applies the appropriate layout
            const WrappedComponent = (props) => {
                // Check if this is an admin route
                if (adminRoutes.includes(name)) {
                    return (
                        <AuthenticatedLayout>
                            <Component {...props} />
                        </AuthenticatedLayout>
                    );
                }

                // Check if this is a guest route
                if (guestRoutes.includes(name)) {
                    return (
                        <GuestLayout>
                            <Component {...props} />
                        </GuestLayout>
                    );
                }

                // For other routes (like error pages), render without layout
                return <Component {...props} />;
            };

            return { default: WrappedComponent };
        });
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

// InertiaProgress.init();
