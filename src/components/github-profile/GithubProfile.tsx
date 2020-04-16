import React from 'react';

export default function GithubProfile() {
    let [githubUser, setGithubUser] = React.useState({avatar_url: ''});

    (async () => {
        // read our JSON
        let response = await fetch('/user.json');
        let user = await response.json();

        // read github user
        let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
        setGithubUser(await githubResponse.json());
    })();

    return (
        <div>
            <img src={githubUser.avatar_url} className="promise-example-class" width="30" height="60"/>
        </div>
    );
}