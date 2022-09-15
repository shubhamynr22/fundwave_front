import React, { useEffect, useState } from "react";
import tableConfig from "./config.js";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Dashboard.scss";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import Dropdown from "./../../components/Dropdown";

import service from "./../../util/axiosConfig";
import BarChart from "../../components/Chart/BarChart.jsx";
import moment from "moment";

const Dashboard = () => {
  const defaultFrom = {
    year: 2022,
    month: 9,
    day: 14,
  };
  const defaultTo = {
    year: 2022,
    month: 9,
    day: 15,
  };
  const defaultValue = {
    from: defaultFrom,
    to: defaultTo,
  };

  const [data, setData] = useState([]);
  const [inputField, setInputField] = useState({
    periodtype: "",
    page: "",
  });

  const handleChange = (value, property) => {
    setInputField({
      ...inputField,
      [property]: value,
    });
  };

  const [selectedDayRange, setSelectedDayRange] = useState(defaultValue);
  const [totalVisits, setTotalVisits] = useState();
  const [files, setFiles] = useState();

  useEffect(() => {
    (async () => {
      const res = await service.get("http://localhost:9292/visits");

      // if (res?.data?.success) {
      setData(res.data);
      // }
    })();
  }, []);

  useEffect(() => {
    console.log(inputField);
    console.log(data)
    const filtered = data.filter((el) => {
      const month = moment(el.perioddate).month();
      if (
        (inputField.periodtype && el.periodtype === inputField.periodtype) ||
        (inputField.page && el.page === inputField.page) ||
        (selectedDayRange.from.month > month &&
          selectedDayRange?.to?.month < month)
      ) {
        return el;
      }
    });
    console.log(filtered)
    let sum = 0;
    filtered.map((el) => {
      sum += el.visits;
    });

    setTotalVisits(sum);
    setData(filtered);
  }, [inputField]);

  const createData = (name, calories, fat) => {
    return { name, calories, fat };
  };

  const rows = [
    createData(20000, " 2020 - 06 - 30", "LQ"),
    createData(2000, "2020 - 09 - 30", "LQ"),
    createData(10000, "2020 - 12 - 30", "LQ"),
  ];

  const periodTypeDropdown = [
    {
      id: "LM",
      name: "LM",
    },

    {
      id: "LQ",
      name: "LQ",
    },
    {
      id: "LTM",
      name: "LTM",
    },
  ];

  const pageDropdown = [
    {
      id: "docs",
      name: "Docs",
    },

    {
      id: "carrers",
      name: "Carrers",
    },
    {
      id: "home",
      name: "Home",
    },
  ];
  console.log(selectedDayRange);

  const handleCsvUpload = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.append("file", files[0]);

    const res = await service.post("http://localhost:9292/visits/upload", data);

    console.log(res.data);
  };

  return (
    <div className="dashboard__container">
      <h1>Dashboard</h1>
      <div className="dashboard_header">
        <Calendar
          value={selectedDayRange}
          onChange={setSelectedDayRange}
          colorPrimary="#0fbcf9"
          colorPrimaryLight="rgba(75, 207, 250, 0.4)"
          shouldHighlightWeekends
          calendarClassName="calender"
        />

        <div className="input_container">
          <div className="input_container__dropdowns">
            <Dropdown
              items={periodTypeDropdown}
              change={(val) => handleChange(val, "periodtype")}
              className=""
              title="Policy Type"
            />

            <Dropdown
              items={pageDropdown}
              change={(val) => handleChange(val, "page")}
              className=""
              title="Pages"
            />
          </div>
          <div className="upload_csv">
            <div>
              <p>Uplaod CSV</p>
              <input
                className="upload_csv"
                type="file"
                onChange={(e) => setFiles(e.target.files)}
              />
            </div>
            <button onClick={handleCsvUpload}>Upload</button>
          </div>
        </div>
      </div>

      <div>
        <BarChart data={data} setData={setData} />
      </div>

      {/* <div> */}
      <Paper sx={{ width: "100%", overflow: "hidden", marginTop: 10 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="simple table" p>
            <TableHead>
              <TableRow className="table_row ">
                <TableCell>Visits</TableCell>
                <TableCell>Period Date</TableCell>
                <TableCell>Period Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow
                  key={row.id.timestamp}
                  sx={{ "&:last-chi/ld td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.visits}
                  </TableCell>
                  <TableCell>
                    {moment(new Date(row.perioddate)).format("DD/MM/YYYY")}
                  </TableCell>
                  <TableCell>{row.periodtype}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <div>Total Visits:{totalVisits}</div>
    </div>
    // </div>
  );
};

export default Dashboard;
