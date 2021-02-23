import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    renderDishDetails(dish) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    renderComments(comments) {
        let dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
        const lista = comments.map((item) =>
            <ul className="list-unstyled">
                <li>{item.comment}</li>
                <li>-- {item.author}, <span>{new Date(item.date).toLocaleDateString("en-US", dateFormat)}</span></li>
            </ul>
        )
        if(comments != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {lista}
                </div>
            );
        else
            return(<div></div>);
    }

    render() {
        if(this.props.dish != null)
            return(

                <div className="container">
                    <div className="row">
                        {this.props.dish && this.renderDishDetails(this.props.dish)}
                        {this.props.dish.comments && this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        else
            return(<div></div>);
    }
}

export default DishDetail;
