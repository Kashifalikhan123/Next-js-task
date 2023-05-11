import styles from './ErrorPage.module.scss';
import HeadlineAndText from 'components/HeadlineAndText';
import { ThemeVariant } from 'utils/ThemedComponent';
import Images from 'components/Images';

export default function ErrorPage() {
	return (
		<div className={styles.ErrorPage}>
			<div className={styles.ErrorPageContainer}>
				<div className={styles.ErrorImg}>
					<Images
						src={'/images/looking-down.jpg'}
						layout="fill"
						objectFit="cover"
						alt="Exhausted e-cyclist"
						priority={true}
					/>
				</div>
				<HeadlineAndText
					title={'ERROR | 404'}
					text={'Oops, the page you requested could not be found.'}
					align="center"
					size="medium"
					variant={ThemeVariant.DARK}
					button
					link={'Back to homepage'}
					url={'/'}
				/>
			</div>
		</div>
	);
}
