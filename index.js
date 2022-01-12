const express = require("express");
const app = express();

const fs = require("fs");
const { exec } = require("child_process");

const {
  minuteCron,
  dailyCron,
  weeklyCron,
  monthlyCron,
} = require("./timeCron.js");

app.use(express.json());

app.get("/deploy", async (req, res) => {
  try {
    exec("sh ./shell-scripts/deploy.sh", (error, stdout, stderr) => {
      if (error) {
        console.log(`Error: ${error.message}`);
      }
      if (stderr) {
        console.log(`exec error: ${stderr}`);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/harvest-crone", async (req, res) => {
  const { contractAddress, stop, timestamp } = req.body;
  // File created on deployment
  fs.writeFileSync(
    "./scripts/parameters.json",
    JSON.stringify({
      contractAddress,
    })
  );
  let cronJob;

  switch (timestamp) {
    case "minute":
      cronJob = minuteCron;
      break;
    case "day":
      cronJob = dailyCron;
      break;
    case "week":
      cronJob = weeklyCron;
      break;

    case "month":
      cronJob = monthlyCron;
      break;

    default:
      break;
  }
  if (stop) {
    cronJob.stop();
    return res.send("Stopped");
  }
  cronJob.start();
  return res.send("Cron job started");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on ${PORT} port`));
