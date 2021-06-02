const fs = require("fs");
function outPutFileGenerator(filePath, data, message) {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (error) => {
        if (error) {
            return error;
        } else {
            console.log(message);
        }
    });
}
module.exports = outPutFileGenerator;