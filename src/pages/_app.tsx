import 'styles/global.scss';
import Page from "components/Page";
import Footer from "components/Footer";
import ContactForm from "components/ContactForm";
import { AppProps } from 'next/dist/next-server/lib/router/router';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import axios from 'axios';
function MyApp({ data }) {
	return (
		<Page pageTitle="Contact">
		<ContactForm Data={data}/>
		<Footer />
		<NotificationContainer/>
	  </Page>
	  
	);
}
export const getServerSideProps=async()=> {
	const res = await axios.get("https://jsonplaceholder.typicode.com/comments");
	const data = res.data;
	return { props: { data } }
  }
export default MyApp;
