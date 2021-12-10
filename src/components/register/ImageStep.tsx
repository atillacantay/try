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

const Images = styled("div")({
  display: "flex",
});

const Image = styled(Paper)(({ theme }) => ({
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
    const newImages = Array.from(e.target.files as FileList);
    setValue("images", images.concat(newImages), {
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
          <Image
            key={image.name}
            style={{
              backgroundImage: `url(${URL.createObjectURL(image)})`,
            }}
          >
            <RemoveButton
              onClick={() => removeImage(image)}
              size="small"
              color="default"
            >
              <CancelIcon />
            </RemoveButton>
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
