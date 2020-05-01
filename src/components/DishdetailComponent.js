import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';



    function RenderDish({dish}) {
        if (dish != null)
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
        else
            return(
                <div></div>
            );
    }

    function RenderComments({comments}) {
        // const comments = c.map((comment) => {

        // });
        if (comments != null) {
            const comment = comments.map((c) => {
                return(

                        <ul className="list-unstyled" key={c.id}>
                            <li>{c.comment}</li>
                            <li>- - {c.author} {c.date}</li>
                        </ul>
                );
            });

            return (
                <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {comment}
                </div>
            );
         }
        else 
            return(
                <div></div>
            );
    }

    const DishDetail = (props) => {
        return (
            <div>
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
                    <RenderDish dish={props.dish} />
                    <RenderComments comments={props.comments} />
            </div>
            </div>
        );
    }
    


export default DishDetail;