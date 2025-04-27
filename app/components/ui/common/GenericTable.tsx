"use client";

import React, { JSX } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, Pagination, Box } from "@mui/material";

interface Column {
  id: string;
  label: string;
  align?: "left" | "center" | "right";
}

interface RowData {
  [key: string]: any;
}

interface GenericTableProps {
  tableName: string;
  headerData: Column[];
  rowsData: any[] | undefined;
  marginTop?: number;
  rowsPerPage?: number;
  page: number;
  hasPagination?: boolean;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  renderRow: (row: RowData, index: number) => JSX.Element;
  totalPages?: number | undefined
}

const GenericTable: React.FC<GenericTableProps> = ({
  headerData,
  rowsData,
  rowsPerPage,
  page,
  handlePageChange,
  renderRow,
  marginTop,
  hasPagination = true,
  totalPages
}) => {
  const currentRows = rowsData; 
  return (
    <>
      <Container sx={{  }}>
      
        
        <Box>
          <TableContainer component={Paper} sx={{ boxShadow: 0, overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#FAFAFA" }}>
                  {headerData.map((column) => (
                    <TableCell
                      key={column.id}
                      sx={{
                        fontWeight: "700",
                        fontSize: "12px",
                        fontFamily: "poppins",
                        paddingBottom: "2px",
                        textAlign: column.align || "left",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows?.map((row, index) => renderRow(row, index))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination positioned below the table */}
          {hasPagination && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end", // Align pagination to the right
                marginTop: 2,
               
                paddingBottom: 3 // Add spacing above pagination
              }}
            >
              <Pagination
                variant="outlined"
                shape="rounded"

                page={page}
                onChange={handlePageChange}
                count={totalPages || 1} // Use backend pagination instead of local slice
                color="standard"
                siblingCount={0}
                boundaryCount={0}
                sx={{
                  "& .MuiPaginationItem-root": {
                    backgroundColor: "#EBEBEB", // Default background for inactive pages
                    color: "#000000", // Default text color for inactive pages
                  },
                  "& .MuiPaginationItem-page.Mui-selected": {
                    backgroundColor: "#000000", // Active page background
                    color: "white", // Active page text color
                  },
                  "& .MuiPaginationItem-ellipsis, & .MuiPaginationItem-icon": {
                    color: "#000000", // Change color of dots and arrows
                  }
                }}
                
              />
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default GenericTable;
