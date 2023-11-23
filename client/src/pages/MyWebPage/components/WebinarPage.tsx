import { Container, Grid } from '@mui/material'
import useFetchWebinars, { WebinarValuesType } from 'admin/pages/FileMaintenance/pages/Webinars/hooks/useFetchWebinars'
import CardContent from 'library/CardContent/CardContent'
import Spinner from 'library/Spinner/Spinner'
import React from 'react'
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from 'react-router-dom'
import { paths } from 'constants/routes'
import './WebinarPage.scss'



const WebinarPage: React.FC = () => {
    const { loading, webinars } = useFetchWebinars()
    const isWebinarNull = webinars === ''
    const navigate = useNavigate()
    const { user } = useParams()

    const learnMoreHandler = (webinarId: string) => {
        navigate(paths.webinarForm.replace(":videoId", webinarId).replace(':agentId', `${user}`))
    }

    return (
        <div className='webinar-mywebpage-container' >
            <Helmet>
                <title>CFS | Webinars</title>
            </Helmet>
            <div className="header-content">
                <h2>CFS Webinars</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa dolores reprehenderit quaerat est libero quibusdam sapiente magni eius alias repudiandae.</p>
            </div>

            <div className="webinar-page-content">
                {loading ? (
                    <div className="loading">
                        <Spinner variant='fixed' />
                    </div>
                ) : isWebinarNull ? (
                    <h2>No Webinars available.</h2>
                ) : (
                    <Container>
                        <Grid container spacing={2}>
                            {webinars?.map((webinar: WebinarValuesType) => {
                                return (
                                    <Grid item sm={12} md={12} lg={4} key={webinar._id}>
                                        <CardContent
                                            key={webinar._id}
                                            title={webinar.title}
                                            description={webinar.introVideoContent}
                                            thumbnail={webinar.thumbnail}
                                            subtitle="Webinar"
                                            onClick={() => learnMoreHandler(webinar._id ?? '')}
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Container>
                )}
            </div>
        </div>
    )
}

export default WebinarPage