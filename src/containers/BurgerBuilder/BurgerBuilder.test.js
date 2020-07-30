import React from 'react';

import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter:new Adapter()})

describe('<BurgerBuilder />',()=>{
  let wrapper;
  beforeEach(()=>{
    wrapper=shallow(<BurgerBuilder onInitIgredient={()=> {}} />);
  })

  it('should render <BuildControls /> if ingredient is set',()=>{
    wrapper.setProps({ings:{cheese:0}})
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  })
})
