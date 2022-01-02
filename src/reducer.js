import { format } from "date-fns";

const initialState = {
  page: 0,
  rowsPerPage: 5,
  date: format(new Date(), "yyyy-MM-dd"),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "CHANGE_ROWS_PER_PAGE":
      return {
        ...state,
        rowsPerPage: action.payload,
      };
    case "CHANGE_ROWS_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "CHANGE_DATE":
      return {
        ...state,
        date: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
