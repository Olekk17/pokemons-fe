import PropTypes from "prop-types";
import { Button } from "../Button/Button";
import "./Pagination.scss";

export const Pagination = ({
  handleNextPage,
  handlePrevPage,
  isLoading,
  hasNextPage,
  page,
}) => (
  <div className="pagination">
    <Button
      text={"<"}
      onClick={handlePrevPage}
      disabled={page < 2}
      loading={isLoading}
      color={"blue"}
    />
    <span className="pagination__page">{page}</span>
    <Button
      text={">"}
      onClick={handleNextPage}
      disabled={!hasNextPage}
      loading={isLoading}
      color={"blue"}
    />
  </div>
);

Pagination.propTypes = {
  handleNextPage: PropTypes.func,
  handlePrevPage: PropTypes.func,
  isLoading: PropTypes.bool,
  hasPrevPage: PropTypes.bool,
  hasNextPage: PropTypes.bool,
  page: PropTypes.number,
};
