import React, { memo, useCallback } from "react";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { useSelector, useDispatch } from "react-redux";

const Root = styled("div")`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    border-radius: 5rem;
    width: 100%;
  }

  td,
  th {
    text-align: left;
    padding: 8px;
  }
  td {
    color: #fff;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
  }
`;

const UnstyledTable = ({ tr, data, tBody }) => {
  const page = useSelector((state) => state.page);
  const rowsPerPage = useSelector((state) => state.rowsPerPage);

  const dispatch = useDispatch();

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = useCallback(
    (event, newPage) => {
      dispatch({
        type: "CHANGE_PAGE",
        payload: newPage,
      });
    },
    [dispatch]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      dispatch({
        type: "CHANGE_ROWS_PER_PAGE",
        payload: parseInt(event.target.value, 10),
      });
      dispatch({
        type: "CHANGE_ROWS_PAGE",
        payload: 0,
      });
    },
    [dispatch]
  );

  return (
    <Root sx={{ maxWidth: "100%" , border:{xs:'none', md:'1px solid red', borderRadius: '10px'}}}>
      <table aria-label="custom pagination table">
        <thead>{tr}</thead>
        {tBody}
        {emptyRows > 0 && (
          <tr style={{ height: 41 * emptyRows }}>
            <td colSpan={3} />
          </tr>
        )}
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              componentsProps={{
                select: {
                  "aria-label": "rows per page",
                },
                actions: {
                  showFirstButton: true,
                  showLastButton: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </tr>
        </tfoot>
      </table>
    </Root>
  );
};

export default memo(UnstyledTable);
