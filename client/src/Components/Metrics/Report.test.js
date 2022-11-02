import React from "react";
import ReactDOM from "react-dom/client";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import { useState, useEffect } from "react";
import "jest-canvas-mock";
import $ from "jquery";
import Metrics from "./index.jsx";
import ReportTable from "./Report_Table.jsx";
import Tasks from "./Tasks.jsx";
import { ReportPieChart } from "./Report_PieChart.jsx";
import { ReportBarChart } from "./Report_BarChart.jsx";
import { mockData, mockState } from "./mockData/tableData.js";
import renderer from "react-test-renderer";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

describe("Report Metric Test Suite", () => {
  describe("Testing Report Table Rendering", () => {
    it("should have three table headers and test data information", () => {
      render(<ReportTable data={mockData} />);
      expect(screen.getByText("Task")).toBeInTheDocument();
      expect(screen.getByText("Category")).toBeInTheDocument();
      expect(screen.getByText("Duration")).toBeInTheDocument();
      expect(screen.getByText("Meeting")).toBeInTheDocument();
      expect(screen.getByText("Shop")).toBeInTheDocument();
      expect(screen.getByText("Buy water")).toBeInTheDocument();
      expect(screen.getByText("Morning debrief")).toBeInTheDocument();
      expect(screen.getByText("PM gym")).toBeInTheDocument();
    });
    it("should sort table alphabetically by task name", () => {
      const { container } = render(<ReportTable data={mockData} />);
      fireEvent.mouseOver(container.querySelector("th"));

      const menuIcon = container.querySelector("th");

      var unsortedTable = $("#reportTable tr")
        .map(function (i, v) {
          var $td = $("td", this);
          return {
            id: ++i,
            task: $td.eq(0).text(),
            category: $td.eq(1).text(),
            duration: $td.eq(2).text(),
          };
        })
        .get();

      //first click
      fireEvent.click(menuIcon);

      var sortedASCByTaskName = $("#reportTable tr")
        .map(function (i, v) {
          var $td = $("td", this);
          return {
            id: ++i,
            task: $td.eq(0).text(),
            category: $td.eq(1).text(),
            duration: $td.eq(2).text(),
          };
        })
        .get();

      expect(unsortedTable[1].task).toBe(" Buy water");
      expect(sortedASCByTaskName[1].task).toBe(" AM gym");

      //second click
      fireEvent.click(menuIcon);

      var sortedDESByTaskName = $("#reportTable tr")
        .map(function (i, v) {
          var $td = $("td", this);
          return {
            id: ++i,
            task: $td.eq(0).text(),
            category: $td.eq(1).text(),
            duration: $td.eq(2).text(),
          };
        })
        .get();

      // console.log("sorted", sortedDESByTaskName);
      expect(sortedDESByTaskName[1].task).toBe(" trash out");
    });
  });

  describe("Testing dropdown menus", () => {
    it("should have 3 options for time frame dropdown selection", () => {
      render(<Metrics data={mockState} />);
      var options = $("select").map(function (i, v) {
        var $option = $("option", this);
        return {
          id: ++i,
          firstOption: $option.eq(0).text(),
          secondOption: $option.eq(1).text(),
          thirdOption: $option.eq(2).text(),
          fourthOption: $option.eq(3).text(),
        };
      });

      expect(options[0].firstOption).toBe("Today");
      expect(options[0].secondOption).toBe("This Week");
      expect(options[0].thirdOption).toBe("This Month");
      expect(options[0].fourthOption).toBe("Custom");
    });
  });

  describe("Test creation of two charts with test data", () => {
    let state = {
      allData: mockData,
      categoriesANDcolor: [
        ["Shop", "#86dff2"],
        ["Meeting", "#d6e9f2"],
        ["Workout", "#8539b8"],
        ["Misc", "#7ee9cc"],
        ["Workout", "#8539b8"],
      ],
      categories: ["All", "Shop", "Meeting", "Workout", "Misc"],
      timeFrame: "Today",
      category: "All",
      totalTime: "30 min",
      customStartDate: "2022-01-01",
      customEndDate: "2023-12-30",
    };

    it("renders pie chart successfully", () => {
      const pieChart = renderer
        .create(<ReportPieChart data={state} />)
        .toJSON();
      expect(pieChart).toMatchSnapshot();

      const testRenderer = renderer.create(<ReportPieChart data={state} />);
      const testInstance = testRenderer.root;
      expect(testInstance.findByType(ReportPieChart).props.data).toEqual(state);
    });

    it("renders bar chart successfully", () => {
      const barChart = renderer.create(
        <ReportBarChart data={state} />
      ).children;
      expect(barChart).toMatchSnapshot();

      const testRenderer = renderer.create(<ReportBarChart data={state} />);
      const testInstance = testRenderer.root;
      expect(testInstance.findByType(ReportBarChart).props.data).toEqual(state);
    });
  });
});
