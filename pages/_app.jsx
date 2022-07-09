import "../styles/style.scss";
import Header from "../components/Header";

function MyApp({ Component, pageProps }) {
    return (
        <>
            {Component.name !== 'Logged' ? <Header /> : null}
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
