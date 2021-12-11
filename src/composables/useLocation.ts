import { saveUserLocation } from "firebase/user";
import React from "react";
import SnackbarUtils from "utils/SnackbarUtilsConfigurator";
import { useAuth } from "./useAuth";

interface UseLocationProps {
  userLocation?: GeolocationCoordinates;
}

export const useLocation = ({ userLocation }: UseLocationProps) => {
  const auth = useAuth();
  const [locationError, setLocationError] = React.useState(false);

  const saveLocation = React.useCallback(
    async (location: GeolocationPosition) => {
      try {
        if (auth.user && !userLocation) {
          await saveUserLocation(auth.user, location.coords);
        }
      } catch (error: any) {
        SnackbarUtils.error(error.message);
      } finally {
      }
    },
    [auth.user, userLocation]
  );

  const getLocation = React.useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      function (location) {
        saveLocation(location);
      },
      function (error) {
        console.log(error);
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
