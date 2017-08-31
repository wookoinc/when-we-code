import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MdStar, MdStarOutline} from 'react-icons/lib/md';
import configs from './configs';

export default class RatingBar extends Component {
  render() {
    return (
      <div>
        <Stars
          starStyle = {{color:configs.theme_color}}
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

/**
 * A component that allow user to rate something
 *
 * Props
 * - maxScore (number, required, default to 5)
 *   It controls how many stars should show.
 * - score (number)
 *   It sets the current score. Whenever it changes (e.g. on mounting or during life cycle), it changes
 *   the number of stars lighteded.
 * - onChange (function)
 *   A callback function that will be called when the score is changed by user.
 *   Function signature: onChange(score:number)
 * - starStyle (object)
 *   This style controls the appearance of each star
 */
export class Stars extends Component {

  constructor(props) {
    super(props);
    this.state = {
      score: this.props.score? this.props.score : 0
    };
  }

  componentWillReceiveProps(nextProps) {
    // When the props score changes, the number of stars lighteded needs to change.
    // It can happen when we use internet data to set the score.
    // Refresh only score actually changes to optimize performance
    if (this.props.score != nextProps.score)
      this.setState({score:nextProps.score});
  }

  render() {
    return (
      <div style={{display:'flex', flexDirection:'row'}}>
        {(() => {
          // Note that the new star instances will be created and mounted when refreshing
          let stars = [];
          for (let i = 1; i <= this.props.maxScore; i++) {
            stars.push(
              <Star
                key = {i.toString()}
                starStyle = {this.props.starStyle}
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

/**
 * Component that shows a shar
 *
 * Props
 * - id (any, required)
 *   An unique identity of a star
 * - lightened (bool)
 *   It controls whether the star should be lighteded
 * - onPress (function)
 *   The callback function that will be called when the star is pressed
 *   Function signature: _onPress(id)
 * - starStyle (object)
 *   This style controls the appearance of each star
 */
export class Star extends Component {

  render() {
    return (
      <div onClick={this._onPress.bind(this)}>
        {this.props.lightened
        ? <MdStar style={this.props.starStyle} />
        : <MdStarOutline style={this.props.starStyle} />}
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
