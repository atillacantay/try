import { Card, CardActions } from "@mui/material";
import { styled } from "@mui/system";
import React, { FC } from "react";
import TinderCard from "react-tinder-card";
import { CustomUser } from "types/user";
import UserPhotos from "./UserPhotos";

const TinderCardWrapper = styled(TinderCard)(({ theme }) => ({
  position: "absolute",
  width: 375,
  margin: "auto",
  right: 0,
  left: 0,
}));

const UserCardWrapper = styled(Card)(({ theme }) => ({
  width: 375,
  height: 667,
  display: "flex",
  flexDirection: "column",
}));

interface UserCardProps {
  user: CustomUser;
}

const UserCard: FC<UserCardProps> = ({ user }) => {
  const swiped = (direction: any, nameToDelete: string) => {
    console.log("removing: " + nameToDelete);
  };

  const outOfFrame = (name: string) => {
    console.log(name + " left the screen!");
  };

  return (
    <TinderCardWrapper
      onSwipe={(dir) => swiped(dir, user.name)}
      onCardLeftScreen={() => outOfFrame(user.name)}
    >
      <UserCardWrapper>
        <UserPhotos photos={user.photos} />
        <CardActions></CardActions>
      </UserCardWrapper>
    </TinderCardWrapper>
  );
};

export default UserCard;
