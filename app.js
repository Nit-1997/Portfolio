var  express        = require("express")
   , app            = express()
   , bodyParser     = require("body-parser")
   
var nodemailer = require('nodemailer');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");

app.get("/",(req,res)=>{
   res.render("home")
})

app.post("/sendMail",async(req,res)=>{
    try{
        let testAccount = await nodemailer.createTestAccount();

        console.log(testAccount)

		let transporter = nodemailer.createTransport({
			name: "https://nitinbhat.herokuapp.com/",
		    host: testAccount.smtp.host,
		    port: testAccount.smtp.port,
		    secure: testAccount.smtp.secure, // true for 465, false for other ports
		    auth: {
		      user: testAccount.user, // generated ethereal user
		      pass: testAccount.pass, // generated ethereal password
		    },
		  });

		  // send mail with defined transport object
		  let info = await transporter.sendMail({
		    from: testAccount.user, // sender address
		    to: "ntnbhat9@gmail.com", // list of receivers
		    subject:'['+req.email+'] '+req.body.subject, // Subject line
		    text: "From "+req.name+",\n"+req.body, // plain text body
		    html: "<h3>From "+req.name+",</h3>\n"+req.body, // html body
		  });

		 console.log(info)

	   res.json({success:true})
	}catch(error){
	   console.log(error)	
	}
 
})


// app.listen(7000,function(){
//      console.log("server has started");
// });

app.listen(process.env.PORT,process.env.IP,function(){
     console.log("app server has started on heroku ");
});
