import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import CognitoConfig from "./aws-cognito-export";

interface Props {
  username: string;
  groupname: string;
  status: boolean;
}
export const useAuth = (
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<Props>>
) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      Auth.configure(CognitoConfig);
      try {
        await Auth.currentAuthenticatedUser().then((user) => {
          const role: Array<string> =
            user?.signInUserSession?.accessToken?.payload["cognito:groups"];
          setIsUserLoggedIn({
            username: user.username,
            groupname: role[0],
            status: true,
          });
          router.replace("/dashboard");
        });
      } catch (error) {
        console.log(`Unauthorized User!!, ${error}`);
        setIsUserLoggedIn({ username: "", groupname: "NaN", status: false });
      }
    };
    checkAuth();
  }, []);
};
