import { useState } from 'react';
import { router } from '@inertiajs/react';

/**
 * Reusable confirmation modal hook
 * 
 * Usage examples:
 * 
 * // For predefined actions (signals, users, contacts)
 * const { confirmSignalAction, confirmUserDelete, confirmContactDelete } = useConfirmationModal();
 * 
 * // For custom actions
 * const { openModal, closeModal, handleConfirm } = useConfirmationModal();
 * 
 * const handleCustomAction = (item) => {
 *   openModal({
 *     action: 'custom',
 *     item: item,
 *     title: 'Custom Action',
 *     message: `Are you sure you want to perform custom action on "${item.name}"?`,
 *     confirmText: 'Confirm',
 *     severity: 'warning'
 *   });
 * };
 * 
 * // Then use handleConfirm with a custom callback
 * const handleConfirmWithCallback = () => {
 *   // Your custom logic here
 *   console.log('Custom action confirmed for:', modalState.item);
 *   closeModal();
 * };
 */

export const useConfirmationModal = () => {
	const [modalState, setModalState] = useState({
		open: false,
		action: null,
		item: null,
		title: '',
		message: '',
		confirmText: '',
		severity: 'warning'
	});

	const openModal = (config) => {
		setModalState({
			open: true,
			...config
		});
	};

	const closeModal = () => {
		setModalState(prev => ({ ...prev, open: false }));
	};

	const confirmAction = (onConfirm) => {
		if (onConfirm) {
			onConfirm(modalState.item, modalState.action);
		}
		closeModal();
	};

	// Predefined modal configurations for common actions
	const modalConfigs = {
		// Signal actions
		signals: {
			activate: (signal) => ({
				action: 'activate',
				item: signal,
				title: 'Activate Signal',
				message: `Are you sure you want to activate the signal "${signal.title}"?`,
				confirmText: 'Activate',
				severity: 'success'
			}),
			deactivate: (signal) => ({
				action: 'deactivate',
				item: signal,
				title: 'Deactivate Signal',
				message: `Are you sure you want to deactivate the signal "${signal.title}"?`,
				confirmText: 'Deactivate',
				severity: 'warning'
			}),
			archive: (signal) => ({
				action: 'archive',
				item: signal,
				title: 'Archive Signal',
				message: `Are you sure you want to archive the signal "${signal.title}"?`,
				confirmText: 'Archive',
				severity: 'secondary'
			}),
			delete: (signal) => ({
				action: 'delete',
				item: signal,
				title: 'Delete Signal',
				message: `Are you sure you want to delete the signal "${signal.title}"?`,
				confirmText: 'Delete',
				severity: 'error'
			})
		},
		// User actions
		users: {
			delete: (user) => ({
				action: 'delete',
				item: user,
				title: 'Delete User',
				message: `Are you sure you want to delete user "${user.email}"?`,
				confirmText: 'Delete',
				severity: 'error'
			})
		},
		// Contact actions
		contacts: {
			delete: (contact) => ({
				action: 'delete',
				item: contact,
				title: 'Delete Contact',
				message: `Are you sure you want to delete the email from "${contact.name}" (${contact.email})?`,
				confirmText: 'Delete',
				severity: 'error'
			})
		}
	};

	// Action handlers for different entity types
	const actionHandlers = {
		signals: {
			activate: (signal) => router.patch(`/signals/activate/${signal.id}`),
			deactivate: (signal) => router.patch(`/signals/deactivate/${signal.id}`),
			archive: (signal) => router.patch(`/signals/archive/${signal.id}`),
			delete: (signal) => router.patch(`/signals/soft-delete/${signal.id}`)
		},
		users: {
			delete: (user) => router.delete(`/users/${user.id}`)
		},
		contacts: {
			delete: (contact) => router.delete(`/contacts/${contact.id}`)
		}
	};

	// Convenience methods for common actions
	const confirmSignalAction = (action, signal) => {
		const config = modalConfigs.signals[action];
		if (config) {
			openModal(config(signal));
		}
	};

	const confirmUserDelete = (user) => {
		openModal(modalConfigs.users.delete(user));
	};

	const confirmContactDelete = (contact) => {
		openModal(modalConfigs.contacts.delete(contact));
	};

	// Handle confirmation with automatic action execution
	const handleConfirm = () => {
		const { action, item } = modalState;
		const entityType = getEntityType(item);

		if (entityType && actionHandlers[entityType] && actionHandlers[entityType][action]) {
			actionHandlers[entityType][action](item);
		}

		closeModal();
	};

	// Helper to determine entity type
	const getEntityType = (item) => {
		if (item && item.title) return 'signals';
		if (item && item.role) return 'users';
		if (item && item.subject) return 'contacts';
		return null;
	};

	return {
		modalState,
		openModal,
		closeModal,
		confirmAction,
		confirmSignalAction,
		confirmUserDelete,
		confirmContactDelete,
		handleConfirm,
		modalConfigs,
		actionHandlers
	};
}; 