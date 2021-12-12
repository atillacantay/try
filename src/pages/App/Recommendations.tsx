import { useAuth } from "composables/useAuth";
import { useLocation } from "composables/useLocation";
import { useRecs } from "composables/useRecs";

const Recommendations = () => {
  const { user } = useAuth();
  useLocation({ userLocation: user?.location });
  useRecs({ user });

  return <div>Recommendations</div>;
};

export default Recommendations;
