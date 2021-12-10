import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, FormHelperText, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const Images = styled("div")({
  display: "flex",
});

const Image = styled("div")({});

const Input = styled("input")({
  display: "none",
});

const ImageStep = () => {
  const { t } = useTranslation();
  const {
    getValues,
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const getImages = () => getValues("images") as File[];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = getImages();
    setValue("images", images.concat(Array.from(e.target.files as any)), {
      shouldValidate: true,
    });
  };

  const removeImage = (selectedImage: File) => {
    const images = getImages().filter(
      (image) => image.name !== selectedImage.name
    );
    setValue("images", images, { shouldValidate: true });
  };

  return (
    <React.Fragment>
      <Images>
        {getImages().map((image) => (
          <Image key={image.name + Math.floor(Math.random() * Date.now())}>
            <img
              alt={image.name}
              width={100}
              src={URL.createObjectURL(image)}
            />
            <IconButton onClick={() => removeImage(image)}>
              <DeleteIcon />
            </IconButton>
          </Image>
        ))}
      </Images>
      <FormControl sx={{ m: 1 }} error={Boolean(errors.images)}>
        <label htmlFor="image-upload">
          <Input
            {...register("images")}
            accept=".png, .jpg, .jpeg"
            id="image-upload"
            multiple
            type="file"
            onChange={onChange}
          />
          <Button variant="contained" component="span">
            {t("Upload")}
          </Button>
        </label>
        <FormHelperText>{errors.images?.message}</FormHelperText>
      </FormControl>
    </React.Fragment>
  );
};

export default ImageStep;
