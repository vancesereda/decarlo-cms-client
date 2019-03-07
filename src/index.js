import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Amplify, { Storage }from 'aws-amplify';
import config from './config';
import { BrowserRouter as Router } from 'react-router-dom';

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID
    },
    Storage: {
        region: config.s3.REGION,
        bucket: config.s3.BUCKET,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        credentials: {
            accessKeyId: 'AKIAJDSAPBOWXVZNZV3A',
            secretAccessKey: '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'
        }
    },
    API: {
        endpoints: [
            {
                name: "pages",
                endpoint: config.apiGateway.URL,
                region: config.apiGateway.REGION
            },
        ]
    }
});

Storage.configure({
    bucket: config.s3.BUCKET,
    region: config.s3.REGION,
    credentials: {
        accessKeyId: 'AKIAJDSAPBOWXVZNZV3A',
        secretAccessKey: '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'
    }
});

ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
