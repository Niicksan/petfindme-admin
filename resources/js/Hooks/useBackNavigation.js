import { useState, useEffect } from 'react';

/**
 * Custom hook for handling back navigation based on the 'from' query parameter
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.resourceType - The resource type (e.g., 'signals', 'users')
 * @param {number|string} options.resourceId - The ID of the resource being edited
 * @param {Object} options.labels - Custom labels for back navigation
 * @param {string} options.labels.preview - Label when coming from preview (default: 'Back to Preview')
 * @param {string} options.labels.index - Label when coming from index (default: 'Back to {ResourceType}')
 * 
 * @returns {Object} - Object containing backUrl and backLabel
 * 
**/
export const useBackNavigation = ({ resourceType, resourceId, labels = {} }) => {
	const [backUrl, setBackUrl] = useState('');
	const [backLabel, setBackLabel] = useState('');

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const from = urlParams.get('from');

		if (from === 'preview') {
			setBackUrl(`/${resourceType}/${resourceId}`);
			setBackLabel(labels.preview);
		} else {
			setBackUrl(`/${resourceType}`);
			setBackLabel(labels.index);
		}
	}, [resourceType, resourceId, labels.preview, labels.index]);

	return { backUrl, backLabel };
};
