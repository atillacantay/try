import { saveUserLocation } from "firebase/authentication";
import React from "react";
import { useAuth } from "./useAuth";

interface UseLocationProps {
  userLocation?: GeolocationCoordinates;
}

export const useLocation = ({ userLocation }: UseLocationProps) => {
  const auth = useAuth();
  const [locationError, setLocationError] = React.useState(false);

  const saveLocation = React.useCallback(
    (location: GeolocationPosition) => {
      if (auth.user && !userLocation) {
        saveUserLocation(auth.user, location.coords);
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
