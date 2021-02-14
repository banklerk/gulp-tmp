module.exports = {
  outputStyle: 'less',
  columns: 12,
  offset: '34px', /* offset - межколоночный интервал */
  mobileFirst: true,
  container: {
    maxWidth: '980px',
    fields: '17px' /* fields не может быть меньше половины offset - иначе возникает горизонтальный scroll */
  },
  breakPoints: {
    xl: {
      width: '1200px',
    },
    md: {
      width: '768px',
    },
    sm: {
      width: '576px',
    },
    xs: {
      width: '480px'
    }
  },
  detailedCalc: false
};

