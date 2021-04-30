var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser")
   , nodemailer     = require("nodemailer")

require('dotenv').config()

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
   res.render("home")
})


app.post("/sendMail",async(req,res)=>{
    try{
        

        console.log(process.env.EMAIL)
        console.log(process.env.PASS)

    
		let transporter = nodemailer.createTransport({
		    service: 'gmail',
		    auth: {
		      user: process.env.EMAIL, // generated ethereal user
		      pass: process.env.PASS // generated ethereal password
		    },
		  });

	
		  // send mail with defined transport object
		  let info = await transporter.sendMail({
		    from: process.env.EMAIL, // sender address
		    to: "ntnbhat9@gmail.com", // list of receivers
		    subject:'['+req.body.email+'] '+req.body.subject, // Subject line
		    text: "From "+req.body.name+",\n"+req.body.body, // plain text body
		    html: "<h3>From "+req.body.name+",</h3>\n"+req.body.body, // html body
		  });

	    console.log(info)
		console.log(req.body)




	   res.json({success:true})
	}catch(error){
	   console.log(error)	
	   res.json({success:false})
	}
 
})



app.listen(process.env.PORT,process.env.IP,function(){
     console.log("app server has started");
});
