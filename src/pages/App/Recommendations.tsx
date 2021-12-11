import { useAuth } from "composables/useAuth";
import { useLocation } from "composables/useLocation";

const Recommendations = () => {
  const { user } = useAuth();
  useLocation({ userLocation: user?.location });

  return <div>Recommendations</div>;
};

export default Recommendations;
