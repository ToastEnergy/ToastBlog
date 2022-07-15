import "../styles/style.scss";
import Header from "../components/Header";
import { store } from '../store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            {Component.name !== 'Logged' ? <Header /> : null}
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
