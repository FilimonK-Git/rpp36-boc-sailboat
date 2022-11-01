# Encompass
This was a month long project where our team completed an MVP full stack application for a new client that we worked with closely
> Interact, create tasks, and form your calendar however it suits your needs!

## Tech Stack

<div align='center'>

<img src="https://raw.githubusercontent.com/devicons/devicon/1119b9f84c0290e0f0b38982099a2bd027a48bf1/icons/react/react-original-wordmark.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original-wordmark.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/babel/babel-original.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/jest/jest-plain.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/jquery/jquery-original-wordmark.svg" width="50">
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" width="75">
<img src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png" width="100">
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Axios_%28computer_library%29_logo.svg/1280px-Axios_%28computer_library%29_logo.svg.png" width="100">
<img src="https://user-images.githubusercontent.com/4060187/61057426-4e5a4600-a3c3-11e9-9114-630743e05814.png" width="50">
<img src="https://i.imgur.com/RQ4ZoWc.png" width="100">
<img src="https://i.imgur.com/ty4pyuh.png" width="50">
<img src="https://mui.com/static/logo.png" width="50">
<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--kyypBiVD--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/9ngdmhfexbyafu2p5cll.png" width="100">


</div>

## Contributors
- [Othniel Chan](https://github.com/othnielhr)
- [Filimon Kiros](https://github.com/FilimonK-Git)
- [David Lim](https://github.com/davidlim7223)
- [Michael Manzo](https://github.com/mpmanzo)
- [Jason Novacovici](https://github.com/JNovacovici)
- [Aaron Wang](https://github.com/Aaronw7)
- [Joanna Zhang](https://github.com/lyonqingmango)

## What Encompass is all about
- Gives the user the ability to create, track, and connect the combination of tasks and utilize a calendar to display tasks
- More customization in colors and categories
- Detailed metrics about the tasks you do from preset timelines, to creating your own time period

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
> Simple Log-in & Sign-up, asking for little information and using encryption to protect the users information that is used to create an account

<Details>

* Leveraging Postgres' hashing and salting to protect user information
* Offer cookies / localstorage to keep user logged in
* Using native alerts to inform the user when their information is incorrect 

</Details>

<div align="left">
 
![Sign-up](https://media.giphy.com/media/s9dL1P50Hg7BUd18L1/giphy.gif)

![Sign-in](https://media.giphy.com/media/LdeCiV68ix6UiYxiLm/giphy.gif)

 </div>

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
>

<Details>



</Details>

### Appointments
> User to user calendar sharing and interacting

<Details>

* Provides users with an icon button which opens a modal to add appointments onto their calendar.
* Offers two icon buttons for tasks or appointments calendar to be shared to other users via the provided link.
* On viewing the shared appointments calendar, other users may book available appointments which automatically adds the event to their calendar.

</Details>

### Create new tasks and categories
>

<Details>



</Details>

### Task List
> List of all existing tasks in the database for the user and can be interacted with for more information or changes

<Details>

* Filter tasks based on complete or incomplete, with the ability to reset back to showing all tasks
* Checkmark boxes to easily showcase which tasks are considered complete. Can be interacted with to update in real time if they are complete or incomplete
* Comment bubble icon is interactable to have a pop up modle showcase more information about the task, as well as delete the task if the user chooses to do so
* Any tasks not 'scheduled' with a start time will show up by the calendar with matching color related to the category and color the user specified

</Details>

### Metrics
> Analytical report to help visualize time allocation

<Details>

* Offers a downloadable (PDF) report metrics of completed tasks
* Customizable by time frame and categories list
* Descriptive text indicating the number of tasks completed, including aggreate duration taken
* Pie chart displays time percentage allocated per category (chart legend clickable to add/remove a category from chart)
* Upon a specific category elected, bar chart displays time (in min) taken to complete each task in the category
* A sortable table showing a list of completed tasks with an editable duration's column (user can update the time spent on tasks)


</Details>

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
