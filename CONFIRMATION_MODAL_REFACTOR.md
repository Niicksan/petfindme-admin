# Confirmation Modal Refactoring

## Overview

This refactoring centralizes all confirmation modal functionality into a reusable hook (`useConfirmationModal`) to eliminate code duplication across pages.

## Changes Made

### 1. Created `useConfirmationModal` Hook

**File:** `resources/js/Hooks/useConfirmationModal.js`

This hook provides:
- Centralized modal state management
- Predefined configurations for common actions (signals, users, contacts)
- Automatic action execution for predefined actions
- Flexibility for custom actions

### 2. Refactored Pages

The following pages were refactored to use the new hook:

- `resources/js/Pages/Signals/Index.jsx`
- `resources/js/Pages/Users/Index.jsx`
- `resources/js/Pages/Contacts/Index.jsx`
- `resources/js/Pages/Contacts/Preview.jsx`
- `resources/js/Pages/Users/Preview.jsx`
- `resources/js/Pages/Signals/Edit.jsx`

## Usage

### For Predefined Actions

```jsx
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

export default function MyComponent() {
  const {
    modalState,
    closeModal,
    confirmSignalAction,
    confirmUserDelete,
    confirmContactDelete,
    handleConfirm
  } = useConfirmationModal();

  // Signal actions
  const handleActivate = (signal) => confirmSignalAction('activate', signal);
  const handleDelete = (signal) => confirmSignalAction('delete', signal);

  // User actions
  const handleDeleteUser = (user) => confirmUserDelete(user);

  // Contact actions
  const handleDeleteContact = (contact) => confirmContactDelete(contact);

  return (
    <>
      {/* Your component content */}
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
```

### For Custom Actions

```jsx
import { useConfirmationModal } from '@/Hooks/useConfirmationModal';

export default function MyComponent() {
  const { modalState, openModal, closeModal } = useConfirmationModal();

  const handleCustomAction = (item) => {
    openModal({
      action: 'custom',
      item: item,
      title: 'Custom Action',
      message: `Are you sure you want to perform custom action on "${item.name}"?`,
      confirmText: 'Confirm',
      severity: 'warning'
    });
  };

  const handleConfirmCustom = () => {
    // Your custom logic here
    console.log('Custom action confirmed for:', modalState.item);
    closeModal();
  };

  return (
    <>
      {/* Your component content */}
      <ConfirmationModal
        open={modalState.open}
        onClose={closeModal}
        onConfirm={handleConfirmCustom}
        title={modalState.title}
        message={modalState.message}
        confirmText={modalState.confirmText}
        severity={modalState.severity}
      />
    </>
  );
}
```

## Benefits

1. **DRY Principle**: Eliminated code duplication across multiple pages
2. **Consistency**: All confirmation modals now have consistent behavior and styling
3. **Maintainability**: Changes to modal logic only need to be made in one place
4. **Flexibility**: Easy to add new predefined actions or use custom configurations
5. **Type Safety**: Better structure for modal configurations and actions

## Predefined Actions

### Signals
- `activate` - Activate a signal
- `deactivate` - Deactivate a signal  
- `archive` - Archive a signal
- `delete` - Delete a signal

### Users
- `delete` - Delete a user

### Contacts
- `delete` - Delete a contact

## Adding New Predefined Actions

To add new predefined actions, update the `modalConfigs` and `actionHandlers` objects in the hook:

```jsx
// Add to modalConfigs
newEntity: {
  customAction: (item) => ({
    action: 'customAction',
    item: item,
    title: 'Custom Action',
    message: `Are you sure you want to perform custom action on "${item.name}"?`,
    confirmText: 'Confirm',
    severity: 'warning'
  })
}

// Add to actionHandlers
newEntity: {
  customAction: (item) => router.patch(`/api/${item.id}/custom-action`)
}

// Add convenience method
const confirmNewEntityAction = (action, item) => {
  const config = modalConfigs.newEntity[action];
  if (config) {
    openModal(config(item));
  }
};
``` 