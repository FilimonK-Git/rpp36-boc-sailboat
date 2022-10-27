import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ReportPieChart } from "./Report_PieChart.jsx";
import { ReportBarChart } from "./Report_BarChart.jsx";
import ReportTable from "./Report_Table.jsx";

class Metrics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      categoriesANDcolor: [],
      categories: ["All"],
      timeFrame: "Today",
      category: "All",
      totalTime: "0 min",
      customStartDate: "2022-01-01",
      customEndDate: "2023-12-30",
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    axios
      .get("/completedTasks", {
        params: {
          timeRange: "Today",
          customRange: [this.state.customStartDate, this.state.customEndDate],
          catg: "All",
        },
      })
      .then((allCompletedToDos) => {
        let allData = allCompletedToDos.data.results;

        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }

        let chartLegend = [];
        let chartColors = [];
        for (let cat of categoriesANDcolor) {
          if (!chartLegend.includes(cat[0])) {
            chartLegend.push(cat[0]);
            chartColors.push(cat[1]);
          }
        }

        let catgDurations = {};
        for (let key of categories) {
          if (key !== "All") {
            catgDurations[key] = [];
          }
        }

        for (let key in catgDurations) {
          for (let i = 0; i < allData.length; i++) {
            if (key === allData[i].category) {
              catgDurations[key].push([
                allData[i].start_time,
                allData[i].end_time,
              ]);
            }
          }
        }

        let totalTimeSpent = 0;
        let chartData = [];
        for (let catg in catgDurations) {
          let catgTotalSec = 0;

          for (let i = 0; i < catgDurations[catg].length; i++) {
            let start = new Date(catgDurations[catg][i][0]);
            let end = new Date(catgDurations[catg][i][1]);

            let start_sec = start.getTime() / 1000;
            let end_sec = end.getTime() / 1000;
            let difference = Math.abs(start_sec - end_sec);
            catgTotalSec += difference;
          }

          catgDurations[catg].totalSec = catgTotalSec;
          chartData.push(catgTotalSec);
          catgDurations[catg].totalDuration = this.secondsToHms(catgTotalSec);
          totalTimeSpent += catgTotalSec;
        }
        catgDurations.totalTimeSpent = totalTimeSpent;
        let totalTime = this.secondsToHms(catgDurations.totalTimeSpent);

        let sortedCatg = [this.state.category];
        for (let catg of categories) {
          if (catg !== this.state.category) {
            sortedCatg.push(catg);
          }
        }

        // console.log("in cdm:", totalTime);
        this.setState({
          categoriesANDcolor,
          categories: sortedCatg,
          allData,
          totalTime,
        });
      })
      .catch((err) => {
        console.log("componentDidMount ERR", err);
      });
  }

  specifyCategory(input, timeR) {
    console.log("specifyCategory");
    axios
      .get("/completedTasksPerCatg", {
        params: {
          timeRange: timeR,
          customRange: [this.state.customStartDate, this.state.customEndDate],
          catg: input,
        },
      })
      .then((allCatgData) => {
        let allData = allCatgData.data.results;
        // this.setState({ allData }); NEW CHANGE FOR CRASH TEST

        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCatgData.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }
        // console.log("XX", categories);

        let chartLegend = [];
        let chartColors = [];
        for (let cat of categoriesANDcolor) {
          if (!chartLegend.includes(cat[0])) {
            chartLegend.push(cat[0]);
            chartColors.push(cat[1]);
          }
        }

        let catgDurations = {};
        for (let key of categories) {
          if (key !== "All") {
            catgDurations[key] = [];
          }
        }

        for (let key in catgDurations) {
          for (let i = 0; i < allData.length; i++) {
            if (key === allData[i].category) {
              catgDurations[key].push([
                allData[i].start_time,
                allData[i].end_time,
              ]);
            }
          }
        }

        let totalTimeSpent = 0;
        let chartData = [];
        for (let catg in catgDurations) {
          let catgTotalSec = 0;

          for (let i = 0; i < catgDurations[catg].length; i++) {
            let start = new Date(catgDurations[catg][i][0]);
            let end = new Date(catgDurations[catg][i][1]);

            let start_sec = start.getTime() / 1000;
            let end_sec = end.getTime() / 1000;
            let difference = Math.abs(start_sec - end_sec);
            catgTotalSec += difference;
          }

          catgDurations[catg].totalSec = catgTotalSec;
          chartData.push(catgTotalSec);
          catgDurations[catg].totalDuration = this.secondsToHms(catgTotalSec);
          totalTimeSpent += catgTotalSec;
        }
        catgDurations.totalTimeSpent = totalTimeSpent;
        let totalTime = this.secondsToHms(catgDurations.totalTimeSpent);

        this.setState({
          allData, // commented out above, added here
          categoriesANDcolor,
          // categories, //: sortedCatg,
          category: input,
          timeFrame: timeR,
          totalTime,
        });
      })
      .catch((err) => {
        console.log("specifyCategory ERR", err);
      });
  }

  secondsToHms(d) {
    console.log("secondsToHms");
    d = Number(d);
    let h = Math.floor(d / 3600);
    let m = Math.floor((d % 3600) / 60);
    let s = Math.floor((d % 3600) % 60);

    let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
    let mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
    let sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  specifyTimeframe(input, catg) {
    console.log("specifyTimeframe");
    if (input === "Custom") {
      this.setState({ timeFrame: input });
    } else {
      axios
        .get("/completedTasks", {
          params: {
            timeRange: input,
            customRange: [this.state.customStartDate, this.state.customEndDate],
            catg: catg,
          },
        })
        .then((allCompletedToDos) => {
          let allData = allCompletedToDos.data.results;
          let categoriesANDcolor = [];
          let categories = ["All"];
          for (let cat of allCompletedToDos.data.results) {
            categoriesANDcolor.push([cat.category, cat.color]);
            if (!categories.includes(cat.category)) {
              categories.push(cat.category);
            }
          }

          let chartLegend = [];
          let chartColors = [];
          for (let cat of categoriesANDcolor) {
            if (!chartLegend.includes(cat[0])) {
              chartLegend.push(cat[0]);
              chartColors.push(cat[1]);
            }
          }

          let catgDurations = {};
          for (let key of categories) {
            if (key !== "All") {
              catgDurations[key] = [];
            }
          }

          for (let key in catgDurations) {
            for (let i = 0; i < allData.length; i++) {
              if (key === allData[i].category) {
                catgDurations[key].push([
                  allData[i].start_time,
                  allData[i].end_time,
                ]);
              }
            }
          }

          let totalTimeSpent = 0;
          let chartData = [];
          for (let catg in catgDurations) {
            let catgTotalSec = 0;

            for (let i = 0; i < catgDurations[catg].length; i++) {
              let start = new Date(catgDurations[catg][i][0]);
              let end = new Date(catgDurations[catg][i][1]);

              let start_sec = start.getTime() / 1000;
              let end_sec = end.getTime() / 1000;
              let difference = Math.abs(start_sec - end_sec);
              catgTotalSec += difference;
            }

            catgDurations[catg].totalSec = catgTotalSec;
            chartData.push(catgTotalSec);
            catgDurations[catg].totalDuration = this.secondsToHms(catgTotalSec);
            totalTimeSpent += catgTotalSec;
          }
          catgDurations.totalTimeSpent = totalTimeSpent;
          let totalTime = this.secondsToHms(catgDurations.totalTimeSpent);

          this.setState({
            categoriesANDcolor,
            categories,
            allData,
            timeFrame: input,
            totalTime,
          });
        })
        .catch((err) => {
          console.log("specifyTimeframe ERR", err);
        });
    }
  }

  timeUpdated(input) {
    console.log("timeUpdated");
    if (this.state.category === "All") {
      axios
        .get("/completedTasks", {
          params: {
            timeRange: this.state.timeFrame,
            customRange: [this.state.customStartDate, this.state.customEndDate],
            catg: "All",
          },
        })
        .then((allCompletedToDos) => {
          let allData = allCompletedToDos.data.results;
          let categoriesANDcolor = [];
          let categories = ["All"];
          for (let cat of allCompletedToDos.data.results) {
            categoriesANDcolor.push([cat.category, cat.color]);
            if (!categories.includes(cat.category)) {
              categories.push(cat.category);
            }
          }

          let chartLegend = [];
          let chartColors = [];
          for (let cat of categoriesANDcolor) {
            if (!chartLegend.includes(cat[0])) {
              chartLegend.push(cat[0]);
              chartColors.push(cat[1]);
            }
          }

          let catgDurations = {};
          for (let key of categories) {
            if (key !== "All") {
              catgDurations[key] = [];
            }
          }

          for (let key in catgDurations) {
            for (let i = 0; i < allData.length; i++) {
              if (key === allData[i].category) {
                catgDurations[key].push([
                  allData[i].start_time,
                  allData[i].end_time,
                ]);
              }
            }
          }

          let totalTimeSpent = 0;
          let chartData = [];
          for (let catg in catgDurations) {
            let catgTotalSec = 0;

            for (let i = 0; i < catgDurations[catg].length; i++) {
              let start = new Date(catgDurations[catg][i][0]);
              let end = new Date(catgDurations[catg][i][1]);

              let start_sec = start.getTime() / 1000;
              let end_sec = end.getTime() / 1000;
              let difference = Math.abs(start_sec - end_sec);
              catgTotalSec += difference;
            }

            catgDurations[catg].totalSec = catgTotalSec;
            chartData.push(catgTotalSec);
            catgDurations[catg].totalDuration = this.secondsToHms(catgTotalSec);
            totalTimeSpent += catgTotalSec;
          }
          catgDurations.totalTimeSpent = totalTimeSpent;
          let totalTime = this.secondsToHms(catgDurations.totalTimeSpent);

          this.setState({ categoriesANDcolor, categories, allData, totalTime });
        })
        .catch((err) => {
          console.log("timeUpdated ERR", err);
        });
    } else {
      this.specifyCategory(input, this.state.timeFrame);
    }
  }

  customStartDate(input) {
    console.log("customStartDate");
    // console.log("star", input);
    this.setState({ customStartDate: input });
  }

  customEndDateAndSearch(customEndDate, catg) {
    console.log("customEndDateAndSearch");
    // console.log("end", customEndDate, catg); // upon last input, seacxrh db

    axios
      .get("/completedTasks", {
        params: {
          timeRange: "Custom",
          customRange: [this.state.customStartDate, customEndDate],
          catg: catg,
        },
      })
      .then((allCompletedToDos) => {
        let allData = allCompletedToDos.data.results;
        let categoriesANDcolor = [];
        let categories = ["All"];
        for (let cat of allCompletedToDos.data.results) {
          categoriesANDcolor.push([cat.category, cat.color]);
          if (!categories.includes(cat.category)) {
            categories.push(cat.category);
          }
        }

        let chartLegend = [];
        let chartColors = [];
        for (let cat of categoriesANDcolor) {
          if (!chartLegend.includes(cat[0])) {
            chartLegend.push(cat[0]);
            chartColors.push(cat[1]);
          }
        }

        let catgDurations = {};
        for (let key of categories) {
          if (key !== "All") {
            catgDurations[key] = [];
          }
        }

        for (let key in catgDurations) {
          for (let i = 0; i < allData.length; i++) {
            if (key === allData[i].category) {
              catgDurations[key].push([
                allData[i].start_time,
                allData[i].end_time,
              ]);
            }
          }
        }

        let totalTimeSpent = 0;
        let chartData = [];
        for (let catg in catgDurations) {
          let catgTotalSec = 0;

          for (let i = 0; i < catgDurations[catg].length; i++) {
            let start = new Date(catgDurations[catg][i][0]);
            let end = new Date(catgDurations[catg][i][1]);

            let start_sec = start.getTime() / 1000;
            let end_sec = end.getTime() / 1000;
            let difference = Math.abs(start_sec - end_sec);
            catgTotalSec += difference;
          }

          catgDurations[catg].totalSec = catgTotalSec;
          chartData.push(catgTotalSec);
          catgDurations[catg].totalDuration = this.secondsToHms(catgTotalSec);
          totalTimeSpent += catgTotalSec;
        }
        catgDurations.totalTimeSpent = totalTimeSpent;
        let totalTime = this.secondsToHms(catgDurations.totalTimeSpent);

        this.setState({
          categoriesANDcolor,
          categories,
          allData,
          timeFrame: "Custom",
          category: catg,
          totalTime,
        });
      })
      .catch((err) => {
        console.log("customEndDateAndSearch ERR", err);
      });
  }

  printDocument() {
    console.log("printDocument");
    const printable = document.getElementById("Print");
    html2canvas(printable, {
      scale: 1,
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "JPEG", 0, 0);
        pdf.save("Report.pdf");
      })
      .catch((err) => {
        console.log("printDocument ERR", err);
      });
  }

  render() {
    // console.log("test", this.state);
    return (
      <div id="Print">
        <br></br>
        <hr></hr>
        <div className="taskDescription">
          {this.state.totalTime ? (
            <div>
              You have <em>{this.state.allData.length}</em> tasks completed{" "}
              <em>{this.state.timeFrame}</em>. <br></br>You spent a total time
              of <b>{this.state.totalTime}</b>{" "}
            </div>
          ) : (
            <div>
              You have no tasks completed <em>{this.state.timeFrame}</em>.
            </div>
          )}
        </div>

        <hr></hr>
        <br></br>

        <div className="dropDownContainer">
          <div>
            <label htmlFor="timeframe">Time frame:</label>
            <select
              name="timeframe"
              id="timeframe"
              onChange={(e) => {
                this.specifyTimeframe(e.target.value, this.state.category);
              }}
            >
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="This Month">This Month</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
          {this.state.timeFrame === "Custom" ? (
            // <BasicDateTimePicker />
            <div>
              <div>
                <label htmlFor="customFrom">From: </label>
                <input
                  type="date"
                  id="customFrom"
                  name="customFrom"
                  onChange={(e) => {
                    this.customStartDate(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label htmlFor="customTo">To: </label>
                <input
                  type="date"
                  id="customTo"
                  name="customTo"
                  onChange={(e) => {
                    this.customEndDateAndSearch(
                      e.target.value,
                      this.state.category
                    );
                  }}
                ></input>
              </div>
            </div>
          ) : (
            // <div>mm</div>
            ""
          )}
          <br></br>
          <div>
            <label htmlFor="Category">Category:</label>
            <select
              name="Category"
              id="Category"
              onChange={(e) => {
                this.specifyCategory(e.target.value, this.state.timeFrame);
              }}
            >
              {this.state.categories.map((cat, i) => {
                return (
                  <option value={`${cat}`} key={i}>
                    {cat}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <br></br>

        {/* <hr></hr> */}
        {this.state.allData.length === 0 ? (
          <div>
            <img
              className="zeroTaskImg"
              src="https://media1.tenor.com/images/e38013fbff0156a3f2f5aab705af70e1/tenor.gif?itemid=26990487"
            />
          </div>
        ) : (
          <div>
            <div>
              <div>
                {this.state.category === "All" ? (
                  <ReportPieChart data={this.state} />
                ) : (
                  <ReportBarChart data={this.state} />
                )}
              </div>
              <br></br>
              <ReportTable
                data={this.state.allData}
                timeUpdated={this.timeUpdated.bind(this)}
              />

              {/* <hr></hr> */}
            </div>
            <br></br>
            <div className="reportPDFbtnDIV">
              <button
                className="reportPDFbtn"
                onClick={this.printDocument.bind(this)}
              >
                Download Report (PDF)
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Metrics;
