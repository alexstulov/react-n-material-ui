import React from 'react';
import { Card, CardActionArea, CardContent, CardActions, CardMedia, Typography, Button, makeStyles, Grid } from '@material-ui/core';

type GithubUserType = {
    avatar_url: string;
};

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const GithubProfile: React.FC<{}> = () => {
    const classes = useStyles();
    let [githubUser, setGithubUser] = React.useState<GithubUserType>({ avatar_url: 'https://picsum.photos/200/300' });
    let [userLink, setUserLink] = React.useState<string>('https://github.com/');

    (async () => {
        // read our JSON
        let response = await fetch('/user.json');
        let user: { name: string } = await response.json();

        // read github user
        try{
            const githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
            setGithubUser(await githubResponse.json());
        } catch(error) {
            console.log(error.message);
        }
        
        setUserLink(`https://github.com/${user.name}`);
    })();

    return (
        <Grid container justify="center">
            <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={githubUser.avatar_url}
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">Github user</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse scelerisque ultrices varius. Mauris enim lorem, tincidunt eget eros accumsan, elementum condimentum mi.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <a href={userLink} target="_blank" rel="noopener noreferrer">
                    <Button size="small" color="primary">
                        Learn More
                    </Button>
                </a>
            </CardActions>
        </Card>
        </Grid>
    );
}

export default GithubProfile;