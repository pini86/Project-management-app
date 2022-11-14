import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { red } from '@mui/material/colors';
import './TextInputForm.css';

interface FormData {
  name: string;
  login: string;
  password: string;
}
interface InputAttributes {
  name: 'name' | 'login' | 'password';
  label: string;
  rules: {
    required?: boolean | string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
  };
}
interface FormProps {
  inputAttributes: InputAttributes[];
  className: string;
  formData: FormData;
  submitBtnText: string;
  additionalText: { mainText: string; linkText: string; linkHref: string };
}
export default function TextInputForm({
  inputAttributes,
  className,
  formData,
  submitBtnText,
  additionalText,
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
    console.log(data);
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
          <>
            <Controller
              render={({ field }) => <TextField {...field} label={input.label} />}
              key={input.name}
              name={input.name}
              control={control}
              rules={input.rules}
            />
            <Typography variant="caption" sx={{ color: red[500], display: 'block' }}>
              {errors[input.name]?.message}
            </Typography>
          </>
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
