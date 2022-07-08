import Link from "next/link";
import Auth from "./Auth";

export default function Header() {
    return (
        <>
            <header>
                <nav>
                    <div className="nav-item">
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </div>
                </nav>
            </header>
            <Auth />
        </>
    );
}
