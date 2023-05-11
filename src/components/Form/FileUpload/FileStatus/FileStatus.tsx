import gsap from 'gsap';
import styles from './FileStatus.module.scss';
import DownloadArrow from 'assets/download.svg';
import Checkmark from 'assets/checkmark.svg';
import { useRef, useState, useEffect } from 'react';
import { ResponseStatus } from '../FileUpload';

export interface FileStatusProps {
	status: string;
	placeholder: string;
	success: string;
	failure: string;
}

export default function FileStatus({ status, placeholder, success, failure, loading }) {
	return (
		<div className={styles.FileStatus}>
			<Message
				status={status}
				success={success}
				failure={failure}
				loading={loading}
				placeholder={placeholder}
			/>
		</div>
	);
}

// function animateMessage(text, icon, color, targetText, targetIcon, target){

// }

function Message({ status, success, failure, loading, placeholder }) {
	const element = useRef(null);
	const icon = useRef(null);
	const [data, setData] = useState({
		image: <DownloadArrow />,
		color: 'transparent',
		text: placeholder,
	});

	useEffect(() => {
		if (status === ResponseStatus.FAILED) {
			setData({
				image: <DownloadArrow />,
				color: '#DC1400', //Green
				text: failure,
			});
		} else if (status === ResponseStatus.LOADING) {
			setData({
				image: <DownloadArrow />,
				color: 'transparent', //Grey
				text: loading,
			});
		} else if (status === ResponseStatus.IDLE) {
			setData({
				image: <DownloadArrow />,
				color: 'transparent',
				text: placeholder,
			});
		} else if (status === ResponseStatus.SUCCESS) {
			console.log('success');
			setData({
				image: <Checkmark />,
				color: '#14E450', //Green
				text: success,
			});
		}

		if (element.current && icon.current) {
			gsap.fromTo(
				element.current,
				{
					display: 'grid',
					opacity: 0,
				},
				{
					duration: 0.25,
					opacity: 1,
				}
			);
			gsap.fromTo(
				icon.current,
				{
					opacity: 0,
					scale: 0,
				},
				{
					opacity: 1,
					scale: 1,
				}
			);
		}
	}, [status]);

	return (
		<>
			<div className={styles.FileStatusMessageIndicator} ref={element}>
				<div
					className={styles.FileStatusIconBg}
					style={{ backgroundColor: data.color }}
				></div>
				<div ref={icon} className={styles.FileStatusIcon}>
					{data.image}
				</div>
			</div>
			<span dangerouslySetInnerHTML={{ __html: data.text }}></span>
		</>
	);
}
