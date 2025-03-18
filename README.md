# COVID-19 Data Visualization

This project is a React-based interactive bar chart and Line Plot visualization of COVID-19 positive cases by state in the U.S. The chart is built using D3.js and supports features such as tooltips, zooming, sorting, filtering, and dynamic theming.

## Features

- **Interactive Bar Chart**: Displays COVID-19 cases per state.
- **Sorting**: Allows sorting data in ascending or descending order.
- **Tooltips**: Hover over bars to see exact case numbers.
- **Zoom & Pan**: Users can zoom in/out and pan across the chart.
- **Legend & Labels**: Shows a legend and numerical values above bars.
- **Dark/Light Mode**: Theme adapts dynamically based on selection.

## Tech Stack

- **React**: UI library for building components.
- **D3.js**: Data visualization library for rendering charts.
- **Redux**: Manages global state (sorting, theme, etc.).
- **CSS**: Custom styling for responsiveness and theming.

## Installation

To run this project locally, follow these steps:

### Prerequisites
- Node.js installed (>=16.x)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```sh
   git clone git@github.com:Tonystark121/Edilitics_Assignment.git
   cd demoApp
   ```

2. **Install dependencies**
   ```sh
   npm install  # or yarn install
   ```

3. **Run the project**
   ```sh
   npm start  # or yarn start
   ```

4. **Open in browser**
   The app will be available at `http://localhost:5173/`


5. **Vercel Project Link**
   The app will be available at `https://edilitics-assignment-five.vercel.app/`

## Project Structure

```
├── src
│   ├── components
│   │   ├── Filter.js  # UI for sorting and filtering
│   │   ├── Theme.js # UI for theme switching
│   ├── redux
│   │   ├── store.js  # Configures Redux store
│   │   ├── dataSlice.js # Manages COVID data state
│   ├── css
│   │   ├── chart.css  # Styling for the chart
│   │   ├── Nav.css  # Styling for the Navbar
│   │   ├── filter.css  # Styling for the Filter
│   ├── pages
│   │   ├── chart.js  # D3 visualization logic
│   │   ├── LinePlot.js  # D3 visualization logic
│   ├── App.js
│   ├── index.js
└── package.json
```

## Usage

- **Switch Themes**: Click the theme toggle to switch between light and dark mode.
- **Sort Data**: Use the dropdown to sort cases in ascending or descending order.
- **Hover for Details**: Hover over bars to see case counts.
- **Zoom & Pan**: Scroll to zoom, click & drag to pan.

## Contribution

Contributions are welcome! Feel free to fork the repo and submit a pull request.

