# Encompass
A mobile-first productivity app that allows users to manage their tasks and appointments. 
> Now you can - create tasks, make appointments, update and share your calendar and, evaluate your productivity ... all in one app!

## Tech Stack

<div align='center'>

<img src="https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&style=for-the-badge&logoColor=black">
<img src="https://shields.io/badge/Jest-C21325?logo=jest&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Babel-F9DC3E?logo=babel&logoColor=black&style=for-the-badge">
<img src="https://shields.io/badge/Node-339933?logo=node.js&logoColor=black&style=for-the-badge">
<img src="https://shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge">
<img src="https://shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Jquery-0769AD?logo=jquery&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Webpack-8DD6F9?logo=webpack&logoColor=black&style=for-the-badge">
<img src="https://shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/.Env-ECD53F?logo=.env&logoColor=black&style=for-the-badge">
<img src="https://shields.io/badge/MaterialUI-007FFF?logo=mui&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Passport-34E27A?logo=passport&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Swiper-6332F6?logo=swiper&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Npm-CB3837?logo=npm&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Reacttestinglibrary-E33332?logo=TestingLibrary&logoColor=white&style=for-the-badge">
<img src="https://shields.io/badge/Fullcalendar-0088CC?&&style=for-the-badge">
<img src="https://shields.io/badge/Formik-2C3454?&&style=for-the-badge">
 
</div>

## Contributors
- [Filimon Kiros](https://github.com/FilimonK-Git)
- [Othniel Chan](https://github.com/othnielhr)
- [David Lim](https://github.com/davidlim7223)
- [Michael Manzo](https://github.com/mpmanzo)
- [Jason Novacovici](https://github.com/JNovacovici)
- [Aaron Wang](https://github.com/Aaronw7)
- [Joanna Zhang](https://github.com/lyonqingmango)

## What Encompass is all about
* A productivity app that enables users to manage their time and activities through:
  * Customizable calendar with drag, drop and share features 
  * Seamless integration of new events and tracking similar categories 
  * Detailed and customizable report to boost productivity

![landingPage](https://media.giphy.com/media/D1aIZBiOWyM9gdNhjM/giphy.gif)

## Table of Contents
1. [Authentication](#authentication)
2. [Navigation](#navigation)
3. [Calendar](#calendar)
4. [Appointments](#appointments)
5. [Task and Category Form](#create-new-tasks-and-categories)
6. [Task List](#task-list)
7. [Metrics](#metrics)

### Authentication
> Simple and encrypted Log-in & Sign-up

<Details>

* Leverages Postgres' hashing and salting to protect user information
* Offers cookies / localstorage to keep user logged in
* Uses native alerts to inform the user upon incorrect credential entry 

</Details>
 
![Sign-up](https://media.giphy.com/media/s9dL1P50Hg7BUd18L1/giphy.gif) ..... ![Sign-in](https://media.giphy.com/media/LdeCiV68ix6UiYxiLm/giphy.gif)

### Navigation
> Clean and easy to use navigation bar to help the user quickly access what they need from our application

<Details>

* Home Icon: Takes you back to the main page of the calendar (as a signed in user)
* Checkmark Icon: Takes you to the main view of all tasks and the forms to create new tasks or categories
* Bar Chart Icon: Takes you to the metrics for a more detailed look about your tasks and categories
* Exit Icon: Logs off the user and redirects to the landing page that is displayed for non-logged in users
 
</Details>

![navigation](https://media.giphy.com/media/CXm2mWH5T4lBzd0kna/giphy.gif)

### Calendar
> Simple calendar with day/week/month views that lets the user easily schedule/ reschedule tasks

<Details>

* Provides users with easy access to unscheduled tasks in the form of cards.
* Integrated with draggable to allow drag and drop of unscheduled task cards onto the calendar for easy scheduling.
* Can reschedule or extend the end time of a scheduled task by simply dragging the event from one time slot to another.
* Each scheduled event on the calendar can be clicked on to view or edit more details.
 
</Details>

### Appointments
> User to user calendar sharing and interacting

<Details>

* Provides users with an icon button which opens a modal to add appointments onto their calendar.
* Offers two icon buttons for tasks or appointments calendar to be shared to other users via the provided link.
* On viewing the shared appointments calendar, other users may book available appointments which automatically adds the event to their calendar.

</Details>

![vid1 (2)](https://user-images.githubusercontent.com/84869743/199594771-ff16205b-0b37-429d-9969-676dc2a1f059.gif) ![share](https://media.giphy.com/media/wiu7Iphz55KYqdn1qI/giphy.gif) ![book](https://media.giphy.com/media/JmlqhJyOVZDPWuQH6U/giphy.gif)

### Create new tasks and categories
> Now with more customizable options!

<Details>

* Powered by Formik, allow the user to name their task, choose and create categories, give it a set time, and extra description if needed
* Customizable categories where you can give the new category name a color you can identify with and recognize when looking quickly at your calendar
* Instant feedback on the creation of new cateogires and tasks, no reload required from the user

</Details>

![newTask](https://media.giphy.com/media/2g4chBn3c627qewSXy/giphy.gif)


### Task List
> List of all existing tasks in the database for the user and can be interacted with for more information or changes

<Details>

* Filter tasks based on complete or incomplete, with the ability to reset back to showing all tasks
* Checkmark boxes to easily showcase which tasks are considered complete. Can be interacted with to update in real time if they are complete or incomplete
* Comment bubble icon is interactable to have a pop up modle showcase more information about the task, as well as delete the task if the user chooses to do so
* Any tasks not 'scheduled' with a start time will show up by the calendar with matching color related to the category and color the user specified

</Details>

![taskList](https://media.giphy.com/media/8OHsGiHA2xsRC1S5F3/giphy.gif)


### Metrics
> Analytical report to help visualize time allocation

<Details>

* Offers a downloadable (PDF) report metrics of completed tasks
* Customizable by time frame and categories list
* Descriptive text indicating the number of tasks completed, including aggreate duration
* Pie chart displays time percentage allocated per category (chart legend clickable to add/remove a category from chart)
* Upon a specific category elected, bar chart displays time (in min) taken to complete each task in the category
* A sortable table showing a list of completed tasks with an editable duration's column (user can update the time spent on tasks)


</Details>

![chart1](https://media.giphy.com/media/uQM8jJle9tzRdG1ZE9/giphy.gif) ![table1](https://media.giphy.com/media/2sVBiaT5i4CSI9orFK/giphy.gif) ![custom](https://media.giphy.com/media/qQIHFO3lPHhevfFptZ/giphy.gif)

## Installation
1. Fork and/or clone the project.
2. Install dependencies required to run the project:
```
npm install
```
3. Initialize Webpack (with Bundle):
```
npm run webpack
```
4. Launch the local server:
```
npm start
```
*When using locally, make sure postgreSQL is connected and correct for the route variables*
