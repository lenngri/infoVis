// Append CSS class to HTMLelement based on mouse event
// Source: https://stackoverflow.com/questions/927312/how-to-append-a-css-class-to-an-element-by-javascript (11.01.2021)

export const handleMouseEnter = (e, otherChart) => {
  const pathElement = e.target;
  pathElement.classList.remove('land');
  pathElement.classList.add('highlight');

  const otherElement = document.getElementById(otherChart + e.target.id.split('_')[1]);
  if (otherElement) {
    otherElement.classList.remove('land');
    otherElement.classList.add('highlight');
  }
};

export const handleMouseLeave = (e, otherChart) => {
  const pathElement = e.target;
  pathElement.classList.remove('highlight');
  pathElement.classList.add('land');

  const otherElement = document.getElementById(otherChart + e.target.id.split('_')[1]);
  if (otherElement) {
    otherElement.classList.remove('highlight');
    otherElement.classList.add('land');
  }
};
