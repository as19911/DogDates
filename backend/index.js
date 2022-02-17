let express = require('express');
let app = express();

app.use((req, res, next) => {
    res.send('SERVER IS UP');
});


console.log('Server is running...');
app.listen(5000);
