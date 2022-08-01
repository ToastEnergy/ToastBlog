import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Footer() {
    return (
        <footer>
            <ul>
            <li>
                    <Link href="https://toastenergy.xyz">
                        <a target="_blank">
                            <FontAwesomeIcon icon={faGlobe} />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="https://github.com/ToastEnergy/blog">
                        <a target="_blank">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </Link>
                </li>
                <li>
                    <Link href="https://twitter.com/toast_energy/">
                        <a target="_blank">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </Link>
                </li>
            </ul>
        </footer>
    );
}
