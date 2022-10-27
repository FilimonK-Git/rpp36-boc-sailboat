import React from 'react';
import {Outlet,Link } from "react-router-dom";
import BarChartIcon from '@mui/icons-material/BarChart';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';

const Navbar= () =>{
  return (
  <div className ="header">
    <ul>
      <li>
        <Link to="/">
          <Tooltip title="Home" placement="bottom" arrow>
            <HomeIcon />
          </Tooltip>
        </Link>
      </li>
      <li>
        <Link to="/metrics">
          <Tooltip title="Metrics" placement="bottom" arrow>
            <BarChartIcon/>
          </Tooltip>
        </Link>
      </li>
      <li>
        <Link to="/forms">
          <Tooltip title="To-dos" placement="bottom" arrow>
            <AddTaskIcon/>
          </Tooltip>
        </Link>
      </li>
      <li>
        <Link to="/settings">
          <Tooltip title="Create Appointment" placement="bottom" arrow>
            <SettingsApplicationsIcon/>
          </Tooltip>
        </Link>
      </li>
      <li>
        <Link to="/signout">
          <Tooltip title="Sign Out" placement="bottom" arrow>
            <ExitToAppIcon/>
          </Tooltip>
        </Link>
      </li>
      <Outlet />
    </ul>
  </div>
  );
}
export default Navbar;