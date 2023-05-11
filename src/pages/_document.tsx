import Document, { Head, Html, Main, NextScript } from 'next/document';
// import Content from 'data/home';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);

		return { ...initialProps };
	}

	render() {
		return (
			<Html lang="en">
				<Head>
			{/* here you adjust your meta links */}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
