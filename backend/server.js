const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
require("dotenv").config();
import { hashPassword, comparePassword } from "./utils/password";

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "sem4proj",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
    return err;
  }
});

app.post("/users/signup", async (req, res) => {
  try {
    const sno = req.body.sno;
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    if (password !== cpassword) {
      return res.status(400).send("Passwords don't match.");
    }

    const hashedPassword = await hashPassword(password);
    const sqlInsert =
      "INSERT INTO userdata (sno, email, name, hpassword) VALUES (?, ?, ?, ?)";
    connection.query(
      sqlInsert,
      [sno, email, name, hashedPassword],
      (err, results) => {
        if (!err) {
          console.log("Success!!");
          res.send("Signup Successful!");
        } else {
          return res
            .status(400)
            .send("An error occured. Please try another email.");
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/users/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    let reqdData;
    const emailExistsSql = connection.query(
      "SELECT * FROM userdata WHERE email = ?",
      [email],
      async (err, rows, fields) => {
        console.log("ROWS", rows);
        if (err !== null) {
          return res.status(400).send("Something went wrong!");
        }
        // console.log(rows);
        // res.json(rows);
        reqdData = rows;
        // console.log("reqdData", reqdData.length);
        if (reqdData.length === 0) {
          return res.status(400).send("Email doesn't exist");
        } else {
          // return res.send("Email Found!")
          // console.log(rows[0].sno)

          const hpass = rows[0].hpassword;
          const match = await comparePassword(password, hpass);
          if (match === false) {
            return res.status(400).send("Incorrect Password!");
          } else {
            return res.json({
              email: rows[0].email,
              name: rows[0].name,
            });
          }
        }
        // if (reqdData === []) {
        //   return res.status(400).send("Email doesn't exist");
        // }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`App Listening on PORT ${PORT}`));
