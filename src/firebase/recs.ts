import { db } from "firebase";
import {
  collection,
  DocumentData,
  endAt,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAt,
  where,
} from "firebase/firestore";
import { distanceBetween, geohashQueryBounds } from "geofire-common";
import { Location } from "types/location";
import { CustomUser } from "types/user";

/**
 * Get user data from Firestore
 * @param {CustomUser} user
 */
export const getRecsFB = async (user: CustomUser) => {
  const location = user?.location;
  if (location) {
    return await getRecsByDistance(location, user.distance, user);
  }
};

export const getRecsByDistance = async (
  location: Location,
  distance: number,
  user: CustomUser
) => {
  const matchingDocs: QueryDocumentSnapshot<DocumentData>[] = [];

  // Each item in 'bounds' represents a startAt/endAt pair. We have to issue
  // a separate query for each pair. There can be up to 9 pairs of bounds
  // depending on overlap, but in most cases there are 4.
  const radiusInM = distance * 1000;
  const bounds = geohashQueryBounds(
    [location.coordinates.lat, location.coordinates.lng],
    distance * radiusInM
  );

  const promises = [];
  for (const b of bounds) {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      where("genderFilter", "==", user?.genderFilter),
      orderBy("location.geohash"),
      startAt(b[0]),
      endAt(b[1])
    );
    const docs = await getDocs(q);
    promises.push(docs);
  }

  // Collect all the query results together into a single list
  return Promise.allSettled(promises).then((snapshots) => {
    snapshots.forEach((snapshot) => {
      if (snapshot.status === "fulfilled") {
        snapshot.value.docs.forEach((doc) => {
          const lat = doc.get("location.coordinates.lat");
          const lng = doc.get("location.coordinates.lng");

          // Have to filter out a few false positives due to GeoHash
          // accuracy, but most will match
          const distanceInKm = distanceBetween(
            [lat, lng],
            [location.coordinates.lat, location.coordinates.lng]
          );
          const distanceInM = distanceInKm * 1000;
          if (distanceInM <= radiusInM) {
            matchingDocs.push(doc);
          }
        });
      }
    });

    return matchingDocs.map((doc) => doc.data());
  });
};
