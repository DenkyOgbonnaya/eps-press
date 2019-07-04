const express = require('express');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8080;
app.options('*', cors());
app.use(cors({credentials:true, origin: 'http://localhost:3000'}));

app.get('*', (req, res) => {
    res.send('we up');
})
//listening port
app.listen(port, (err) =>{
    if(err) throw err ;
        console.log(`HiBooks listening on port ${port}`);
} );