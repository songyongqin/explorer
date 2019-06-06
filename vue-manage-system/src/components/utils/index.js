let strFor

function strFor (str)=>{
  return str.replace(/(\w{3})(\w+)(\w{3})/,'&1...&3')
}
export {strFor}