import { CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import UserCard from "components/recs/UserCard";
import { useRecs } from "composables/useRecs";
import React from "react";

const UserCardContainer = styled("div")(({ theme }) => ({
  height: "100vh",
  width: "100%",
  position: "relative",
  overflow: "hidden",
  zIndex: 0,
}));

const UserCards = () => {
  const { recs, loadingRecs } = useRecs();

  return (
    <React.Fragment>
      {loadingRecs ? (
        <CircularProgress />
      ) : (
        <UserCardContainer>
          {recs && recs.map((rec) => <UserCard key={rec.uid} user={rec} />)}
        </UserCardContainer>
      )}
    </React.Fragment>
  );
};

export default UserCards;
