import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { downloadObjectAsJson } from '../datatools/downloadJson';
import DownloadIcon from '@mui/icons-material/Download';

const DataExport = () => {
  const data = useStoreState((state) => state.data);
  const selectedYear = useStoreState((state) => state.selectedYear);

  const handleExportSelected = () => {
    let selectedCountries = {};
    for (let year in data) {
      selectedCountries[year] = data[year].filter((object) => object.selected === true);
      console.log(selectedCountries);
    }
    downloadObjectAsJson(selectedCountries, 'patent-investment-data');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ mb: 1 }}>Download the data: </Typography>
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => downloadObjectAsJson(data[selectedYear], 'patent-investment-data')}
        >
          Selected Year
        </Button>
        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={handleExportSelected}>
          Selected Countries
        </Button>
        <Button
          variant="outlined"
          startIcon={<DownloadIcon />}
          onClick={() => downloadObjectAsJson(data, 'patent-investment-data')}
        >
          All Data
        </Button>
      </Stack>
    </Box>
  );
};

export default DataExport;
