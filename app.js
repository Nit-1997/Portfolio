var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser")
   

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
   res.render("home")
})

app.post("/sendMail",(req,res)=>{
  console.log("hit")
   console.log(req.body)
   res.json({success:true})
})


app.listen(7000,function(){
     console.log("server has started");
});
