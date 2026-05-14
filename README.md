# jinryu

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

A web application for visualizing people flow sensor data. This project utilizes the PUSH Open Data platform to fetch and display real-time and historical sensor information.

## Demo

- [People Flow Data - FTAS Open Data](https://code4fukui.github.io/jinryu/)
- [People Flow Data AICAM - FTAS Open Data](https://code4fukui.github.io/jinryu/aicam.html)

## Features

- **Interactive Charts**: Visualize people flow data by sensor location with daily and hourly aggregations.
- **Date Range Filtering**: Select a custom date range to analyze historical trends.
- **Demographic Data**: The AICAM demo provides a breakdown of people flow by gender and age group.
- **CSV Export**: Download the raw data for your selected time range and location for offline analysis.

## How It Works

This project is a static web application built with HTML and JavaScript, hosted on GitHub Pages.
- Live data for the current day is fetched directly from the MixSoda API.
- Historical data is served from CSV files stored within the repository's `/data` directory.
- A scheduled GitHub Action runs daily to back up the latest data, ensuring a comprehensive historical record.

## Usage

No installation is required. Simply open one of the demo websites in your browser.

1.  Select an area and a specific sensor location from the dropdown menus.
2.  Use the date pickers to define the time range for the data you want to view.
3.  The charts will automatically update to reflect your selection.
4.  Click the "CSV download" button to export the currently displayed data.

## Data / API

- [PUSH Open Data for People Flow Sensors](https://push.sabae.cc/#type=https://push.sabae.cc/1003)
- [People Flow Sensor Aggregated Data](https://push.sabae.cc/1005.csv)

## License

MIT License