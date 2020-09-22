const {Pool} = require('pg')

const  pool= new Pool({
    user:"postgres",
    password:"asdasdasd",
    host:"localhost",
    port:5432,
    database:"perntodo"
})

module.exports=pool