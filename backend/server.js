const express =require ('express');
const bodyParser =require ('body-parser');
const cors =require ('cors');
const dotenv =require ('dotenv');
const path = require('path');
const AuthRoute =require ('./Routes/AuthRoute.js');
const UserRoute =require ('./Routes/UserRoute.js');
const PostRoute =require ('./Routes/PostRoute.js');
const UploadRoute =require ('./Routes/UploadRoute.js');
const connnectDatabase = require('./config/connectDatabase.js');

dotenv.config({path:path.join(__dirname,'config','config.env')});

// dotenv.config();
connnectDatabase();

const app = express();

// Serve static files
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// Connect to MongoDB and start server
// mongoose.connect(`mongodb://localhost:27017/Media`)
//     .then(() => app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`)))
//     .catch((error) => console.log('Error connecting to MongoDB:', error));

// Route handlers
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);

const port = process.env.PORT;
const node = process.env.NODE_ENV;

app.listen(port,()=>{
    console.log(`App is listening on port ${port} to ${node}`);
});