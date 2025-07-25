import { Head, router } from '@inertiajs/react';
import DataTable from '@/Components/DataTable';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

export default function ContactsIndex({ contacts }) {
	const {
		modalState,
		closeModal,
		confirmContactDelete,
		handleConfirm
	} = useConfirmationModal();

	const columns = [
		{ key: 'name', label: 'Name' },
		{ key: 'email', label: 'Email' },
		{ key: 'subject', label: 'Subject' },
		{
			key: 'message',
			label: 'Message',
			render: (message) => message.length > 50 ? message.slice(0, 50) + '...' : message
		},
		{ key: 'created_at', label: 'Created At' },
	];

	const rowActions = [
		{ label: 'Open', onClick: (contact) => router.get(`/contacts/${contact.id}`) },
		{ label: 'Delete', onClick: (contact) => confirmContactDelete(contact) },
	];

	return (
		<>
			<Head title="Emails" />
			<DataTable
				title="Emails"
				columns={columns}
				data={contacts}
				pagination={contacts}
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