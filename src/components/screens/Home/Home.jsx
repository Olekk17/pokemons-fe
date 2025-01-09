import { Button } from "../../common/Button/Button";
import "./Home.scss";
import { useSignIn } from "../../../helpers/hooks/useSignIn";

export const Home = () => {
  const { signIn } = useSignIn();
  return (
    <div className="home">
      <h2>Pokemon game</h2>

      <Button text="LOGIN WITH METAMASK" color="blue" onClick={signIn} />
    </div>
  );
};
