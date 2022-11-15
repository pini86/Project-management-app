import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { red } from '@mui/material/colors';
import './TextInputForm.css';
import { FormProps, InputAttributes, FormData } from './types';

export default function TextInputForm({
  inputAttributes,
  className,
  formData,
  submitBtnText,
  additionalText,
  getUserFromForm,
}: FormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: formData,
  });

  const onSubmit = (data: FormData) => {
    getUserFromForm(data);
    reset();
  };

  return (
    <Box
      className={className}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        '& > :not(style)': { m: 1 },
        textAlign: 'center',
      }}
    >
      {inputAttributes.map((input: InputAttributes) => {
        return (
          <div key={input.name}>
            <Controller
              render={({ field }) => <TextField {...field} label={input.label} type={input.type} />}
              name={input.name}
              control={control}
              rules={input.rules}
            />
            <Typography variant="caption" sx={{ color: red[500], display: 'block' }}>
              {errors[input.name]?.message}
            </Typography>
          </div>
        );
      })}
      <Button type="submit" variant="contained">
        {submitBtnText}
      </Button>{' '}
      {/* // TODO: redirect from "react-router-dom" on submit*/}
      <Typography variant="body2" sx={{ display: 'block' }}>
        {additionalText.mainText}
        <Link href={additionalText.linkHref} underline="hover">
          {additionalText.linkText}
        </Link>
      </Typography>
    </Box>
  );
}
