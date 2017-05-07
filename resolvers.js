//the root provides the top-level API endpoints
var root={
 hello({myName}){
   return "my name is "+myName;
 },
 getMessage({id}){
   if( !fakeDatabase[id] ){
     throw new Error('no message exists with id ' + id);
   }
 },
 createMessage({input}){
   //create a random id for our "database"
   var id=require('crypto').randomBytes(10).toString('hex');
   fakeDatabase[id]=input;
   return new Message(id,input);
 },
 updateMessage({id,input}){
  if( !fakeDatabase[id] ){
    throw new Error('no message exists with id ' + id);
  }
  //this replaces all old data, but some apps might want partial update
  fakeDatabase[id]=input;
  return new Message(id,input)
 }

}

module.exports=root;