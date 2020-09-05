import React, { Component } from "react";
import { Container, Button, Table } from "reactstrap";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import loaderimg from "../images/loader.gif";

class ShoppingList extends Component {
  static protoTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  };

  render() {
    const { items, loading } = this.props.item;
    return (
      <Container>
        {this.props.isAuthenticated ? (
          <Table bordered striped>
            <thead>
              <tr>
                <th></th>
                <th>Work Order #</th>
                <th>Serial #</th>
              </tr>
            </thead>
            <tbody>
              {items.map(({ _id, order, serial }) => {
                return (
                  <tr>
                    <td>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => this.onDeleteClick(_id)}
                      >
                        &times;
                      </Button>
                    </td>
                    <td>{order}</td>
                    <td>{serial}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : null}

        {loading && <img src={loaderimg} alt="Loading" width="100" />}
      </Container>

      // <Container>
      //   <ListGroup>
      //     <TransitionGroup className="shopping-list">
      //       {items.map(({ _id, order, serial }) => {
      //         return (
      //           <CSSTransition key={_id} timeout={500} classNames="fade">

      //             <ListGroupItem>
      //               {this.props.isAuthenticated ? (
      //                 <Button
      //                   className="remove-btn"
      //                   color="danger"
      //                   size="sm"
      //                   onClick={() => this.onDeleteClick(_id)}
      //                 >
      //                   &times;
      //                 </Button>
      //               ) : null}
      //               <p>
      //                 {order} : {serial}{" "}
      //               </p>
      //             </ListGroupItem>
      //           </CSSTransition>
      //         );
      //       })}
      //     </TransitionGroup>
      //   </ListGroup>
      // </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);
