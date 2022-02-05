import React from 'react';
import { Button } from '@mui/material';
import { useStoreState } from 'easy-peasy';
import { downloadObjectAsJson } from '../datatools/downloadJson';
import DownloadIcon from '@mui/icons-material/Download';

const DataExport = () => {
  const data = useStoreState((state) => state.data);
  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={() => downloadObjectAsJson(data, 'patent-investment-data')}
    >
      Download Data
    </Button>
  );
};

export default DataExport;
