import { NextPage } from "next";
import Head from 'next/head';
import Link from 'next/link';
import Navbar from './navbar'
export const siteTitle = 'Home Page';

export interface ILayout {
    children: React.ReactNode,
    authentified?: Boolean;
    home?: Boolean;
}

const Layout: NextPage<ILayout> = ({ children, authentified = false, home = false }) => {
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>CESI'EATS</title>
                <meta
                    name="description"
                    content="Cesi'Eats, food delivery web-app."
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            {
                authentified ? (
                    <Navbar authentified />
                ) : (
                    <Navbar />
                )
            }
            <main>{children}</main>

            <footer>


            </footer>
            {!home && (
                <div>
                    <Link href="/customers/home">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Layout;