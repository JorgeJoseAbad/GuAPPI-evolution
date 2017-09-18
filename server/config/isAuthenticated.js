/*probablemente funcion inutil, copiada sin motivo*/

function isAuthenticated(req, res, next){
  console.log("in function is authenticated");

  if (!req.isAuthenticated()){
    console.log(req.isAuthenticated()===true);
     return res.status(403).json(new Error("Not Authorized"));
  }
  return next();
}

module.exports = isAuthenticated;
