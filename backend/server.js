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

app.post("/users/add-gym-membership", async (req, res) => {
  try {
    const { username, amount, pack, duration, street, city, state, pincode } =
      req.body;

    const addMainDataQuery = `INSERT INTO membershipdata4 (username, packagename, street, city) VALUES (?, ?, ?, ?)`;

    const packageExistsQuery = `SELECT packagename from membershipdata1 WHERE packagename = '${pack}'`;
    const addNewPackageQuery = `INSERT INTO membershipdata1 (packagename, amount, duration) VALUES (?, ?, ?)`;

    const streetExistsHandler = `SELECT street from membershipdata3 WHERE street = '${street}'`;
    const addNewStreetHandler = `INSERT INTO membershipdata3 (street, city, pincode) VALUES (?, ?, ?)`;

    const cityExistsHandler = `SELECT city from membershipdata2 WHERE city = '${city}'`;
    const addNewCityHandler = `INSERT INTO membershipdata2 (city, state) VALUES (?, ?)`;

    // ====== Adding to membershipdata4, compulsory for all users ======

    connection.query(
      addMainDataQuery,
      [username, pack, street, city],
      (err, rows) => {
        if (!err) {
          console.log("MAIN DATA QUERY EXECUTED SUCCESSFULLY!");
        } else {
          console.log("MAIN DATA QUERY FAILED: ", err);
          return res.sendStatus(400);
        }
      }
    );

    // ====== Checking if 'packagename' exists in membershipdata1 ======

    connection.query(packageExistsQuery, async (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          // === since packagename doesn't exist here, we add a new package ===
          connection.query(
            addNewPackageQuery,
            [pack, amount, duration],
            async (err, rows) => {
              if (!err) {
                console.log("ADD NEW PACKAGE QUERY SUCCESS!");
              } else {
                console.log("ADD NEW PACKAGE QUERY ERROR:", err);
                return res.sendStatus(400);
              }
            }
          );
        }
      } else {
        console.log("PACKAGE EXISTS QUERY ERROR: ", err);
        return res.sendStatus(400);
      }
      res.json({ ok: true });
    });

    // ====== Checking if 'street' exists in membershipdata3 ======

    connection.query(streetExistsHandler, async (err, rows) => {
      if (!err) {
        if (rows.length === 0) {
          // === Since street doesn't exist here, we add new street ===
          connection.query(
            addNewStreetHandler,
            [street, city, pincode],
            async (err, rows) => {
              if (!err) {
                console.log("ADD NEW STREET HANDLER SUCCESS: ");
              } else {
                console.log("ADD NEW STREET HANDLER ERROR: ", err);
                return res.sendStatus(400);
              }
            }
          );
          // === Also, after this, we have to add required data to membershipdata2 as well ===
          connection.query(
            addNewCityHandler,
            [city, state],
            async (err, rows) => {
              if (!err) {
                console.log("ADD NEW CITY HANDLER SUCCESS");
              } else {
                console.log("ADD NEW CITY HANDLER ERROR: ", err);
                return res.sendStatus(400);
              }
            }
          );
        } else {
          // === Here, since street exists, we check if 'city' exists in membershipdata2 beforehand ===
          connection.query(cityExistsHandler, async (err, rows) => {
            if (!err) {
              console.log("NEW CITY EXISTS HANDLER SUCCESS!");
              if (rows.length === 0) {
                // === Here, since city doesn't exist, we add data to membershipdata2 ===
                connection.query(
                  addNewCityHandler,
                  [city, state],
                  async (err, rows) => {
                    if (!err) {
                      console.log("ADD NEW CITY HANDLER SUCCESS");
                    } else {
                      console.log("ADD NEW CITY HANDLER ERROR: ", err);
                      return res.sendStatus(400);
                    }
                  }
                );
              }
            } else {
              console.log("NEW CITY EXISTS HANDLER ERROR: ", err);
              return res.sendStatus(400);
            }
          });
        }
      } else {
        console.log("STREET EXISTS HANDLER ERROR: ", err);
        return res.sendStatus(400);
      }
    });
    res.json({ ok: true });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`App Listening on PORT ${PORT}`));
