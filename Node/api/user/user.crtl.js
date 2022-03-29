var users = [
    { id: 1, name: 'elice' },
    { id: 2, name: 'bak' },
    { id: 3, name: 'chris' },
];
const index = function(req, res){
    req.query.limit = req.query.limit || 10;
    let limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
      res.status(400);
    }
    res.json(users.slice(0, limit));
}
const show = function(req,res){
    let id = parseInt(req.params.id,10);
    if(Number.isNaN(id)) return res.status(400).end();
  
    let user = users.filter((user) => user.id === id)[0];
    if(!user) return res.status(404).end();
    res.json(user);
}
const destroy = function(req,res){
    let id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    users.filter(user => user.id !== id);
    res.status(204).end();
}

const create = function(req,res){
    let name = req.body.name;
    if(!name) return res.status(400).end();
  
    let isConfict = users.filter(user => user.name === name).length
    if(isConfict) return res.status(409).end();
  
    let id = Date.now();
    let user = {id, name};
    users.push(user);
    res.status(201).json(user);
}

const update = function(req,res){
    let id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    let name = req.body.name;
    if(!name) return res.status(400).end();
    let isConfict = users.filter(user => user.name === name).length
    if(isConfict) return res.status(409).end();
  
    let user = users.filter(user=>user.id === id)[0];
    if(!user) return res.status(404).end();
  
    user.name = name;
    res.json(user);
}
module.exports = {
   index,show,destroy,create,update
}