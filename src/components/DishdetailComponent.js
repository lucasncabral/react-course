import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';


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
                    {props.dish && <RenderDishDetails dish={props.dish} />}
                    {props.dish.comments && <RenderComments comments={props.dish.comments}/>}
                </div>
            </div>
        );
    else
        return (<div></div>);
}

export default DishDetail;
