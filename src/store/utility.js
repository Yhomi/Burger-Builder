export const updatedObject = (stateProperty,updatedProperties)=>{
  return{
    ...stateProperty,
    ...updatedProperties
  }
}
