import { ReactNode } from "react";
import { Helmet } from "react-helmet";

interface IContainer {
    children?: ReactNode;
}

const Container: React.FC<IContainer> = ({ children }) => {
    return (
        <section className="container">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Comfort Financial Solutions | Rewards</title>
                {/* <link rel="canonical" href="gocfs.pro/rewards" /> */}
            </Helmet>
            <span className="container-circle" />
            {children}
            <span className="container-logo" />
        </section>
    )
}

export default Container;