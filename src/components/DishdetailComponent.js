import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button,
    Card, CardBody, CardImg, CardText, CardTitle,
    Col, Label, Modal, ModalBody, ModalHeader,
    Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from "react-redux-form";
import { Loading } from './LoadingComponent';
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmitComment(values) {
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-pencil fa-lg"></span> Submit comment
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>

                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmitComment(values)}>
                        <Row className="form-group">
                            <Col md={{size:12}}>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".contactType" name="contactType"
                                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col md={{size:12}}>
                                <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author"
                                                  placeholder="Your Name"
                                                  className="form-control"
                                                  validators={{
                                                      minLength: minLength(3), maxLength: maxLength(15)
                                                  }}
                                    />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:12}}>
                                <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                                      rows="6"
                                                      className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size:10}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
        );
    };
}

function RenderDishDetails({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>

    );
}

function RenderComments({comments, postComment, dishId}) {
    let dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    const lista = comments.map((item) =>

        <Fade in>
            <ul className="list-unstyled">
                <li>{item.comment}</li>
                <li>-- {item.author}, <span>{new Date(item.date).toLocaleDateString("en-US", dateFormat)}</span></li>
            </ul>
        </Fade>
    );
    if(comments != null)
        return(
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <Stagger in>
                    {lista}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    else
        return(<div></div>);
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return(
          <div className="container">
              <div className="row">
                <Loading />
              </div>
          </div>
        );
    } else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    } else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>

                <div className="row">
                    {props.dish && <RenderDishDetails dish={props.dish} />}
                    {props.comments && <RenderComments comments={props.comments}
                                                       postComment={props.postComment}
                                                       dishId={props.dish.id} />}
                </div>
            </div>
        );
    else
        return (<div></div>);
};

export default DishDetail;
