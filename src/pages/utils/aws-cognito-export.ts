import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.region,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});


const CognitoConfig = {
  Auth: {
    region: process.env.region,
    userPoolId: process.env.userPoolId,
    userPoolWebClientId: process.env.userPoolWebClientId,
  },
};
export default CognitoConfig;
