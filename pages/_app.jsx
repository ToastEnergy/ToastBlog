import "../styles/style.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { store } from "../store";
import { Provider } from "react-redux";
import { DefaultSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <DefaultSeo
                title="Toast Energy Blog"
                description="Tech news from a toaster"
                noindex={false}
                nofollow={false}
                canonical="https://blog.toastenergy.xyz"
                additionalMetaTags={[
                    {
                        name: "theme-color",
                        content: "#121212",
                    },
                    {
                        name: "msvalidate.01",
                        content: "3A3AA9415C89992603F3E144BB929C44",
                    },
                    {
                        name: "google-site-verification",
                        content: "dqCd8gJq3lC4TSQN6c9LX8t7EUwwBIwVZl9hBDF5nsg",
                    },
                ]}
                openGraph={{
                    type: "website",
                    locale: "en_US",
                    url: "https://blog.toastenergy.xyz",
                    site_name: "Toast Energy Blog",
                }}
                twitter={{
                    site: "@toast_energy",
                }}
            />
            <div className="container">
                {Component.name !== "Logged" ? <Header /> : null}
                <Component {...pageProps} />
                <Footer />
            </div>
        </Provider>
    );
}

export default MyApp;
