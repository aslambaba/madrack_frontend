import { useEffect } from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import CognitoConfig from "./aws-cognito-export";

export const useAuth = (
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      Auth.configure(CognitoConfig);
      try {
        await Auth.currentAuthenticatedUser().then((user) => {
          console.log("User LoggedIn Successfully: ", user);
          setIsUserLoggedIn(true);
          router.replace("dashboard");
        });
      } catch (error) {
        console.log("Unauthorized User!!", error);
        setIsUserLoggedIn(false);
        router.replace("/login");
      }
    };
    checkAuth();
  }, []);
};
