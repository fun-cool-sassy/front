import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(() => ({
	searchPanel: {
		height: 600,
		width: 400,
	},
}));

function Rank() {
  const classes = useStyles()

	const [content, setContent] = useState('');

	const handleContent = useCallback((event) => {
		setContent(event.target.value);
  }, [setContent]);

  return (
    <Box
      className={classes.searchPanel}
      display="flex"
      flexDirection="column"
    >
      <FormControl className={classes.dialog}>
        <InputLabel id="demo-simple-select-label">Rank</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={content}
          onChange={handleContent}
        >
          <MenuItem value={'UserRank'}>User Rank</MenuItem>
          <MenuItem value={'TargetRank'}>Target Rank</MenuItem>
          <MenuItem value={'ProblemRank'}>Problem Rank</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default Rank
