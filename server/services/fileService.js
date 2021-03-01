/* 
       Read and Write File Utility
       Commonjs Modules
       exports.funcName = ()=>{}

       import
       require('module name)
    
*/

const fs = require('fs')
const path = require('path')

// for getting the contents of the users when logging in
exports.getFileContents = (filePath)=>{
   let fileContents = JSON.parse(fs.readFileSync(path.join(__dirname, filePath)))
   return fileContents
     
}

// for writing the newly registered users after a successful registration
exports.writeFileContents = (filePath, data) =>{
    let fileContents = this.getFileContents(filePath)
    fileContents.push(data)
    fileContents = JSON.stringify(fileContents)
    fs.writeFileSync(path.join(__dirname, filePath), fileContents)
}


 

 