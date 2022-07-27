import "../styles/style.scss";
import Header from "../components/Header";
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
                additionalMetaTags={
                    [
                        {
                            name: "theme-color",
                            content: "#121212",
                        },
                    ]
                }
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
            {Component.name !== "Logged" ? <Header /> : null}
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
