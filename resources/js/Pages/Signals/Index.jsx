import React from 'react';
import { Head, router } from '@inertiajs/react';
import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import DataTable from '@/Components/DataTable';
import ConfirmationModal from '@/Components/ConfirmationModal';
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

export default function SignalsIndex({ signals }) {
	const {
		modalState,
		closeModal,
		confirmSignalAction,
		handleConfirm
	} = useConfirmationModal();

	const columns = [
		{ key: 'title', label: 'Title' },
		{ key: 'user', label: 'User' },
		{ key: 'category', label: 'Category' },
		{ key: 'city', label: 'City' },
		{ key: 'status', label: 'Status' },
		{ key: 'created_at', label: 'Created date' },
	];

	const rowActions = [
		{
			label: 'Open',
			icon: <LaunchIcon sx={{ mr: 0.8 }} />,
			onClick: (signal) => router.get(`/signals/${signal.id}`)
		},
		{
			label: 'Edit',
			color: 'info.main',
			icon: <EditIcon sx={{ mr: 0.8 }} />,
			onClick: (signal) => router.get(`/signals/edit/${signal.id}`)
		},
		{
			label: 'Activate/Deactivate',
			onClick: (signal) => confirmSignalAction(signal.is_active ? 'deactivate' : 'activate', signal)
		},
		{
			label: 'Archive',
			color: 'secondary.main',
			icon: <ArchiveIcon sx={{ mr: 0.8 }} />,
			onClick: (signal) => confirmSignalAction('archive', signal)
		},
		{
			label: 'Delete',
			color: 'error.main',
			icon: <DeleteIcon sx={{ mr: 0.8 }} />,
			onClick: (signal) => confirmSignalAction('delete', signal)
		},
	];

	const rowStyle = (signal) => ({
		backgroundColor: signal.status === 'Изчакващ' ? '#e8f5e9' : 'transparent'
	});

	return (
		<>
			<Head title="Signals" />
			<DataTable
				title="Signals"
				columns={columns}
				data={signals.data}
				pagination={signals}
				rowActions={rowActions}
				rowStyle={rowStyle}
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