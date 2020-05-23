import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionsCreators';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  postFeedback: (values) => dispatch(postFeedback(values)),
});

class Main extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render() {

    const HomePage = () => {
        return(
            <Home 
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMsg={this.props.dishes.errMsg}
                promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMsg={this.props.promotions.errMsg}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leaderLoading={this.props.leaders.isLoading}
                leaderErrMsg={this.props.leaders.errMsg}
            />
        );
      }

      const DishWithId = ({match}) => {
        return(
              <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              isLoading={this.props.dishes.isLoading}
              errMsg={this.props.dishes.errMsg}
              comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
              commentsErrMsg={this.props.comments.errMsg}
              postComment = {this.props.postComment} />
        );
      };
    
    return (
      <div>
        <Header/>
        <div className="container">
          <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch location={this.props.location}>
              <Route path='/home' component={HomePage} />
              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/contactus' component={ () => <Contact postFeedback={this.props.postFeedback} resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
              <Route exact path ='/aboutus' component={() => <About leaders={this.props.leaders} />} />
              <Redirect to="/home" />
          </Switch>
          </CSSTransition>
          </TransitionGroup>
        </div>
        <Footer/>
        
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));