//Footer component
import { NextPage } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styles from './footer.module.css';
import BottomNavigation from '@mui/material/BottomNavigation';

interface IFooterProps {
    home?: Boolean;
}

const Footer: NextPage<IFooterProps> = ({ home }) => {
    return (

        <BottomNavigation>
            <div>
                yo
            </div>
        </BottomNavigation>
        //<footer className={styles.footer}>
        //    <div className={styles.container}>
        //        <div className={`styles.content styles.has_text_centered`}>
        //            <p>
        //                <strong>Cesi'Eats</strong>
        //                <span className="icon">
        //                    <FontAwesomeIcon icon={faFacebook} />
        //                    <FontAwesomeIcon icon={faTwitter} />
        //                    <FontAwesomeIcon icon={faInstagram} />
        //                </span>
        //                <span className="icon">
        //                    <FontAwesomeIcon icon={faEnvelope} />
        //                </span>
        //                {!home && (
        //                    <div>
        //                        <Link href="/customers/home">
        //                            <a>← Back to home</a>
        //                        </Link>
        //                    </div>
        //                )}
        //            </p>
        //        </div>
        //    </div>
        //</footer>
    );
}


export default Footer;
