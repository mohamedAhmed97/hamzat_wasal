import React ,{Component} from 'react';
import ReactDOM from "react-dom";
import MaterialTable from "material-table";
import SvgIcon from "@material-ui/core/SvgIcon"
export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      {
        title: 'Birth Place',
        field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ],
    data: [
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      {
        name: 'Zerya Betül',
        surname: 'Baran',
        birthYear: 2017,
        birthCity: 34,
      },
    ],
  });

  return (
    <div style={{ maxWidth: "100%" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    <MaterialTable
      columns={[
        { title: "name", field: "name" },
        { title: "Soyadı", field: "surname" },
        { title: "Doğum Yılı", field: "birthYear", type: "numeric" },
        {
          title: "Doğum Yeri",
          field: "birthCity",
          lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
        }
      ]}
      data={[
        { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 }
      ]}
      title="Demo Title"
    />
  </div>
  );
}