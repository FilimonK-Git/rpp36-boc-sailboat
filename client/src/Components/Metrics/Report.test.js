import React from "react";
import ReactDOM from "react-dom/client";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import { useState, useEffect } from "react";
import "jest-canvas-mock";

import Metrics from "./index.jsx";
import ReportTable from "./Report_Table.jsx";
import Tasks from "./Tasks.jsx";
import { ReportPieChart } from "./Report_PieChart.jsx";
import { ReportBarChart } from "./Report_BarChart.jsx";
import { mockData } from "./mockData/tableData.js";

describe("Report Metric Test Suite", () => {
  let temporarySandBox;
  beforeEach(() => {
    temporarySandBox = document.createElement("div");
    document.body.appendChild(temporarySandBox);
  });
  afterEach(() => {
    document.body.removeChild(temporarySandBox);
    temporarySandBox = null;
  });

  // =========================
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
    it("should invoke ", async () => {
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
      // const mockFunc1 = jest.fn();
      act(() => {
        ReactDOM.createRoot(temporarySandBox).render(
          <>
            <Metrics />
            <ReportTable data={mockData} />
            <ReportPieChart data={state} />
            <ReportBarChart data={state} />
          </>
        );
      });
      expect(screen.getByText("Task")).toBeInTheDocument();
      // let btn = temporarySandBox.querySelector(".timeUpdater");
      // console.log("bbb", renderedBTN);
      // await userEvent.click(btn);
      // expect(mockFunc1).toHaveBeenCalled();
      // expect(renderedBTN.className).toBe("outfitRemoveBTN");
      // expect(renderedBTN.innerHTML).toBe("✖");
    });
  });
});
