const swaggerAutogen = require('swagger-autogen')();
// const { PORT } = require('./utils/config');

const doc = {
  info: {
    title: 'Contacts API',
    description: 'Description'
  },
  //   host: `localhost:${PORT}`,
  host: 'cse-341-web-services-d47l.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
