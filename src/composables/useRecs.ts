import { getRecsFB } from "firebase/recs";
import React from "react";
import { CustomUser } from "types/user";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";
import { useAuth } from "./useAuth";

export const useRecs = () => {
  const { user } = useAuth();
  const [recs, setRecs] = React.useState<CustomUser[] | undefined>([]);
  const [loadingRecs, setLoadingRecs] = React.useState(false);

  React.useEffect(() => {
    const getRecs = async (user: CustomUser) => {
      setLoadingRecs(true);
      try {
        const recs = await getRecsFB(user);
        console.log(recs);
        setRecs(recs);
      } catch (error: any) {
        SnackbarUtils.error(error.message);
      } finally {
        setLoadingRecs(false);
      }
    };

    if (user && user.location) {
      getRecs(user);
    }
  }, [user, user?.location]);

  return { recs, loadingRecs };
};
