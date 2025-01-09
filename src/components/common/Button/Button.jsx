import PropTypes from "prop-types";
import "./Button.scss";
import { LoadingOutlined } from "@ant-design/icons";

export const Button = (props = {}) => (
  <button
    {...props}
    disabled={props.loading || props.disabled}
    className={`button ${props.color || ""}${props.className ? ` ${props.className}` : ""}`}
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
  className: PropTypes.string,
};
