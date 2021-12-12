import { getRecsFB } from "firebase/recs";
import { useEffect } from "react";
import { CustomUser } from "types/user";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";

interface UseRecsProps {
  user: CustomUser;
}

export const useRecs = ({ user }: UseRecsProps) => {
  useEffect(() => {
    if (user) {
      getRecs(user);
    }
  }, [user]);

  const getRecs = async (user: CustomUser) => {
    try {
      const recs = await getRecsFB(user);
      // console.log(recs);
    } catch (error: any) {
      SnackbarUtils.error(error.message);
    } finally {
    }
  };

  return {};
};
