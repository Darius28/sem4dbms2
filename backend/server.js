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
              membership: rows[0].membership,
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
    const {
      username,
      amount,
      pack,
      duration,
      street,
      city,
      state,
      pincode,
      joindate,
    } = req.body;

    console.log(req.body);

    const addMainDataQuery = `INSERT INTO membershipdata4 (username, packagename, street, city, joindate) VALUES (?, ?, ?, ?, ?)`;

    const packageExistsQuery = `SELECT * from membershipdata1 WHERE packagename = '${pack}'`;
    const addNewPackageQuery = `INSERT INTO membershipdata1 (packagename, amount, duration) VALUES (?, ?, ?)`;

    const streetExistsHandler = `SELECT * from membershipdata3 WHERE street = '${street}' AND city = '${city}' AND pincode = '${pincode}'`;
    const addNewStreetHandler = `INSERT INTO membershipdata3 (street, city, pincode) VALUES (?, ?, ?)`;

    const cityExistsHandler = `SELECT * from membershipdata2 WHERE city = '${city}' AND state = '${state}'`;
    const addNewCityHandler = `INSERT INTO membershipdata2 (city, state) VALUES (?, ?)`;

    const updateGymMembershipStatus = `UPDATE userdata2 set membership = 'yes' WHERE username = '${username}'`;

    // ====== Checking if 'packagename' exists in membershipdata1 ======

    const query1 = () => {
      return new Promise((resolve, reject) => {
        connection.query(packageExistsQuery, (err, rows) => {
          console.log("PACKAGE EXISTS QUERY: ", rows);
          if (!err) {
            if (rows.length === 0) {
              // === since packagename doesn't exist here, we add a new package ===
              connection.query(
                addNewPackageQuery,
                [pack, amount, duration],
                (err, rows) => {
                  if (!err) {
                    console.log("ADD NEW PACKAGE QUERY SUCCESS!");
                    resolve("success");
                  } else {
                    console.log("ADD NEW PACKAGE QUERY ERROR:", err);
                    reject(err);
                    // return res.sendStatus(400);
                  }
                }
              );
            } else {
              resolve("data exists");
            }
          } else {
            console.log("PACKAGE EXISTS QUERY ERROR: ", err);
            reject(err);
            // return res.sendStatus(400);
          }
        });
      });
    };

    const query2 = () => {
      return new Promise((resolve, reject) => {
        connection.query(cityExistsHandler, (err, rows) => {
          if (!err) {
            console.log("NEW CITY EXISTS HANDLER SUCCESS!");
            console.log("CHECKING IS CITY WAS FOUND: ", rows, rows.length);
            if (rows.length === 0) {
              // === Here, since city doesn't exist, we add data to membershipdata2 ===
              connection.query(
                addNewCityHandler,
                [city, state],
                (err, rows) => {
                  if (!err) {
                    resolve("success");
                    console.log("ADD NEW CITY HANDLER SUCCESS SECOND");
                  } else {
                    console.log("ADD NEW CITY HANDLER ERROR SECOND : ", err);
                    reject(err);
                    // return res.sendStatus(400);
                  }
                }
              );
            } else {
              resolve("data exists");
            }
          } else {
            console.log("NEW CITY EXISTS HANDLER ERROR: ", err);
            reject(err);
            // return res.sendStatus(400);
          }
        });
      });
    };

    const query3 = () => {
      return new Promise((resolve, reject) => {
        connection.query(streetExistsHandler, (err, rows) => {
          console.log("STREET EXISTS QUERY: ", rows);
          if (!err) {
            if (rows.length === 0) {
              connection.query(
                addNewStreetHandler,
                [street, city, pincode],
                (err, rows) => {
                  if (!err) {
                    console.log("ADD NEW STREET HANDLER SUCCESS: ");
                    resolve("success");
                  } else {
                    console.log("ADD NEW STREET HANDLER ERROR: ", err);
                    reject(err);
                  }
                }
              );
            } else {
              resolve("data exists");
            }
          } else {
            console.log("STREET EXISTS HANDLER ERROR: ", err);
            reject(err);
          }
        });
      });
    };
    // ====== Checking if 'street' exists in membershipdata3 ======
    // ====== Adding to membershipdata4, compulsory for all users ======
    // const addMainDataQuery = `INSERT INTO membershipdata4 (username, packagename, street, city) VALUES (?, ?, ?, ?)`;
    const query4 = () => {
      return new Promise((resolve, reject) => {
        connection.query(
          addMainDataQuery,
          [username, pack, street, city, joindate],
          (err, rows) => {
            if (!err) {
              console.log("MAIN DATA QUERY EXECUTED SUCCESSFULLY!");
              resolve("success");
            } else {
              console.log("MAIN DATA QUERY FAILED: ", err);
              reject(err);
              // return res.sendStatus(400);
            }
          }
        );
      });
    };
    const query5 = () => {
      return new Promise((resolve, reject) => {
        connection.query(updateGymMembershipStatus, (err, rows) => {
          if (!err) {
            console.log("FLAG IN USERDATA2 SET SUCCESSFULLY!");
            resolve("success");
          } else {
            console.log(err);
            reject(err);
          }
        });
      });
    };

    query1()
      .then((msg) => {
        console.log("query 1 msg: ", msg);
        query2()
          .then((msg) => {
            console.log("query 2 msg: ", msg);
            query3()
              .then((msg) => {
                query4()
                  .then((msg) => {
                    console.log("query 4 msg: ", msg);
                    query5()
                      .then((msg) => {
                        console.log(msg);
                        console.log("ABOUT TO SEND MEMBER");
                        res.status(200).send({ member: true });
                      })
                      .catch((err) => console.log(err));
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } catch (err) {
    // res.sendStatus(400)
    console.log("TRY CATCH ERROR: ");
    console.log(err);
  }
});

app.post("/users/add-new-workout", async (req, res) => {
  const { username, workout, date, calories, duration, time } = req.body;
  console.log("TIME: ", time);

  const addWorkoutData2Query = `INSERT INTO workoutdata2 (username, date, workouttype) VALUES (?, ?, ?)`;
  const workoutExistsHandler = `SELECT * FROM workoutdata2 where username = '${username}' AND date = '${date}'`;

  const duplicateExistsHandler = `SELECT * FROM workoutdata1 where username = '${username}' AND date = '${date}' AND time = '${time}'`;
  const addWorkoutData1Query = `INSERT INTO workoutdata1 (username, date, time, calories, duration) VALUES (?, ?, ?, ?, ?)`;

  const query1 = () => {
    return new Promise((resolve, reject) => {
      connection.query(workoutExistsHandler, (err, rows) => {
        if (!err) {
          if (rows.length === 0) {
            connection.query(
              addWorkoutData2Query,
              [username, date, workout],
              (err, rows) => {
                if (!err) {
                  console.log("ADD DATA TO WORKOUTDATA2 SUCCESS!");
                  resolve("success");
                } else {
                  console.log("ADD DATA TO WORKOUTDATA2 FAILED");
                  reject(err);
                }
              }
            );
            resolve("success");
          } else {
            resolve("Workout exists");
          }
        } else {
          console.log("WORKOUT EXISTS HANDLER FAILED.");
          reject(err);
        }
      });
    });
  };

  const query2 = () => {
    return new Promise((resolve, reject) => {
      connection.query(duplicateExistsHandler, (err, rows) => {
        if (!err) {
          if (rows.length === 0) {
            connection.query(
              addWorkoutData1Query,
              [username, date, time, calories, duration],
              (err, rows) => {
                if (!err) {
                  console.log("ADD DATA TO WORKOUTDATA1 SUCCESS!");
                  resolve("success");
                } else {
                  console.log("ADD DATA TO WORKOUTDATA1 FAILED");
                  console.log(err);
                  reject(err);
                }
              }
            );
            resolve("success");
          } else {
            resolve("user and workout log exists");
          }
        } else {
          console.log("WORKOUT EXISTS HANDLER FAILED.");
          reject(err);
        }
      });
    });
  };

  query1()
    .then((msg) => {
      console.log("query 1 msg: ", msg);
      query2()
        .then((msg) => {
          console.log("query 2 msg: ", msg);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
  res.json({ ok: true });
});

app.post("/users/get-membership-data", async (req, res) => {
  console.log(req.body);
  const { username } = req.body;
  const getMembershipDetailsQuery = `select c.*, d.joindate from membershipdata1 c natural join membershipdata4 d where username = '${username}' AND packagename = ( select packagename from membershipdata4 where username = '${username}');`;

  const query1 = () => {
    return new Promise((resolve, reject) => {
      connection.query(getMembershipDetailsQuery, (err, rows) => {
        if (!err) {
          console.log(rows[0]);
          console.log("ROWS[0]: ", rows[0]);
          if (rows[0] === undefined) {
            resolve({
              packagename: "",
              amount: 0,
              duration: 0,
              joindate: "",
            });
          } else {
            resolve({
              packagename: rows[0].packagename,
              amount: rows[0].amount,
              duration: rows[0].duration,
              joindate: rows[0].joindate,
            });
          }
        } else {
          reject(err);
        }
      });
    });
  };
  query1()
    .then((obj) => {
      res.status(200).send(obj);
    })
    .catch((err) => console.log(err));
});

app.post("/users/get-user-workouts", async (req, res) => {
  const { username } = req.body;
  console.log("username", username);
  const getWorkoutDataQuery = `select d.workouttype, e.date, e.time, e.duration, e.calories from workoutdata2 d natural join workoutdata1 e where username = '${username}';`;

  const query1 = () => {
    return new Promise((resolve, reject) => {
      connection.query(getWorkoutDataQuery, (err, rows) => {
        if (!err) {
          console.log(rows);
          resolve(rows);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  };
  query1()
    .then((rows) => {
      res.send(rows);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`App Listening on PORT ${PORT}`));
