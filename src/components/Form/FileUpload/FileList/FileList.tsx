import styles from './FileList.module.scss';
import SmallCross from 'assets/smallcross.svg';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export interface FilelistProps {
	files: any;
	onFileLoaded: any;
	onFileLoading: any;
	onFileFailed: any;
}

export default function FileList({
	files,
	onFileLoading,
	onFileLoaded,
	onFileFailed,
}: FilelistProps) {
	console.log(files);
	const element = useRef(null);
	useEffect(() => {
		if (element.current) {
			gsap.fromTo(
				element.current,
				{
					display: 'flex',
					opacity: 0,
				},
				{
					duration: 0.25,
					opacity: 1,
				}
			);
		}
	}, []);
	return (
		<div className={styles.FileList}>
			{files ? (
				<div className={styles.FileListResult}>
					<h4>Uploaded Files</h4>
					{files.map((item, i) => (
						<File
							key={i}
							item={item}
							onFileLoaded={onFileLoaded}
							onFileFailed={onFileLoaded}
							onFileLoading={onFileLoading}
						/>
					))}
					{console.log(files)}
				</div>
			) : (
				<></>
			)}
		</div>
	);
}

function File({ item, onFileLoaded, onFileFailed, onFileLoading }) {
	const element = useRef(null);
	const bar = useRef(null);
	const percentage = useRef(null);

	function colorIndicator() {
		gsap.to(bar.current, {
			duration: 0.1,
			backgroundColor: '#14E450',
		});
	}

	useEffect(() => {
		onFileLoading();
		if (element.current && bar.current) {
			gsap.fromTo(
				element.current,
				{
					display: 'block',
					opacity: 0,
				},
				{
					duration: 0.25,
					opacity: 1,
				}
			);
			gsap.fromTo(
				bar.current,
				{
					width: 0,
				},
				{
					duration: 0.5,
					width: '100%',
				}
			);
			let percent = { val: 0 };

			gsap.to(percent, {
				val: 100,
				duration: 0.5,
				onUpdate: () => {
					percentage.current.textContent = `${percent.val.toFixed()}%`;
				},
				onComplete: () => {
					colorIndicator();
					onFileLoaded(item.name);
				},
			});
		}
	}, []);
	console.log(item);
	return (
		<div ref={element}>
			<div className={styles.FileListResultItemProgress}>
				<span>{item.name.length > 25 ? `${item.name.substr(0, 25)}...` : item.name}</span>
				<span ref={percentage}>100%</span>
			</div>
			<div className={styles.FileListResultBar}>
				<div className={styles.FileListResultBarProgress} ref={bar}></div>
			</div>
			<button>
				<SmallCross />
			</button>
		</div>
	);
}
