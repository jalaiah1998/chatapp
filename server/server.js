const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const {router, verifyToken } = require('./routes/auth')

const app = express();
const port = process.env.PORT || 4444;

mongoose.connect('mongodb+srv://ajayjoji1723:Ajay123@cluster0.xs7ouo1.mongodb.net/group-chat-app?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log(`DB Connected`))
.catch((e)=>console.log(e.message))

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', router);
app.use('/users', require('./routes/user'));
app.use('/groups', require('./routes/group'));
app.use('/messages', require('./routes/message'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;