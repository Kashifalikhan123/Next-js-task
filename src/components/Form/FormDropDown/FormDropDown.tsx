import styles from './FormDropDown.module.scss';
import { useState, useEffect, useRef } from 'react';
import FaChevronDown from 'fontawesome/faChevronDown.svg';

export default function Dropdown({ input, onSelection }) {
	const [expanded, setExpanded] = useState(false);
	const [selected, setSelected] = useState(
		input.defaultValue ? input.defaultValue : input.placeHolder
	);
	const [offset, setOffset] = useState(0);
	const containerRef = useRef(null);
	const elementRef = useRef(null);

	const createOffset = () => {
		if (elementRef.current) {
			const height = elementRef.current.getBoundingClientRect().height;
			setOffset(height);
		}
	};

	useEffect(() => {
		if (!elementRef.current) return;
		if (!containerRef.current) return;

		if (expanded) {
			let el = (elementRef.current as HTMLElement).children[0] as HTMLElement;
			if (selected !== input.placeHolder || !!input.defaultValue)
				el = (containerRef.current as HTMLElement).querySelector(
					styles.selectOptionsItemSelected
				);
			if (el) el.focus();
		} else if ((elementRef.current as HTMLElement).contains(document.activeElement)) {
			let el = (containerRef.current as HTMLElement).querySelector(
				styles.selectButton
			) as HTMLElement;
			if (el) el.focus();
		}
	}, [expanded]);

	useEffect(() => {
		window.setTimeout(createOffset, 333);

		window.addEventListener('resize', createOffset);
		createOffset();

		return () => {
			window.removeEventListener('resize', createOffset);
		};
	}, []);

	const blur = () => {
		if (!containerRef.current) return;
	};

	const buttonKey = (e) => {
		if (e.key === 'Enter') {
			if (!expanded) setExpanded(true);
			return;
		}
	};

	function select(item) {
		setSelected(item);
		onSelection(item);
		setExpanded(false);
	}

	return (
		<div className={styles.select} data-component="Dropdown" onBlur={blur} ref={containerRef}>
			<div
				className={`${styles.selectOptionsItem} ${styles.selectButton} ${
					expanded ? styles.expanded : null
				}`}
				onClick={() => setExpanded(!expanded)}
				onKeyDown={buttonKey}
				tabIndex={0}
			>
				<span>{expanded && input.placeHolder ? input.placeHolder : selected}</span>
				<FaChevronDown />
			</div>
			<div className={styles.selectOptions}>
				<div
					className={styles.selectOptionsContainer}
					style={{ display: expanded ? 'flex' : 'none' }}
				>
					<div
						className={styles.selectOptionsWrapper}
						ref={elementRef}
						style={{ transform: `translateY(-${expanded ? 0 : offset}px)` }}
					>
						{input.content ? (
							input.content.map((item, i) => (
								<span
									key={i}
									className={`${styles.selectOptionsItem} ${
										item === selected ? styles.selectOptionsItemSelected : ''
									}`}
									tabIndex={expanded ? 0 : -1}
									onClick={() => {
										select(item);
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											select(item);
										}
									}}
								>
									{item}
								</span>
							))
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
