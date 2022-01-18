const mongoose = require('mongoose')
const Company = require('../models/company.js')
const {name,location,branch,role,url,filename} = require('./companies.js');
mongoose.connect('mongodb+srv://COLTISGOD:Unmqw75g5oKMKre7@cluster0.xeeio.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connnection error:"));
db.once("open", () => {
    console.log("Databse connected");
});

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}


const seedDB = async()=>{
      await Company.deleteMany({});
      for(let i=0; i<30; i++){
          const minCgpi=round((Math.random()*2.1)+6,1);
          const randCtc=Math.floor(Math.random()*30)+10;
          const roleRand=Math.floor(Math.random()*5)
          const company=new Company({
              name:`${name[i]}`,
              role: `${role[roleRand]}`,
              location:`${location[roleRand]}`,
              ctc:randCtc,
              min_cgpa:minCgpi,
              branch: ['CS','IT',`${branch[roleRand]}`],
              logo:{url:`${url[i]}`,filename:`${filename[i]}`}
          })
          await company.save();
      }
}

seedDB().then(() => {
    
    mongoose.connection.close()
})