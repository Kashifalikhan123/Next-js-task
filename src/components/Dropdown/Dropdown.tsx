import styles from './Dropdown.module.scss';

export default function Dropdown({ content, theme }) {
	return (
		<div className={styles.Dropdown} data-theme={theme}>
			<div className={styles.DropdownContainer}>
				{content.map((item, key) => (
					<a href={item.url} className={styles.DropdownItem} key={key}>
						{item.title}
					</a>
				))}
			</div>
		</div>
	);
}
