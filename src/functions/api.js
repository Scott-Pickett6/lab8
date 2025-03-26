const express = require("express");
const serverless = require("serverless-http");
const dotenv = require("dotenv");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

dotenv.config();

console.log(__dirname);

const app = express();
const router = express.Router();

app.use(express.json());

app.use(cors());

router.post("/submitMessage", (req, res) => {
  const { name, email, message, subject, consent } = req.body;

  const messageData = {
      name: name,
      email: email,
      message: message,
      subject: subject,
      consent: consent
  };

  const messagesFilePath = path.join("../" + process.cwd(), 'messages.json');


  fs.readFile(messagesFilePath, "utf-8", (err, data) => {
      let messages = [];

      if (!err && data) {
          messages = JSON.parse(data);
      }

      messages.push(messageData);

      fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2), (err) => {
          if (err) {
              return res.status(500).json({ error: "Failed to save the message." });
          }

          res.status(200).json({ message: "Message successfully saved!" });
      });
  });
});

router.get("/messages", async (req, res) => {
  const messagesFilePath = path.join( "../" + process.cwd(), 'messages.json');


  try {
      const data = fs.readFileSync(messagesFilePath, "utf-8");
      const messages = JSON.parse(data);
      res.json(messages);
  } catch (err) {
      res.status(500).json({ error: "Failed to read messages." });
  }
});

router.get("/projects", (req, res) => {

    data = [
        {
          "name": "Maritime Travel Client Portal Website",
          "author": "Scott Pickett",
          "languages": ["ASP.NET MVC", "C#", "HTML", "CSS", "JavaScript", "Bootstrap"],
          "description": "Worked on a website made with ASP.NET MVC that allowed business clients to view invoices and other important information."
        },
        {
          "name": "CAE Media Suite",
          "author": "Scott Pickett",
          "languages": ["React", "HTML", "CSS", "JavaScript", "Django", "Python"],
          "description": "Worked on an LMS system designed for CAE subject matter experts to create and manage training courses."
        },
        {
          "name": "CAE Model Rendering Tool",
          "author": "Scott Pickett",
          "languages": ["Unity", "C#"],
          "description": "Worked on a Unity tool that allowed users to view and manipulate 3D models of aircraft or other custom models for static images."
        }
      ]

    res.json(data);
});

app.use("/.netlify/functions/api", router);
module.exports = app;
module.exports.handler = serverless(app);