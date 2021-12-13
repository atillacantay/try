import { saveUserLocation } from "firebase/user";
import i18n from "i18next";
import React from "react";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";
import { useAuth } from "./useAuth";

export const useLocation = () => {
  const auth = useAuth();
  const [locationError, setLocationError] = React.useState(false);

  const saveLocation = React.useCallback(
    async (location: GeolocationPosition) => {
      try {
        if (auth.user && !auth.user.location) {
          await saveUserLocation(auth.user, location.coords);
          auth.setUserLocalData(auth.user);
        }
      } catch (error: any) {
        SnackbarUtils.error(error.message);
      } finally {
      }
    },
    [auth]
  );

  const getLocation = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        saveLocation(location);
      },
      function () {
        SnackbarUtils.error(
          i18n.t("You need to enable location services to use application")
        );
        setLocationError(true);
      }
    );
  }, [saveLocation]);

  React.useEffect(() => {
    if (auth.isAuthenticated) {
      getLocation();
    }
  }, [getLocation, auth.isAuthenticated]);

  return { locationError, getLocation, saveLocation };
};
