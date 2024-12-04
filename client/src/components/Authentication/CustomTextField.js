import React from 'react';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { InputAdornment } from '@mui/material';

const CustomTextField = ({ control, name, rules, icon, ...props }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          fullWidth
          variant="outlined"
          error={!!error}
          helperText={error?.message}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {icon}
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'rgba(0, 0, 0, 0.5)' },
              '&:hover fieldset': { borderColor: 'black' },
              '&.Mui-focused fieldset': { borderColor: '#4fc3f7' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(0, 0, 0, 0.7)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#4fc3f7' },
            '& .MuiInputAdornment-root .MuiSvgIcon-root': { color: 'rgba(0, 0, 0, 0.7)' },
            '& input': { color: 'black' },
            '& .MuiFormHelperText-root': { color: '#ff6e6e' },
          }}
        />
      )}
    />
  );
};

export default CustomTextField;
