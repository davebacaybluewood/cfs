import { Grid } from '@mui/material'
import React from 'react'

interface TwoColContentProps {
    leftCol: JSX.Element
    rightCol: JSX.Element
    leftSize?: number
}

const TwoColContent: React.FC<TwoColContentProps> = (props) => {
    return (
        <Grid container spacing={2} justifyContent={'space-between'} alignItems={'center'}>
            <Grid item md={props.leftSize}>{props.leftCol}</Grid>
            <Grid item md={props.leftSize ? 12 - props.leftSize! : 6}>{props.rightCol}</Grid>
        </Grid>
    )
}

TwoColContent.defaultProps = {
    leftSize: 6,
}



export default TwoColContent