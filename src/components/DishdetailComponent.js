import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import React from "react";


function RenderDishDetails({dish}) {
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

function RenderComments({comments}) {
    console.log('aqui');
    console.log(comments);
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

const DishDetail = (props) => {
    if (props.dish != null)
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
                    {props.comments && <RenderComments comments={props.comments}/>}
                </div>
            </div>
        );
    else
        return (<div></div>);
}

export default DishDetail;
