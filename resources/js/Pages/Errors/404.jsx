import { Head } from '@inertiajs/react';

export default function Error404() {
	return (
		<>
			<Head title="404 - Not Found" />
			<div className="min-h-screen flex items-center justify-center bg-gray-900">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-white mb-4">404</h1>
					<p className="text-xl text-white mb-8">Not Found</p>
					<p className="text-gray-300 mb-8">
						The page you're looking for doesn't exist.
					</p>
					<a
						href="/dashboard"
						className="inline-flex items-center px-4 py-2 bg-white text-gray-900 rounded-md hover:bg-gray-100 transition-colors duration-200"
					>
						Go to Dashboard
					</a>
				</div>
			</div>
		</>
	);
} 