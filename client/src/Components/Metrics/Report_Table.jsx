import React from "react";
import Tasks from "./Tasks.jsx";

class ReportTable extends React.Component {
  constructor(props) {
    super(props);
  }

  sortTable(n) {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("reportTable");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].childNodes[n];
        y = rows[i + 1].childNodes[n];
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  render() {
    return (
      <table id="reportTable">
        <thead>
          <tr>
            <th
              style={{ fontWeight: "bold" }}
              onClick={(e) => this.sortTable(0)}
            >
              Task
            </th>
            <th
              style={{ fontWeight: "bold" }}
              onClick={(e) => this.sortTable(1)}
            >
              Category
            </th>
            <th
              style={{ fontWeight: "bold" }}
              onClick={(e) => this.sortTable(2)}
            >
              Duration
            </th>
          </tr>
          {this.props.data.map((task, index) => (
            <Tasks
              task={task}
              key={index}
              timeUpdated={this.props.timeUpdated}
            />
          ))}
        </thead>
      </table>
    );
  }
}

export default ReportTable;
