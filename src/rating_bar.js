import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MdStar, MdStarOutline} from 'react-icons/lib/md';

export default class RatingBar extends Component {
  render() {
    return (
      <div>
        <Stars
          maxScore = {5}
          score = {this.props.rating.score}
          onChange = {(score) => {this.props.onChange && this.props.onChange(score)}} />
        <p>rated by {this.props.rating.by && this.props.rating.by.name}</p>
      </div>
    );
  }
}

RatingBar.propTypes = {
  rating: PropTypes.object.isRequired
};

export class Stars extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score? this.props.score : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.score != nextProps.score)
      this.setState({score:nextProps.score});
  }

  render() {
    return (
      <div style={{display:'flex', flexDirection:'row'}}>
        {(() => {
          let stars = [];
          for (let i = 1; i <= this.props.maxScore; i++) {
            stars.push(
              <Star
                key = {i.toString()}
                id = {i}
                lightened = {this.state.score >= i? true : false}
                onPress = {this._onChange.bind(this)} />
            );
          }
          return stars;
        })()}
      </div>
    );
  }

  _onChange(id) {
    this.setState({score: id});
    this.props.onChange && this.props.onChange(id);
  }

}

Stars.propTypes = {
  maxScore: PropTypes.number.isRequired,
  score: PropTypes.number,
  onChange: PropTypes.func
};

Stars.defaultProps = {
  maxScore: 5
};

export class Star extends Component {

  render() {
    return (
      <div onClick={this._onPress.bind(this)}>
        {this.props.lightened
        ? <MdStar />
        : <MdStarOutline />}
      </div>
    );
  }

  _onPress() {
    this.props.onPress && this.props.onPress(this.props.id);
  }

}

Star.propTypes = {
  id: PropTypes.any.isRequired,
  lightened: PropTypes.bool,
  onPress: PropTypes.func
};
