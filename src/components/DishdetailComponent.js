import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle} from 'reactstrap';


class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderDish(dish) {
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

    renderComments(comments) {
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

    render() {
        return(
            <div className="row">
                {this.renderDish(this.props.dish)}
                {this.renderComments(this.props.dish ? this.props.dish.comments : null)}
            </div>
        );
    }
}


export default DishDetail;