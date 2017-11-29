let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')



/* PARTIE MAIL */

var nodemailer = require('nodemailer');

/*
	Ici on configure notre server SMTP.
	STPM est le server mail responsable de l'envoi et de la reception d'email.
*/

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: '',
        pass: ''
    }
});

var mailOptions = {
    from: "leabarbeau08@gmail.com", // sender address
    to: "leabarbeau@yahoo.fr", // list of receivers
    subject: "Hello", // Subject line
    text: "Hello world ", // plaintext body
    html: "<b>Hello world </b>" // html body
};


// send mail with defined transport object
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});










// Moteur de template
app.set('view engine', 'ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'azerty',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(require('./middlewares/flash'))


// Routes
app.get('/', (request, response) => {
	let Message = require('./models/message')
	Message.all(function(messages){
		response.render('pages/index', {messages: messages})
	})
})

app.post('/', (request, response) => {
	if (request.body.message === undefined || request.body.message === ''){
		request.flash('error', "Vous n'avez pas posté de message")
		response.redirect('/')
	} else{
		let Message = require('./models/message')
		Message.create(request.body.message, function(){
			request.flash('success', "Merci !")
			response.redirect('/')
		})
	}	
})

app.get('/message/:id', (request, response) => {
	let Message = require('./models/message')
	Message.find(request.params.id, function(message){
		response.render('messages/show', {message: message})
	})
})

app.listen(8080)


