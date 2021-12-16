import { saveUserLocation } from "firebase/user";
import i18n from "i18next";
import React from "react";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";
import { useAuth } from "./useAuth";

export const useLocation = () => {
  const auth = useAuth();
  const [locationError, setLocationError] = React.useState(false);

  const saveLocation = React.useCallback(
    async (location: GeolocationCoordinates) => {
      try {
        if (auth.user) {
          await saveUserLocation(auth.user, location);
          auth.setUserLocalData(auth.user);
        }
      } catch (error: any) {
        SnackbarUtils.error(error.message);
      } finally {
      }
    },
    [auth]
  );

  const getLocationInfo = () => {
    return new Promise<GeolocationCoordinates>((res, rej) =>
      navigator.geolocation.getCurrentPosition((position) => res(position.coords), err => rej(err))
    );
  }

  React.useEffect(() => {
    if (auth.user?.location) {
      return;
    }

    getLocationInfo().then(location => {
      saveLocation(location);
    }).catch(err => {
      setLocationError(true);
      SnackbarUtils.error(
        i18n.t("You need to enable location services to use application")
      );
    });
  }, [auth.user?.location, saveLocation]);

  return { locationError, getLocationInfo, saveLocation };
};
