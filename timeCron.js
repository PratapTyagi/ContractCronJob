const cron = require("node-cron");
const { exec } = require("child_process");

const minuteCron = cron.schedule("* * * * *", async () => {
  exec("sh automate.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
    }
    if (stderr) {
      console.log(`exec error: ${stderr}`);
    }
    console.log(stdout);
  });
});

const dailyCron = cron.schedule("0 8 * * *", async () => {
  exec("sh automate.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
    }
    if (stderr) {
      console.log(`exec error: ${stderr}`);
    }
    console.log(stdout);
  });
});

const weeklyCron = cron.schedule("0 0 * * 0", async () => {
  exec("sh automate.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
    }
    if (stderr) {
      console.log(`exec error: ${stderr}`);
    }
    console.log(stdout);
  });
});

const monthlyCron = cron.schedule("0 0 1 * *", async () => {
  exec("sh automate.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
    }
    if (stderr) {
      console.log(`exec error: ${stderr}`);
    }
    console.log(stdout);
  });
});

module.exports = { minuteCron, dailyCron, weeklyCron, monthlyCron };
