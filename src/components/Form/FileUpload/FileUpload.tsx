import styles from './FileUpload.module.scss';

import { useState } from 'react';
import FileList from 'components/Form/FileUpload/FileList';
import FileStatus from 'components/Form/FileUpload/FileStatus';

export const ResponseStatus = {
	SUCCESS: 'success',
	LOADING: 'loading',
	FAILED: 'failed',
	IDLE: 'idle',

} as const;

export type ResponseStatus = typeof ResponseStatus[keyof typeof ResponseStatus];

export default function FileUpload({ input, onFileUploaded }) {
	const [isDragging, setIsDragging] = useState(false);
	const [cachedFiles, cacheFiles] = useState([]);
	const [status, setStatus] = useState('idle');

	function onFileLoaded(e){
		setStatus(ResponseStatus.SUCCESS);
		setStatusTimeout();
	}

	function onFileLoading(){
		setStatus(ResponseStatus.LOADING);
		setStatusTimeout();
	}

	function onFileFailed(){
		setStatus(ResponseStatus.FAILED);
		setStatusTimeout();
	}

	function setStatusTimeout(){
		setTimeout(() => {
			setStatus(ResponseStatus.IDLE);
		}, 3500)
	}

	return (
		<div className={styles.Drag}>
			<div className={styles.DragArea} data-dragging={`${isDragging}`}>
				<FileStatus
					status={status}
					placeholder={input.placeHolder}
					success={input.success}
					failure={input.failure}
					loading={input.loading}
				/>
				<input
					type="file"
					multiple
					accept="image/*,.pdf"
					onDragEnter={() => setIsDragging(true)}
					onDragLeave={() => setIsDragging(false)}
					onDrop={(e) => setIsDragging(false)}
					onChange={(e) => {
						if (e.target.files) {
							for (let i = 0; i < e.target.files.length; i++) {
								const file = e.target.files[i];
								cacheFiles([...cachedFiles, file]);
							}
						}
					}}
				/>
			</div>
			{cachedFiles.length > 0 ? <FileList onFileLoaded={onFileLoaded} onFileLoading={onFileLoading} onFileFailed={onFileFailed} files={cachedFiles} /> : <></>}
		</div>
	);
}
