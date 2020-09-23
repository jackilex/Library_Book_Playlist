const path = require("path");
const router = require('express').Router();

const book= require('./book')
const library= require('./library')

router.use('/api/book', book);
router.use('/api/library', library);



// If no API routes are hit, send the React app
router.use((req, res)=> {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
  

module.exports = router;