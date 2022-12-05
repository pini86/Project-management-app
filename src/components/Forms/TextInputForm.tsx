import { Box, Button, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { red } from '@mui/material/colors';
import './TextInputForm.css';
import { FormProps, InputAttributes, FormData } from './types';
import { useNavigate } from 'react-router-dom';

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
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: formData,
  });

  const onSubmit = (data: FormData) => {
    getUserFromForm(data);
  };

  const navigate = useNavigate();
  const redirect = (link: string) => {
    navigate(link);
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
      </Button>
      {additionalText ? (
        <Typography variant="body2" sx={{ display: 'block' }}>
          {additionalText.mainText}
          <Button
            onClick={() => redirect(additionalText.linkHref)}
            variant="text"
            color="primary"
            size="small"
          >
            {additionalText.linkText}
          </Button>
        </Typography>
      ) : (
        ''
      )}
    </Box>
  );
}
