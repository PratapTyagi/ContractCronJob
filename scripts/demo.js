const { contractAddress } = require("./parameters.json");
const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.providers.getDefaultProvider(
    "http://localhost:8545"
  );
  const contract = new ethers.Contract(
    contractAddress,
    JSON.parse(
      fs.readFileSync("artifacts/contracts/Greeter.sol/Greeter.json").toString()
    ).abi,
    provider.getSigner()
  );

  try {
    await contract.setGreeting("Crone job");
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
