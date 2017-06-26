const fs = require("fs");
const userController = {};
const pathDB = 'userDB.json';

userController.authenticate = (userName, password) => {
    console.log('userController.authenticate');
    console.log('userController.authenticate::userName',userName);
    console.log('userController.authenticate::password', password);
    return new Promise((res, rej) => {
        if (fs.existsSync(pathDB)) {
            console.log('File exists', pathDB);
            fs.readFile(pathDB, (err, data) => {
                if(err){ rej(err) }

                let db = JSON.parse(data);
                let userRecord = db.find(user => user.userName === userName);
                if(userRecord && userRecord.password === password){
                    console.log('userController.authenticate::userRecord', JSON.stringify(userRecord));
                    res({ data: userRecord });
                }else{
                    res({ data: false });
                }
            });
        }else{
            console.log('File not exists');
            res({ data: false });
        }
    });
};

userController.deserializeUser = (userName) => {
    return new Promise((res, rej) => {
        fs.readFile(pathDB, (err, data) => {
            if(err){ rej(err) }

            let db = JSON.parse(data);
            let userRecord = db.find(user => user.userName === userName);
            if(userRecord){
                res({ data: userRecord });
            }else{
                res({ data: false });
            }
        });
    });
};

module.exports = userController;