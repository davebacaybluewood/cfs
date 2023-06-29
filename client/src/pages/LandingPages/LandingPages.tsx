import React from 'react'
import { useParams } from 'react-router-dom'
import Edge from './pages/Edge/Edge';
import Advantage from './pages/Advantage/Advantage';


const LandingPages: React.FC = () => {
    const { pageId } = useParams();

    const pageSettings = [
        {
            pageId: "cfs-edge",
            component: <Edge />
        },
        {
            pageId: "cfs-advantage",
            component: <Advantage />
        }
    ]

    const displayedPage = pageSettings.find((page) => page.pageId === pageId);

    return (
        <div className='landing-page'>{displayedPage?.component}</div>
    )
}

export default LandingPages