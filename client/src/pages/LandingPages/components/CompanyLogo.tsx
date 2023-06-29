import React from 'react'
import "./CompanyLogo.scss";
import classNames from 'classnames';

interface CompanyLogoProps {
    size: "small" | "medium" | "large"
}
const CompanyLogo: React.FC<CompanyLogoProps> = (props) => {
    const logoClassnames = classNames("company-logo", props.size)

    return (
        <img alt="cfs-landing-page" src="https://res.cloudinary.com/dfm2vczpy/image/upload/v1680622104/other-assets/CFS_PNGw_nwv5pv.png" className={logoClassnames} />
    )
}

export default CompanyLogo