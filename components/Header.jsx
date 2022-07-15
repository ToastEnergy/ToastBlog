import Link from "next/link";
import Auth from "./Auth";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header>
            <div className="header-child">
                <div className="bar">
                    <div className="icon">
                        <FontAwesomeIcon
                            icon={faBars}
                            onClick={() => {
                                setIsOpen(true);
                            }}
                        />
                    </div>
                    <Auth />
                </div>
                {isOpen ? (
                    <nav>
                        <div className="icon">
                            <FontAwesomeIcon
                                icon={faX}
                                onClick={() => {
                                    setIsOpen(false);
                                }}
                            />
                        </div>
                        <hr />
                        <div className="nav-item">
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </div>
                    </nav>
                ) : null}
            </div>
        </header>
    );
}
