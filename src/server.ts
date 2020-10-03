import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jobPostStatusRoutes from './api/job_post_status/job_post_status.routes';
import tagRoutes from './api/tag/tag.routes';
import categoryRoutes from './api/category/category.routes';
import colaboratorRoutes from './api/colaborator/colaborator.routes';
import usernameRoutes from './api/username/username.routes';
import organizationRoutes from './api/organization/organization.routes';

// Declare server
const app = express();

// CORS configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routing
jobPostStatusRoutes(app);
tagRoutes(app);
categoryRoutes(app);
colaboratorRoutes(app);
organizationRoutes(app);
usernameRoutes(app);

// Set the port
app.set('port', process.env.PORT || 3000);

// Start the server
app.listen(app.get('port'), () => {
    console.log('server on port:', app.get('port'));
});
