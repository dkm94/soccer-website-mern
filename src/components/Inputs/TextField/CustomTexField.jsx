import React, { forwardRef, useState } from 'react';
import { TextField as MuiTextField, Box } from '@mui/material';

const CustomTexField = forwardRef((props, ref) => {
  const { counter = false, onFocus, onBlur, helperText, ...rest } = props;

  if (counter && !props.inputProps?.maxLength) {
    throw new Error('counter needs maxLength to be set on inputProps');
  }
  if (counter && props.type !== 'text') {
    throw new Error('invalid input type');
  }
  const [visible, setVisible] = useState(false);

  return (
    <MuiTextField
      ref={ref}
      {...rest}
      onFocus={(event) => {
        setVisible(true);
        onFocus && onFocus(event);
      }}
      onBlur={(event) => {
        setVisible(false);
        onBlur && onBlur(event);
      }}
      helperText={
        <Box component="span" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{helperText}</span>
          {visible && counter && (
            <span>{`${props.value.length} / ${props.inputProps.maxLength}`}</span>
          )}
        </Box>
      }
    />
  );
});

CustomTexField.displayName = 'CustomTexField';

export default CustomTexField;
