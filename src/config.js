export default {
    MAX_ATTACHMENT_SIZE: 5000000,
    s3: {
        REGION: "us-east-1",
        BUCKET: "www.domdecarlo.com2",
        credentials: {
            accessKeyId: 'AKIAJDSAPBOWXVZNZV3A',
            secretAccessKey: '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'
        }
    },
    apiGateway: {
        REGION: "us-east-1",
        URL: "https://vizv19ytuj.execute-api.us-east-1.amazonaws.com/prod"
    },
    cognito: {
        REGION: "us-east-1",
        USER_POOL_ID: "us-east-1_hBlL6IVAR",
        APP_CLIENT_ID: "3gdvopvdph4oi50eld18f8o18m",
        IDENTITY_POOL_ID: "us-east-1:d35841f3-08fb-471d-a308-ff571f150b32"
    }
};