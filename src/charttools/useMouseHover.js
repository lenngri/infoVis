// Append CSS class to HTMLelement based on mouse event
// Source: https://stackoverflow.com/questions/927312/how-to-append-a-css-class-to-an-element-by-javascript (11.01.2021)

export const handleMouseEnter = (e, otherCharts) => {
  const pathElement = e.target;
  pathElement.classList.add('highlight');

  otherCharts.forEach((chart) => {
    const otherElement = document.getElementById(chart + e.target.id.split('_')[1]);
    if (otherElement) {
      otherElement.classList.add('highlight');
    }
  });
};

export const handleMouseLeave = (e, otherCharts) => {
  const pathElement = e.target;
  pathElement.classList.remove('highlight');

  otherCharts.forEach((chart) => {
    const otherElement = document.getElementById(chart + e.target.id.split('_')[1]);
    if (otherElement) {
      otherElement.classList.remove('highlight');
    }
  });
};
