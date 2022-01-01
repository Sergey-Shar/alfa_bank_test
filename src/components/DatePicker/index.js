import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { format } from "date-fns";
import ruLocale from 'date-fns/locale/ru';
import { useDispatch } from "react-redux";

const localeMap = {
  ru: ruLocale,
};
const maskMap = {
  ru: '__.__.____',
};

const BasicDatePicker = () => {
  const [value, setValue] = React.useState(new Date());
  const dispatch = useDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['ru']}>
      <DatePicker sx={{ backgraundColor:'#fff'}}
        mask={maskMap['ru']}
        disableFuture
        label="На дату:"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          dispatch({
            type: "CHANGE_DATE",
            payload: format(new Date(newValue), "yyyy-MM-dd"),
          });
        }}
        renderInput={(params) => <TextField {...params} helperText={null} />}
      />
    </LocalizationProvider>
  );
}
export default BasicDatePicker