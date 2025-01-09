import axios from "axios";
import Web3 from "web3";

export async function getNonce(walletAddress) {
  const response = await axios.get(`/auth/nonce/${walletAddress}`);
  return response.data.nonce;
}

export async function signMessage(walletAddress, nonce) {
  const web3 = new Web3(window.ethereum);

  const signature = await web3.eth.personal.sign(
    `Authenticate with nonce: ${nonce}`,
    walletAddress,
    ""
  );

  return signature;
}

export async function verifySignature(walletAddress, signature) {
  const response = await axios.post("/auth/verify", {
    walletAddress,
    signature,
  });

  return response.data;
}
