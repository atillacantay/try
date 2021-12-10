import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, FormHelperText, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Photos = styled("div")({
  display: "flex",
});

const Photo = styled("div")({});

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
    setValue("photos", photos.concat(Array.from(e.target.files as any)), {
      shouldValidate: true,
    });
  };

  const removePhoto = (selectedPhoto: File) => {
    const photos = getPhotos().filter(
      (photo) => photo.name !== selectedPhoto.name
    );
    setValue("photos", photos, { shouldValidate: true });
  };

  console.log(getValues("photos"));

  return (
    <React.Fragment>
      <Photos>
        {getPhotos().map((photo) => (
          <Photo key={photo.name + Math.floor(Math.random() * Date.now())}>
            <img
              alt={photo.name}
              width={100}
              src={URL.createObjectURL(photo)}
            />
            <IconButton onClick={() => removePhoto(photo)}>
              <DeleteIcon />
            </IconButton>
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
