import { connect } from "react-redux";
import React from "react";
import {
   acceptFollow,
   setCurrentPage,
   acceptUnfollow,
   toggleFollowingInProgress,
   getUsers,
   follow,
   unfollow,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {
   getPageSize,
   getTotalUsersCount,
   getCurrentPage,
   getIsFetching,
   getFollowingInProgress,
   GetUsersSuperSelector,
} from "../../redux/users-selectors";
import Paginator from "./Paginator";

class UsersContainer extends React.Component {
   componentDidMount() {
      this.props.getUsers(this.props.currentPage, this.props.pageSize);
   }

   onPageChanged = (pageNumber) => {
      this.props.setCurrentPage(pageNumber);
      this.props.getUsers(pageNumber, this.props.pageSize);
   };

   render() {
      return (
         <>
            <Paginator
               totalItemsCount={this.props.totalUsersCount}
               pageSize={this.props.pageSize}
               currentPage={this.props.currentPage}
               onPageChanged={this.onPageChanged}
            />
            {this.props.isFetching ? (
               <Preloader />
            ) : (
               <Users
                  totalUsersCount={this.props.totalUsersCount}
                  pageSize={this.props.pageSize}
                  currentPage={this.props.currentPage}
                  selectedPage={this.props.selectedPage}
                  followingInProgress={this.props.followingInProgress}
                  onPageChanged={this.onPageChanged}
                  users={this.props.users}
                  follow={this.props.follow}
                  unfollow={this.props.unfollow}
               />
            )}
         </>
      );
   }
}

let mapStateToProps = (state) => {
   return {
      users: GetUsersSuperSelector(state),
      pageSize: getPageSize(state),
      totalUsersCount: getTotalUsersCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
   };
};

export default connect(mapStateToProps, {
   acceptFollow,
   acceptUnfollow,
   setCurrentPage,
   toggleFollowingInProgress,
   getUsers,
   follow,
   unfollow,
})(UsersContainer);
