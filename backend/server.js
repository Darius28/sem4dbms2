const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
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
    console.log(req.body);
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const { username, phone, dob, gender } = req.body;

    if (password !== cpassword) {
      return res.status(400).send("Passwords don't match.");
    }

    if (password.length < 6) {
      return res.status(400).send("Password must be longer that 6 characters");
    }

    const hashedPassword = await hashPassword(password);
    const sqlInsert =
      "INSERT INTO userdata2 (name, username, email, hpassword, phone, dob, gender) VALUES (?, ?, ?, ?, ?, ? ,?)";
    connection.query(
      sqlInsert,
      [name, username, email, hashedPassword, phone, dob, gender],
      (err, results) => {
        if (!err) {
          console.log("Success!!");
          res.send("Signup Successful!");
        } else {
          console.log(err.sqlMessage);
          const errMsg = err.sqlMessage;
          const trim = errMsg.substring(17, errMsg.indexOf("'", 17));
          console.log("trim", trim);
          let invalidTerm = "";
          if (trim === username) {
            invalidTerm = "Username";
          } else if (trim === email) {
            invalidTerm = "Email";
          } else {
            invalidTerm = "Phone No.";
          }
          return res.status(400).send(`${invalidTerm} is already taken.`);
        }
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

app.post("/users/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const emailExistsSql = connection.query(
      "SELECT * FROM userdata2 WHERE email = ?",
      [email],
      async (err, rows, fields) => {
        // console.log("ROWS", rows);
        if (err !== null) {
          return res.status(400).send("Something went wrong!");
        }
        // console.log(rows);
        // res.json(rows);
        // console.log("rows.length", rows.length)
        if (rows.length === 0) {
          return res.status(400).send("Email doesn't exist");
        } else {
          // return res.send("Email Found!")
          // console.log(rows[0].sno)
          console.log("ROWS[0]", rows[0]);
          const hpass = rows[0].hpassword;
          const match = await comparePassword(password, hpass);
          if (match === false) {
            return res.status(400).send("Incorrect Password!");
          } else {
            const loginTime = new Date().toLocaleString();

            return res.json({
              email: rows[0].email,
              username: rows[0].username,
              name: rows[0].name,
              loginTime,
            });
          }
        }
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.post("/users/record-session", async (req, res) => {
  const { email, loginTime, logoutTime } = req.body;
  console.log("LOGOUT LOG DATA ====> ", email, loginTime, logoutTime);
  const logUserActivityQuery =
    "INSERT INTO userlogin (email, logintime, logouttime) VALUES (?, ?, ?)";
  connection.query(
    logUserActivityQuery,
    [email, loginTime, logoutTime],
    async (err, rows, fields) => {
      if (!err) {
        return res.sendStatus(200);
      } else {
        console.log(err);
        return res.status(400).send(err);
      }
    }
  );
});

app.get("/admin/members", async (req, res) => {
  const email = "admin@fitlife.com";
  try {
    const getMembersQuery = "SELECT * FROM userdata2 WHERE email != ?";
    connection.query(getMembersQuery, [email], async (err, rows, fields) => {
      if (!err) {
        return res.send(rows);
      }
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

app.listen(PORT, () => console.log(`App Listening on PORT ${PORT}`));
