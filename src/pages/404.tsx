import Page from 'components/Page';
import Footer from 'components/Footer';
import ErrorPage from 'components/ErrorPage';

function FourOhFour() {
	return (
		<Page pageTitle="404 Error">
			<ErrorPage />
			<Footer hasImage={false} />
		</Page>
	);
}

export default FourOhFour;
