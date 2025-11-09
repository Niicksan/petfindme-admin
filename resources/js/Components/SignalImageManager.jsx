import { useState, useEffect } from 'react';
import {
	Box,
	Paper,
	Typography,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ImageIcon from '@mui/icons-material/Image';

function formatFileSize(bytes) {
	if (!bytes || bytes === 0) return '0 B';
	const k = 1024;
	const sizes = ['B', 'KB', 'MB', 'GB'];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileNameFromPath(path) {
	if (!path) return 'Unknown';
	const parts = path.split('/');
	return parts[parts.length - 1] || 'Unknown';
}

export default function SignalImageManager({ images = [], onImagesChange }) {
	const [localImages, setLocalImages] = useState(images);
	const [draggedIndex, setDraggedIndex] = useState(null);
	const [dragOverIndex, setDragOverIndex] = useState(null);

	// Update local images when prop changes
	useEffect(() => {
		setLocalImages(images);
	}, [images]);

	const handleDragStart = (e, index) => {
		setDraggedIndex(index);
		e.dataTransfer.effectAllowed = 'move';
		e.dataTransfer.setData('text/html', e.currentTarget);
	};

	const handleDragOver = (e, index) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
		if (draggedIndex !== index) {
			setDragOverIndex(index);
		}
	};

	const handleDragLeave = () => {
		setDragOverIndex(null);
	};

	const handleDrop = (e, dropIndex) => {
		e.preventDefault();
		e.stopPropagation();

		if (draggedIndex === null || draggedIndex === dropIndex) {
			setDraggedIndex(null);
			setDragOverIndex(null);
			return;
		}

		const newImages = [...localImages];
		const draggedImage = newImages[draggedIndex];

		// Remove dragged item first
		newImages.splice(draggedIndex, 1);

		// Calculate correct insertion index after removal
		// If dragging forward (down), the drop index shifts by -1
		// If dragging backward (up), the drop index stays the same
		const insertIndex = draggedIndex < dropIndex ? dropIndex - 1 : dropIndex;

		// Insert at new position
		newImages.splice(insertIndex, 0, draggedImage);

		setLocalImages(newImages);
		setDraggedIndex(null);
		setDragOverIndex(null);

		// Notify parent of change
		if (onImagesChange) {
			onImagesChange(newImages);
		}
	};

	const handleDelete = (index) => {
		const newImages = localImages.filter((_, i) => i !== index);
		setLocalImages(newImages);

		// Notify parent of change
		if (onImagesChange) {
			onImagesChange(newImages);
		}
	};

	const handleAddImage = () => {
		// Create a file input element
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.multiple = true;

		input.onchange = (e) => {
			const files = Array.from(e.target.files);

			// Create preview objects for new images
			const newImageObjects = files.map((file) => {
				return {
					id: `new-${Date.now()}-${Math.random()}`,
					path: file.name, // Temporary path
					size: file.size,
					file: file, // Store file object for potential upload
					isNew: true,
					preview: URL.createObjectURL(file),
				};
			});

			const updatedImages = [...localImages, ...newImageObjects];
			setLocalImages(updatedImages);

			// Notify parent of change
			if (onImagesChange) {
				onImagesChange(updatedImages);
			}
		};

		input.click();
	};

	return (
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<Typography variant="subtitle1">
					Images
				</Typography>
				<Button
					variant="outlined"
					startIcon={<AddPhotoAlternateIcon />}
					onClick={handleAddImage}
					size="small"
				>
					Add Image
				</Button>
			</Box>

			{localImages.length === 0 ? (
				<Paper
					variant="outlined"
					sx={{
						p: 4,
						textAlign: 'center',
						backgroundColor: '#fafafa',
						minHeight: 100,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography variant="body2" color="text.secondary">
						No images. Click "Add Image" to upload images.
					</Typography>
				</Paper>
			) : (
				<Paper variant="outlined">
					<List sx={{ p: 0 }}>
						{localImages.map((image, index) => {
							const imageUrl = image.preview || (image.path ? `/storage/${image.path}` : null);
							const fileName = getFileNameFromPath(image.path);
							const fileSize = formatFileSize(image.size);
							const isDragging = draggedIndex === index;
							const isDragOver = dragOverIndex === index;

							return (
								<Box key={image.id || `image-${index}`}>
									<ListItem
										sx={{
											backgroundColor: isDragOver ? 'action.hover' : 'transparent',
											opacity: isDragging ? 0.5 : 1,
											cursor: 'move',
											'&:hover': {
												backgroundColor: 'action.hover',
											},
										}}
										draggable
										onDragStart={(e) => handleDragStart(e, index)}
										onDragOver={(e) => handleDragOver(e, index)}
										onDragLeave={handleDragLeave}
										onDrop={(e) => handleDrop(e, index)}
									>
										<DragHandleIcon
											sx={{
												color: 'text.secondary',
												cursor: 'grab',
												mr: 1,
												'&:active': {
													cursor: 'grabbing',
												},
											}}
										/>
										<ListItemAvatar>
											<Avatar
												variant="rounded"
												sx={{
													width: 80,
													height: 80,
													bgcolor: 'grey.200',
												}}
												src={imageUrl}
											>
												<ImageIcon />
											</Avatar>
										</ListItemAvatar>
										<ListItemText
											primary={fileName}
											secondary={fileSize}
											sx={{
												color: 'text.secondary',
												fontWeight: 500,
												ml: 1,
											}}
										/>
										<IconButton
											edge="end"
											aria-label="delete"
											onClick={() => handleDelete(index)}
											color="error"
											size="small"
										>
											<DeleteIcon />
										</IconButton>
									</ListItem>
									{index < localImages.length - 1 && <Divider />}
								</Box>
							);
						})}
					</List>
				</Paper>
			)}
		</Box>
	);
}

