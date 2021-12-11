import CancelIcon from "@mui/icons-material/Cancel";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Photos = styled("div")({
  display: "flex",
});

const Photo = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100px",
  height: "100px",
  marginRight: theme.spacing(2),
}));

const RemoveButton = styled(IconButton)({
  position: "absolute",
  right: 0,
});

const Input = styled("input")({
  display: "none",
});

const PhotoStep = () => {
  const { t } = useTranslation();
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const getPhotos = () => getValues("photos") as File[];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const photos = getPhotos();
    const newPhotos = Array.from(e.target.files as FileList);
    setValue("photos", photos.concat(newPhotos), {
      shouldValidate: true,
    });
  };

  const removePhoto = (selectedPhoto: File) => {
    const photos = getPhotos().filter(
      (photo) => photo.name !== selectedPhoto.name
    );
    setValue("photos", photos, { shouldValidate: true });
  };

  return (
    <React.Fragment>
      <Photos>
        {getPhotos().map((photo) => (
          <Photo
            key={photo.name}
            style={{
              backgroundImage: `url(${URL.createObjectURL(photo)})`,
            }}
          >
            <RemoveButton
              onClick={() => removePhoto(photo)}
              size="small"
              color="default"
            >
              <CancelIcon />
            </RemoveButton>
          </Photo>
        ))}
      </Photos>
      <FormControl sx={{ m: 1 }} error={Boolean(errors.photos)}>
        <label htmlFor="photo-upload">
          <Input
            {...register("photos")}
            accept=".png, .jpg, .jpeg"
            id="photo-upload"
            multiple
            type="file"
            onChange={onChange}
          />
          <Button variant="contained" component="span">
            {t("Upload")}
          </Button>
        </label>
        <FormHelperText>{errors.photos?.message}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

export default PhotoStep;
