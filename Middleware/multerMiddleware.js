   //multer is an node.js middleware for handling multipart/form-data,which primarily used for uploading files. npm i multer

  //1) import multer
  const multer =require('multer')


//storage  - diskstorage
const storage = multer.diskStorage({
//it have two keys - first one is destination and the secondone is filename.
//destination - where the file is stored

//a) Register
destination:(req,file,callback)=>{
    callback(null,'./uploads')
},
//filename - the name in which the file is sotred in the destination

filename:(req,file,callback)=>{
    //Returns the number of milliseconds elapsed since midnight(.now)
  const filename =  `image-${Date.now()}-${file.originalname}`
  callback(null,filename)
}

})
//fileFlter
const fileFilter = (req,file,callback)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error ("only png jpeg,jpg files will be allowed !!"))
    }
}

  //2) create multerconfigaration

  const multerConfig = multer({
    storage,
    fileFilter
  })

  //3) export multer

  module.exports=multerConfig