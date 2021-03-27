const pool = mysql.createPool(database)

const queryUpload = 'INSERT INTO user set ?'

app.post('/signup', [
    check('firstname',"First Name should contain only letters").isAlpha(),
    check('lastname',"Last Name should contain only letters").isAlpha(),
    check('email',"Email format incorrect").isEmail(),
    check('password',"Password cannot be empty").not().isEmpty()
],
(req, res) => {
    const { firstname, lastname, email, password } = req.body
    const upload = { firstname, lastname, email, password }

    pool.query(queryUpload, [upload], (err, rows) => {
        if(err && (err.code = 'ER_DUP_ENTRY')) res.status(401).send("Email already exists!")
        else {
            res.status(200).send("User saved Successfully!")
        }
    })
})

const queryGetUser = 'SELECT * FROM user WHERE email = ?'

function querySingleValue(query, value) {
    return new Promise((resolve, reject) => {
        try {
            pool.query(query, [value], (err, rows) => {
                if (err) {
                    return reject(err)
                } else {
                    return resolve(rows)
                }
            })
        } catch (err) {
            return (err)
        }
    })
}

app.post('/signin',[
    check('email',"Email format incorrect").isEmail(),
    check('password',"Password cannot be empty").not().isEmpty()
], async (req, res) => {
    const { email, password } = req.body
    const validationErrors = validationResult(req);
    if(!validationErrors.isEmpty()){
        return res.status(401).json({ errors : validationErrors.array() })
    }
    else {
    await querySingleValue(queryGetUser, email)
        .then(response => {
            console.log(response)
            try {
                if (password !== response[0].password) {
                    res.send('Invalid credentials')
                } else {
                    res.send('Access Granted')
                }
            } catch (e) {
                res.send('Email doesnt exist')
            }
        })
}})