import React from "react";
import Tasks from "./Tasks.jsx";

// Just for development mode, temporarily hide warnings/errs to clearly see
// console.logs. REMOVE AFTER logs have been observed.
console.warn = console.error = () => {};

class ReportTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // show: false,
    };
  }

  // sortTable(n) {
  //   var table,
  //     rows,
  //     switching,
  //     i,
  //     x,
  //     y,
  //     shouldSwitch,
  //     dir,
  //     switchcount = 0;
  //   table = document.getElementById("myTable2");
  //   switching = true;
  //   // Set the sorting direction to ascending:
  //   dir = "asc";
  //   /* Make a loop that will continue until
  //   no switching has been done: */
  //   while (switching) {
  //     // Start by saying: no switching is done:
  //     switching = false;
  //     rows = table.rows;
  //     // console.log("rozzz", rows[0]); //.getElementsByTagName("tr"));
  //     console.log("rozzz", rows[0].childNodes[0].getElementsByTagName("td"));
  //     console.log("table", table.rows);
  //     /* Loop through all table rows (except the
  //     first, which contains table headers): */
  //     for (i = 1; i < rows.length - 1; i++) {
  //       // Start by saying there should be no switching:
  //       shouldSwitch = false;
  //       /* Get the two elements you want to compare,
  //       one from current row and one from the next: */
  //       x = rows[i].getElementsByTagName("td")[n];
  //       y = rows[i + 1].getElementsByTagName("td")[n];
  //       /* Check if the two rows should switch place,
  //       based on the direction, asc or desc: */
  //       // console.log("xxx", x);
  //       if (dir == "asc") {
  //         if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
  //           // If so, mark as a switch and break the loop:
  //           shouldSwitch = true;
  //           break;
  //         }
  //       } else if (dir == "desc") {
  //         if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
  //           // If so, mark as a switch and break the loop:
  //           shouldSwitch = true;
  //           break;
  //         }
  //       }
  //     }
  //     if (shouldSwitch) {
  //       /* If a switch has been marked, make the switch
  //       and mark that a switch has been done: */
  //       rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
  //       switching = true;
  //       // Each time a switch is done, increase this count by 1:
  //       switchcount++;
  //     } else {
  //       /* If no switching has been done AND the direction is "asc",
  //       set the direction to "desc" and run the while loop again. */
  //       if (switchcount == 0 && dir == "asc") {
  //         dir = "desc";
  //         switching = true;
  //       }
  //     }
  //   }
  // }

  render() {
    return (
      <table id="myTable2">
        <thead>
          <tr>
            <th
              style={{ fontWeight: "bold" }}
              //  onClick={this.sortTable.bind(0)}
            >
              {/* <div>Task</div> */}
              Task
            </th>
            <th style={{ fontWeight: "bold" }}>
              {/* <div>Category</div> */}
              Category
            </th>
            <th style={{ fontWeight: "bold" }}>
              {/* <div>Duration</div>*/}
              Duration
            </th>
          </tr>
          {this.props.data.map((task, index) => (
            <Tasks
              task={task}
              key={index}
              timeUpdated={this.props.timeUpdated}
              totalTimeCompletingTasks={this.props.totalTimeCompletingTasks}
            />
          ))}
        </thead>
      </table>
    );
  }
}

export default ReportTable;
