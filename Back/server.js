const express = require("express");
const cors = require("cors");

const jwt = require("jsonwebtoken");
const config = require("./app/config/auth.config")

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  }
}));

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

app.get("/api/getDashboard", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  jwt.verify(token.replace('Bearer ', ''), config.secret, (err, usuario) => {
    if (err) {
      return res.status(403).json({ mensaje: 'Token no válido' });
    }

    const roles = usuario.roles || [];
    console.log(usuario);

    let responseData;

    if (roles.includes('admin')) {
      responseData= {message: "Tu rango es admin"}
    } else if (roles.includes('moderator')) {
      responseData= {message: "Tu rango es mod"}
    } else if (roles.includes('user')) {
      responseData= {message: "Tu rango es user"}
    }

    res.status(200).json(responseData);


  });
});


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server corriendo en el puerto: ${PORT}.`);
});