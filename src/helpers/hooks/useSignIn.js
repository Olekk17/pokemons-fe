import Web3 from "web3";
import { getNonce, signMessage, verifySignature } from "../auth";
import { setToken } from "../token";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const navigate = useNavigate();

  async function signIn() {
    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.requestAccounts();
    const walletAddress = accounts[0];

    try {
      const nonce = await getNonce(walletAddress);
      const signature = await signMessage(walletAddress, nonce);
      const verificationResult = await verifySignature(
        walletAddress,
        signature
      );

      if (verificationResult.success) {
        setToken(verificationResult.token);
        navigate("/pokemons");
        notification.success({
          message: "Authentication successful",
          description: "You have successfully logged in",
        });
      } else {
        notification.error({
          message: "Authentication failed",
          description: verificationResult.error,
        });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      notification.error({
        message: "Error",
        description: "An error occurred during sign-in",
      });
    }
  }

  return { signIn };
};
