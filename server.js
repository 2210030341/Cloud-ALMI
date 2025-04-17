const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let tasks = [];

// Replace with your Gmail + App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // replace this
    pass: 'your-app-password',    // replace this
  },
});

app.post('/add-task', (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(200).send('✅ Task saved');
});

setInterval(() => {
  const now = new Date();
  tasks.forEach(task => {
    const due = new Date(task.dueDate);
    const diff = (due - now) / (1000 * 60 * 60 * 24);
    if (diff <= 1 && !task.notified) {
      transporter.sendMail({
        from: '"Smart To-Do" <your-email@gmail.com>',
        to: task.email,
        subject: `⏰ Reminder: "${task.title}" is due soon`,
        text: `Hi, your task "${task.title}" is due on ${task.dueDate}`,
      }, (err, info) => {
        if (err) {
          console.error('❌ Email Error:', err);
        } else {
          console.log('✅ Email sent:', info.response);
          task.notified = true;
        }
      });
    }
  });
}, 60000); // check every 1 min

app.listen(4000, () => {
  console.log('🚀 Server running on http://localhost:4000');
});
