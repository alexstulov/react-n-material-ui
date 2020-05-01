import React from 'react';
import './header.css';
import { Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

type HeaderType = { toDo: number; done: number; };

const Header = ({ toDo, done }: HeaderType) => {
    return (<div className="header">
        <Box mb={2}>
            <Grid container direction="row">
                <Grid container item direction="column" xs={6}>
                    <Typography variant="h2">Todo List</Typography>
                </Grid>
                <Grid container item direction="column" xs={6}>
                    <Typography variant="h3">{toDo} more to do, {done} done</Typography>
                </Grid>
            </Grid>
        </Box>
    </div>);
};

export default Header;