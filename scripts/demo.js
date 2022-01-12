const { contractAddress } = require("./parameters.json");
const fs = require("fs");

async function main() {
  const Greeter = await ethers.getContractFactory("Greeter");
  const contract = await Greeter.attach(contractAddress);

  try {
    await contract.setGreeting("Vishal Sir");
  } catch (error) {
    console.log("Error: ", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
