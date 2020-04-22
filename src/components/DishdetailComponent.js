import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle} from 'reactstrap';



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
        return(
            <div className="row">
                <RenderDish dish={props.dish}/>
                <RenderComments comments={props.dish ? props.dish.comments : null}/>
            </div>
        );
    }
    


export default DishDetail;