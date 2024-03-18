import React from "react";
import { ButtonBase } from "@mui/material";
import Stack from '@mui/material/Stack';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function Pagination({currentPage, totalPages, paginate}) {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      marginTop={2}
      marginBottom={3}
    >
      <ButtonBase
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        variant="contained"
      >
        <ChevronLeftIcon
          fontSize="small"
          color={currentPage > 1 ? "action" : "disabled"}
        />
      </ButtonBase>
      <ButtonBase
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="contained"
      >
        <ChevronRightIcon
          fontSize="small"
          color={currentPage < totalPages ? "action" : "disabled"}
        />
      </ButtonBase>
    </Stack>
  );
}
