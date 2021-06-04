const fs = require("fs");


function outPutFileGenerator(fileName, data, message) {

    return new Promise((resolve, reject) => {

        fs.writeFile("src/public/output/" + fileName, JSON.stringify(data, null, 2), 'utf8', (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(message);
            }
        });

    });

}
module.exports = outPutFileGenerator;