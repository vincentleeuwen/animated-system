import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import LoadingDots from './LoadingDots';

const Header = ({ loading, numberOfCourses }) => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/courses" activeClassName="active">Courses</Link>
      {
        numberOfCourses > 0 &&
          <span>
            {" "}
            <span className="badge">{numberOfCourses}</span>
          </span>
      }
      {" | "}
      <Link to="/authors" activeClassName="active">Authors</Link>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
      {" | "}
      {loading && <LoadingDots interval={200} dots={20} />}
    </nav>
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  numberOfCourses: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    numberOfCourses: state.courses.length
  };
}

export default connect(mapStateToProps)(Header);
