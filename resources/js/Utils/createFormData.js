/**
 * Build multipart FormData for signal update: scalar fields + JSON image manifest + new image files.
 *
 * @param {Record<string, unknown>} formValues  Values from react-hook-form (no File objects in images).
 * @param {Array<{ id: string|number, path?: string, size?: number, isNew?: boolean, file?: File }>} imagesState
 * @param {{ fromPreview?: boolean }} [options]
 */
export function buildSignalUpdateFormData(formValues, imagesState, options = {}) {
	const formData = new FormData();

	for (const key of Object.keys(formValues)) {
		if (key === 'images') {
			continue;
		}
		const value = formValues[key];
		if (key === 'geolocation') {
			formData.append(key, JSON.stringify(value));
			continue;
		}
		if (value === undefined || value === null) {
			continue;
		}
		formData.append(key, value);
	}

	const manifest = imagesState.map((img, index) => ({
		id: img.id,
		order: index,
	}));
	formData.append('images', JSON.stringify(manifest));

	for (const img of imagesState) {
		if (img.file && img.isNew) {
			formData.append('new_images[]', img.file);
		}
	}

	if (options.fromPreview) {
		formData.append('from_preview', '1');
	}

	return formData;
};
