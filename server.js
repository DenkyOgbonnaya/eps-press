const express = require('express');
const cors = require('cors');
const UserRouter  = require('./server/routes/userRoutes');
const postRouter  = require('./server/routes/postRoutes');
const commentRouter  = require('./server/routes/commentRoutes');

const app = express();

const port = process.env.PORT || 8080;
app.use(express.json());
app.options('*', cors());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(__dirname + '/client/public'));

app.use('/api/users', UserRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);

app.get('*', (req, res) => {
    res.send('we up');
})
//listening port
app.listen(port, (err) =>{
    if(err) throw err ;
        console.log(`HiBooks listening on port ${port}`);
} );