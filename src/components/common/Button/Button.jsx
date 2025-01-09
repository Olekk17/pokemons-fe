import PropTypes from "prop-types";
import "./Button.scss";
import { LoadingOutlined } from "@ant-design/icons";

export const Button = (props = {}) => (
  <button
    className={`button ${props.color || ""}`}
    {...props}
    disabled={props.loading || props.disabled}
  >
    {props.loading ? <LoadingOutlined /> : props.text}
  </button>
);

Button.propTypes = {
  color: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};
