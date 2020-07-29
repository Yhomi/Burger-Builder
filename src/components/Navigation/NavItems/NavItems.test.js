import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavItems from './NavItems'
import NavItem from './NavItem/NavItem';
import classes from './NavItem.module.css';

configure({adapter:new Adapter()})

describe('<NavItems />',()=>{
  let wrapper
  beforeEach(()=>{
     wrapper = shallow(<NavItems />);
  })
  it('should render two NavItem if you are un-authenticated',()=>{

    //Optional:wrapper.setProps({isAuthenticated:false})
    expect(wrapper.find(NavItem)).toHaveLength(2);
  });
  it('should render three NavItems if you are authenticated',()=>{
    //wrapper =shallow(<NavItems isAuthenticated />);
    wrapper.setProps({isAuthenticated:true})
    expect(wrapper.find(NavItem)).toHaveLength(3)
  });
  it('should have a logout link if authenticated',()=>{
    wrapper.setProps({isAuthenticated:true})
    expect(wrapper.contains(<NavItem link="/logout">Logout</NavItem>)).toEqual(true)
  });
  // it('should contain NavItem className',()=>{
  //   expect(wrapper.contains(<ul className={classes.NavItems}>
  //     <NavItem>BurgerBuilder</NavItem>
  //   </ul>)).toHaveLength(2)
  // })
})
