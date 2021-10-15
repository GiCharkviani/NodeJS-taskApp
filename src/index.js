const express = require("express");
//mongoos activation of mongoDB
require("./db/mongoose");

//router initializations
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

//express activating
const app = express();
//port setup
const port = process.env.PORT;




// File Uploads
// const multer = require('multer');
// const upload = multer({
//   dest: 'uploads',
//   limits: {
//     fileSize: 1000000
//   },
//   fileFilter(req, file, cb){
//     if(!file.originalname.match(/\.(doc|docx)$/)){
//       return cb(new Error('Please upload .doc or docx document'))
//     }
//     cb(undefined, true)
//   }
// })
// app.post('/upload', upload.single('upload') ,(req, res) => {
//   res.send()
// }, (error, req, res, next) => {
//   res.status(400).send({ error: error.message })
// })




// express middleware
// must be on this location
// Without middlware: new request -> run route handler
// With middleware: new request -> do something -> run route handler

//express middlware
// app.use((req, res, next) => {
//   if(req.method === 'GET'){
//     res.send('Forget!')
//   }else {
//     next()
//   }
// })

//task about above
// app.use((req, res, next) => {
//   res.status(500).send('საიტი არ მუშაობს!')
// })


//express uses JSON
app.use(express.json());



//route
app.use(userRouter)
app.use(taskRouter)

//listening port
app.listen(port, () => {
  console.log("Server is up on port " + port);
});



// tasks exercise
// const Task = require('./models/task')
// const User = require('./models/user')
// const main = async () => {
//   // const task = await Task.findById('6165d4ebd2ab72b28903fd71').populate('owner');
//   // console.log(task.owner);
//   const user = await User.findById('6165d2ce66083fff4d75c2d7').populate('tasks')
//   console.log(user.tasks)
// }
// main()



//toJSON exercise
// const pet = {
//   name: 'Hal'
// }
// pet.toJSON = function () {
//   console.log(this)
//   return this
// }
// console.log(JSON.stringify(pet))



//secure passwords
// const bcrypt = require('bcryptjs')
// const myFunction = async () => {
//   const password = 'Red12345'
//   const hashedPassword = await bcrypt.hash(password, 8)
//   console.log(password)
//   console.log(hashedPassword)
//   const isMatch = await bcrypt.compare('Red12345', hashedPassword);
//   console.log(isMatch);
// }
// encryption:  giorgi -> asjdsadjs231ihjsdjadh8921 -> giorgi
// hashing: giorgi -> sjadhadhs18h287dhsjada -/> ...
// myFunction()



// JSON WEBTOKEN
// const jwt = require('jsonwebtoken')
// const JSONfunction = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {expiresIn: '7 days'})
//   console.log(token)
//   const verified = jwt.verify(token, 'thisismynewcourse')
//   console.log(verified)
// }
// JSONfunction()