const con = require('../noDbPool');

var queries = {};

queries.createUser = (user, hash, successcb, failurecb) => {
    let sql = "INSERT INTO user (firstname, lastname, email, password, image) VALUES ?";
    const values = [user.firstName, user.lastName, user.email, hash,  'default_profile_pic.jpg']
    con.query(sql, [[values]], function (err, result){
        if (err){
            failurecb(err);
            return;
        }
        successcb(result);
    });
}

queries.getUserPasswordByEmail = (email, successcb, failurecb) => {
    let sql = 'SELECT password,firstname FROM user WHERE email = ?';
    con.query(sql, [email], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getUserPasswordById = (id, successcb, failurecb) => {
    let sql = 'SELECT password FROM user WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}

queries.getUserFirstNameById = (id, successcb, failurecb) => {
    let sql = 'SELECT firstname FROM user WHERE id = ?';

    con.query(sql, [id], function (err, row){
        if (err){
            failurecb(err);
            return;
        }
        successcb(row[0]);
    });
}


module.exports = queries;
