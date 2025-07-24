import { Head } from '@inertiajs/react';

export default function Error403() {
	return (
		<>
			<Head title="403 - Forbidden" />
			<div className="min-h-screen flex items-center justify-center bg-gray-900">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-white mb-4">403</h1>
					<p className="text-xl text-white mb-8">Forbidden</p>
					<p className="text-gray-300 mb-8">
						You don't have permission to access this resource.
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