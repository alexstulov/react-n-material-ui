import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import './header.css';
// import { Grid, Box } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';

type HeaderType = { toDo: number; done: number; };

const Header = ({ toDo, done }: HeaderType) => {
    return (<Container className="header">
        <Row>
            <Col xs={6}>
            <h2>TodoList</h2>
            </Col>
            <Col xs={6} style={{textAlign: "right"}}>
                <h3 style={{marginTop: "10px"}}>{toDo} more to do, {done} done</h3>
            </Col>
        </Row>
        {/* <Box mb={2}>
            <Grid container direction="row">
                <Grid container item direction="column" xs={6}>
                    <Typography variant="h2">Todo List</Typography>
                </Grid>
                <Grid container item direction="column" xs={6}>
                    <Typography variant="h3">{toDo} more to do, {done} done</Typography>
                </Grid>
            </Grid>
        </Box> */}
    </Container>);
};

export default Header;