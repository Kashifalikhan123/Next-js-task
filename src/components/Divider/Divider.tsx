import styles from './Divider.module.scss';
import FaTimes from 'fontawesome/faTimes.svg';
import { Fragment } from 'react';

export interface DividerProps {
	footer?: string;
	children: React.ReactNode;
}

export default function Divider({ children, footer = 'VirtuPro x Just got real' }: DividerProps) {
	const arr = footer.split(/\s*x\s*/gi);

	return (
		<div className={styles.Divider} data-component="Divider">
			<div className={styles.title}>{children}</div>
			<div className={styles.footer}>
				{arr.map((text, i) => (
					<Fragment key={i}>
						<span>{text}</span>
						{i + 1 < arr.length ? <FaTimes /> : <></>}
					</Fragment>
				))}
			</div>
		</div>
	);
}
