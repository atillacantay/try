import TextField, { TextFieldProps } from '@mui/material/TextField';
import { FC } from 'react';

const TryTextField: FC<TextFieldProps> = (params) => {
  return <TextField {...params} />;
}

export default TryTextField;