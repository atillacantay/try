import UserCards from "components/recs/UserCards";
import { useLocation } from "composables/useLocation";

const Recommendations = () => {
  const { locationError } = useLocation();

  return (
    <div>
      <UserCards />
    </div>
  );
};

export default Recommendations;
