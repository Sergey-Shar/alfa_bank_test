import React, { useEffect, useState, memo } from "react";
import UnstyledTable from "../../components/Table";
import axios from "axios";
import { useSelector } from "react-redux";
import BasicDatePicker from "../../components/DatePicker";
import CircularIndeterminate from "../../components/Progress";
import DescriptionAlerts from "../../components/Alert";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import { format } from "date-fns";
import "./style.css";

const RatesDaily = () => {
  const [data, setData] = useState([]);
  const date = useSelector((state) => state.date);
  const [textError, setTextError] = useState("");

  const page = useSelector((state) => state.page);
  const rowsPerPage = useSelector((state) => state.rowsPerPage);

  useEffect(() => {
    axios
      .get(`https://www.nbrb.by/api/exrates/rates?ondate=${date}&periodicity=0`)
      .then((response) => {
        const [...currentData] = response.data;
        setData(currentData);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          setTextError(error.response.status);
          console.log(error.response.headers);
        } else {
          setTextError(error.message);
        }
      });
  }, [date]);

  return (
    <>
      <div className="container-rates-daly">
        <Link className="link" to={"/"}>
          Главная
        </Link>
        <Title
          text={`Официальный курс белорусского рубля по отношению к иностранным валютам,
           устанавливаемый Национальным банком Республики Беларусь ежедневно,
           на ${format(new Date(date), "dd.MM.yyyy")}`}
        />
        {textError && <DescriptionAlerts textAlert={textError} />}
        <div className="container-table">
          {data.length ? (
            <UnstyledTable
              data={data}
              tr={
                <tr>
                  <th>Наименование иностранной валюты</th>
                  <th>
                    Количество единиц иностранной валюты, буквенный код валюты
                  </th>
                  <th>Официальный курс</th>
                </tr>
              }
              tBody={
                <tbody>
                  {(rowsPerPage > 0
                    ? data.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : data
                  ).map((data) => (
                    <tr key={data.Cur_ID}>
                      <td style={{ width: 150 }} align="right">
                        {data.Cur_Name}
                      </td>
                      <td style={{ width: 260 }} align="right">
                        {`${data.Cur_Scale} ${data.Cur_Abbreviation}`}
                      </td>
                      <td style={{ width: 260 }} align="right">
                        {data.Cur_OfficialRate}
                      </td>
                    </tr>
                  ))}
                </tbody>
              }
            />
          ) : (
            <CircularIndeterminate />
          )}
          <BasicDatePicker />
        </div>
      </div>
    </>
  );
};

export default memo(RatesDaily);
