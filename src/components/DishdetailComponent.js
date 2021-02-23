import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends  Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                <div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card>
                                <CardImg widht="100%" object src={dish.image} alt={dish.name}/>
                                <CardBody>
                                    <CardTitle>{dish.name}</CardTitle>
                                    <CardText>{dish.description}</CardText>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="col-12 col-md-5 m-1">
                            {this.renderComments(this.props.dish.comments)}
                        </div>

                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    renderComments(comments){
        if (comments != null) {
            let dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
            const commentsView = comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        <li>{comment.comment}</li>
                        <li>-- {comment.author}, <span>{new Date(comment.date).toLocaleDateString("en-US", dateFormat)}</span></li>
                    </div>
                )
            });

            return (
                <div>
                    <h4> Comments </h4>
                    <ul className="list-unstyled">
                        {commentsView}
                    </ul>
                </div>
            );
        } else {
            return (<div></div>);
        }
    }


    render() {
        return (
            <div>
                {this.renderDish(this.props.dish)}
            </div>
        );
    }
}

export default DishDetail;
