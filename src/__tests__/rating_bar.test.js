import RatingBar, {Star, Stars} from '../rating_bar';

import React from 'react';
import {mount} from 'enzyme';

describe('component Star tests', () => {

  let props;
  let mounted_component;

  const mountedComponent = () => {
    if (!mounted_component) {
      mounted_component = mount(
        <Star {...props} />
      );
    }
    return mounted_component;
  }

  beforeEach(() => {
    props = {
      id: 23
    };
    mounted_component = undefined;
  });

  describe('prop lightened tests', () => {

    it('if lightened is true', () => {
      Object.assign(props, {
        lightened: true
      });

      expect(mountedComponent().find('MdStar')).toHaveLength(1);
    });

    it('if lightened is not true', () => {
      expect(mountedComponent().find('MdStarOutline')).toHaveLength(1);
    });

  });

  describe('prop onPress tests', () => {

    it('onPress should be called with prop id', () => {
      Object.assign(props, {
        onPress: jest.fn()
      });

      mountedComponent().find('Star').first().simulate('click');

      expect(props.onPress).toBeCalledWith(props.id);
    });

    it('no error should be thrown if onPress is not provided', () => {
      expect(() => {
        mountedComponent().find('Star').first().simulate('click');
      }).not.toThrow();
    });

  });

});

describe('component Stars tests', () => {

  let props;
  let mounted_component;

  const mountedComponent = () => {
    if (!mounted_component) {
      mounted_component = mount(
        <Stars {...props} />
      );
    }
    return mounted_component;
  }

  beforeEach(() => {
    props = {
      maxScore: 5
    };
    mounted_component = undefined;
  });

  describe('prop maxScore tests', () => {

    it('no star should show', () => {
      Object.assign(props, {
        maxScore: 0
      });

      expect(mountedComponent().find('Star')).toHaveLength(0);
    });

    it('5 stars should show', () => {
      expect(mountedComponent().find('Star')).toHaveLength(5);
    });

    it('stars should flip after clicking', () => {
      mountedComponent().find('Star').at(2).simulate('click');
      expect(mountedComponent().find('MdStar')).toHaveLength(3);
    });

  });

  describe('prop score tests', () => {

    it('initial value of score should work', () => {
      Object.assign(props, {
        score: 4
      });

      expect(mountedComponent().find('MdStar')).toHaveLength(4);
    });

    it('changing value of score should change number of MdStar', () => {
      mountedComponent(); // mount it before changing props

      mountedComponent().setProps({
        score: 2
      });

      expect(mountedComponent().find('MdStar')).toHaveLength(2);
    });

    it('5 MdStarOutline should show if prop score is missing', () => {
      expect(mountedComponent().find('MdStarOutline')).toHaveLength(5);
    });

  });

  describe('prop onChange tests', () => {

    it('onChange should be called properly', () => {
      Object.assign(props, {
        onChange: jest.fn()
      });

      mountedComponent().find('Star').at(4).simulate('click');

      expect(props.onChange).toBeCalledWith(5);
    });

    it('no error should be thrown if onChange is not provided', () => {
      expect(() => {
        mountedComponent().find('Star').at(4).simulate('click');
      }).not.toThrow();
    });

  });

});

describe('component RatingBar tests', () => {

  let props;
  let mounted_component;

  const mountedComponent = () => {
    if (!mounted_component) {
      mounted_component = mount(
        <RatingBar {...props} />
      );
    }
    return mounted_component;
  }

  beforeEach(() => {
    props = {};
    mounted_component = undefined;
  });

  describe('prop rating tests', () => {

    it('prop rating should work', () => {
      Object.assign(props, {
        rating: {
          score: 3,
          by: {
            name: "Lu"
          }
        }
      });

      expect(mountedComponent().find('Stars').first().props().score).toBe(3);
      expect(mountedComponent().find('p').first().text()).toBe("rated by Lu");
    });

    it('no error should be thrown if prop rating.by is missing', () => {
      Object.assign(props, {
        rating: {
          score: 3
        }
      });

      expect(mountedComponent).not.toThrow();
      expect(mountedComponent().find('p').first().text()).toBe("rated by ");
    });

    it('no error should be thrown if prop rating.by.name is missing', () => {
      Object.assign(props, {
        rating: {
          score: 3,
          by: {}
        }
      });

      expect(mountedComponent).not.toThrow();
      expect(mountedComponent().find('p').first().text()).toBe("rated by ");
    });

  });

  describe('prop onChange tests', () => {

    beforeEach(() => {
      Object.assign(props, {
        rating: {
          score: 3,
          by: {
            name: "Lu"
          }
        }
      });
    });

    it('prop onChange should be called properly', () => {
      Object.assign(props, {
        onChange: jest.fn()
      });

      mountedComponent().find('Star').at(0).simulate('click');

      expect(props.onChange).toBeCalledWith(1);
    });

    it('no error should be thrown if onChange is not provided', () => {
      expect(() => {
        mountedComponent().find('Star').at(4).simulate('click');
      }).not.toThrow();
    });

  });

});
