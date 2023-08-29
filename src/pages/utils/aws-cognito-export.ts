import AWS from "aws-sdk";
AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAUCIGS7I7YSIXZ3LJ",
  secretAccessKey: "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",
});
const CognitoConfig = {
  Auth: {
    region: process.env.region,
    userPoolId: process.env.userPoolId,
    userPoolWebClientId: process.env.userPoolWebClientId,
  },
};
export default CognitoConfig;
