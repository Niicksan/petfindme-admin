import { Head, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

export default function UsersIndex({ users }) {
	const {
		modalState,
		closeModal,
		confirmUserDelete,
		handleConfirm
	} = useConfirmationModal();

	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'role', label: 'Role' },
		{ key: 'status', label: 'Status' },
		{ key: 'created_at', label: 'Created At' },
	];

	const rowActions = [
		{ label: 'Open', onClick: (user) => router.get(`/users/${user.id}`) },
		{ label: 'Edit', onClick: (user) => router.get(`/users/edit/${user.id}`) },
		{ label: 'Delete', onClick: (user) => confirmUserDelete(user) },
	];

	return (
		<>
			<Head title="Users" />
			<DataTable
				title="Users"
				columns={columns}
				data={users.data}
				pagination={users}
				rowActions={rowActions}
			/>
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