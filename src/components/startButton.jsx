import { PlayArrow } from '@mui/icons-material'
import { Box, Fab, Typography } from '@mui/material'
import React, { Fragment } from 'react'

function StartButton({ setIsStart }) {
    return (
        <Fragment>
            <Typography variant="h3" sx={{ margin: "2%" }} color='primary'>
                Sınavı Başlat
            </Typography>
            <Fab color="primary" sx={{
                width: 100,
                height: 100,
                fontSize: 30,
            }} aria-label="add" onClick={() => setIsStart(true)}>
                <PlayArrow />
            </Fab>
        </Fragment>
    )
}

export default StartButton
