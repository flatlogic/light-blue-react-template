const config = {
  name: 'light-blue-template',
  title: 'Light Blue Template App built with React JS by Flatlogic',
  version: '3.8.0',
  settings: {
    screens: {
      'xs-max': 543,
      'sm-min': 544,
      'sm-max': 767,
      'md-min': 768,
      'md-max': 991,
      'lg-min': 992,
      'lg-max': 1199,
      'xl-min': 1200,
    },
    navCollapseTimeout: 2500,
  },
};

export default function isScreen(size) {
  const screenPx = window.innerWidth;
  return (screenPx >= config.settings.screens[`${size}-min`] || size === 'xs')
    && (screenPx <= config.settings.screens[`${size}-max`] || size === 'xl');
}
