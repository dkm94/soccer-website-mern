/* eslint-disable no-unused-vars */
import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from '@mui/material';
import './Competition.css';

const SelectArticles = (props) => {
  console.log('🚀 ~ file: Articles.jsx:7 ~ SelectArticles ~ props:', props);

  // const handleSelectValue = (e) => {
  //   setCompetition(e.target.value);
  // };
  // const ids = temp.map((o) => o.id);
  // const selectData = temp.filter(({ id }, index) => !ids.includes(id, index + 1));

  return (
    <FormControl size="small">
      {/* <InputLabel id="outline-select-label">Select a competition</InputLabel>
      <Select
        labelId="select-label"
        sx={{
          '& label': {
            top: '-6px'
          }
        }}
        input={<OutlinedInput notched label={'Select a competition'} />}
        value={competition || ''}
        label="Age"
        onChange={handleSelectValue}>
        {temp &&
          selectData?.map((match) => {
            return (
              <MenuItem key={match?.code} value={match?.id}>
                {match?.name}
              </MenuItem>
            );
          })}
      </Select> */}
    </FormControl>
  );
};

export default SelectArticles;
