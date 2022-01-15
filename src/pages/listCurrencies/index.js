import React, { useState, useEffect, memo } from "react";
import UnstyledTable from "../../components/Table";
import axios from "axios";
import { useSelector } from "react-redux";
import DescriptionAlerts from "../../components/Alert";
import CircularIndeterminate from "../../components/Progress";
import { Link } from "react-router-dom";
import Title from "../../components/Title";
import "./style.css";

const MainPage = () => {
  const [data, setData] = useState([]);
  const [textError, setTextError] = useState("");

  const page = useSelector((state) => state.page);
  const rowsPerPage = useSelector((state) => state.rowsPerPage);

  useEffect(() => {
    axios
      .get("https://www.nbrb.by/api/exrates/currencies")
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
  }, []);

  return (
    <>
      <div className="container-main-page">
        <Link className="link" to="/rates">
          Курсы валют
        </Link>
        <Title
          name={"title"}
          text={`Перечень иностранных валют, по отношению к которым
       Национальный банк Республики Беларусь, устанавливает официальный курс беларусcкого рубля.`}
        />
        {textError && <DescriptionAlerts textAlert={textError} />}
        {data.length ? (
          <UnstyledTable
            tr={
              <tr>
                <th>Внутренний код</th>
                <th>Цифровой код</th>
                <th>Наименование на русском</th>
                <th>Наименование на английском</th>
                <th>Количество единиц иностранной валюты</th>
              </tr>
            }
            data={data}
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
                    <td style={{ maxWidth: 130 }} align="right">
                      {data.Cur_ID}
                    </td>
                    <td style={{ maxWidth: 130 }} align="right">
                      {data.Cur_Code}
                    </td>
                    <td style={{ maxWidth: 200 }} align="right">
                      {data.Cur_Name}
                    </td>
                    <td style={{ maxWidth: 200 }} align="right">
                      {data.Cur_Name_Eng}
                    </td>
                    <td style={{ maxWidth: 200 }} align="right">
                      {data.Cur_Scale}
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          />
        ) : (
          <CircularIndeterminate />
        )}
      </div>
    </>
  );
};

export default memo(MainPage);
