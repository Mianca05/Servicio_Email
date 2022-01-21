const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("El servidor escucha por el puerto 3000");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Se conectó a la base de datos <br><br>😃</h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`El correo se envió 😃 con el siguiente id ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"👋¡REGISTRO Existoso!📩"<example.gimail.com>', 
    to: user.email, 
    subject: "Bienvenido a nuestra plataforma de cursos de la ESPE",
    html: `
    <div class="mensaje" style="
    width: 80%;
    margin: 10% auto;    
    padding: 15px;
    background-color: #8cd8968a;
    justify-content: center;
    border-radius: 3px;
    text-align: center;
    font-family: sans-serif;
    color: rgb(77, 77, 80);
">
    <div class="mensaje_img_logo">
        <img style="
        height: 50px;
        padding: 15px;
        " src="https://santodomingo.espe.edu.ec/wp-content/uploads/2019/12/SedeSantoDomingo.png">
    </div>
    <div class="mensaje_titulo" style="
    font-size: x-large;
    font-feature-settings: 'smcp';
    font-variant: small-caps;
    letter-spacing: 3px;
    background-color: #8adc87;
    padding: 10px;
    font-weight: 550;
    ">
        Curso de Angular.
    </div>
    <div class="mensaje_img">
        <img style="
        height: 50px;
        float: left;
        padding: 15px 15px 15px 0;
        " src="https://drive.google.com/uc?export=view&id=${user.figuracurso}">
    </div>
    <div class="mensaje_contenido">
        <h1 style="
        font-size: larger;
        letter-spacing: 1px;
        padding: 20px;
        "> ¡Hola! ${user.name} 👋</h1>
        <p class="contenido" style="
        line-height: 2;
        padding: 20px;
        "> Gracias por inscribirte a nuestro curso de <b>${user.curso}</b> el cual tiene el costo de <b>${user.costo} dólares</b>, por ser un <b>${user.persona}</b> tiene
            un <b>descuento de ${user.descuento}%</b> por lo que pagará únicamente el valor de <b>$${user.costoTotal} dólares</b>. </p>
        <p class="agradecimiento" style="font-weight: 550;">¡Gracias por preferirnos! 🎅</p>
        <p class="contacto" style="font-weight: 550;">Si tienes dudas, contáctate con nosotros.</p>
    </div>
</div>`



    
  };

  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
