import PropTypes from "prop-types";
import "./Header.scss";
import { Button } from "../Button/Button";
import { useLocation, useNavigate } from "react-router";
import { getToken, removeToken } from "../../../helpers/token";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";
import { useOngoingGame } from "./hooks/useOngoingGame";
import { Link } from "react-router-dom";

export const Header = ({ title = "Pokemon game" }) => {
  const navigate = useNavigate();
  const token = getToken();

  const walletAddress = useMemo(() => {
    if (!token) return null;
    const address = jwtDecode(token)?.walletAddress;
    return address.slice(0, 6) + "..." + address.slice(-4);
  }, [token]);

  const location = useLocation();
  const { id } = useOngoingGame();
  const isOngoingGame =
    location.pathname.includes("/game") &&
    location.pathname.split("/game/")[1].includes(String(id));

  return (
    <div className="header">
      <h2>{title}</h2>

      {walletAddress && <span>WALLET: {walletAddress}</span>}

      {!!id && !isOngoingGame && (
        <Link to={`/game/${id}`}>
          <Button color="red" text="YOU HAVE AN ONGOING GAME!" />
        </Link>
      )}

      <Button
        color="red"
        text="LOGOUT"
        onClick={() => {
          removeToken();
          navigate("/");
        }}
      />
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};
