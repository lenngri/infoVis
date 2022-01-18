# Information Visualization Project

## Table of contents
* [General Info](#general-info)
* [Project Description](#project-description)
* [Technologies](#technologies)
* [Features](#features)
* [Sources](#sources)
* [Project Status](#project-status)
* [Setup](#setup)

## General Info
LMU Munich Project Course, Information Visualization, Lecturer: Prof. Dr. Andreas Butz

Team Members: Lennart Grigoleit, Hendrik Geiger, Manuel Riegel, Mirjam Feigl, Anna Hartmeyer

## Project Description
The aim of the project is to visualize research & development expenditures in dependency with patent registrations in Europe. The Web Application will display this dependency per country and it's development over time by visualizing 
a cholopleth map of Europe, a Bubble Chart and interactive features. 

## Technologies
The Web Application will be build with d3.js and React

## Features

- [x] General
  - [x] Short description of the page
  - [ ] Exhaustive description of data and methodology
  - [ ] Usage hints for the visualisations
- [x] Choropleth
  - [x] Registered Patents View
  - [x] R&D Expenditure View
  - [x] Legend
  - [x] Highlight on hover in Map and Bubble Chart
  - [x] Detail on demand through tooltips
- [x] Bubble Chart
  - [x] Highlight on hover in Bubble Chart and Map
  - [x] Detail on demand through tooltips
- [x] Time slider
  - [x] Manual sliding
  - [ ] Auto Play
- [ ] Detail on demand
  - [ ] Detail window on Click of Charts giving details on patent registration categories
  - [ ] Visualization of details on demand (pie-chart / bar chart)
- [ ] Highlighting of countries through list on the left side for better orientation
- [ ] Filtering of countries through hover over Choropleth legend
- [ ] Visualization and / or data export


## Sources

### Datasets
#### Primary Data Set
Worldwide Patent Data
https://www.worldwide-patents.com/download

#### Secondary Data Set
Research & development expenditure, by sectors of performance
https://ec.europa.eu/eurostat/databrowser/view/tsc00001/default/table?lang=en


## Project Status
in development


## Setup

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

#### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

#### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

#### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

#### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

#### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

#### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
