const Q = require('q');
const _ = require('lodash');
mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

const kgarten = require('./kgarten.model');


console.log("he llegado a kgargencontroller");

exports.enterDog=function(req,res){
 console.log(req.body);
  var kitem= new kgarten({
    userProp_id:req.body.prop_id,
    userAdopt_id:req.body.adopt_id,
    dog_id:req.body.dog_id,

  });

  console.log("kitem:");
	console.log(kitem);

	Q.nfcall(kitem.save.bind(kitem))
        .then(function () {
					  console.log("en Q.nfcall");
						console.log(kitem);
            res.json({
              userProp_id:kitem.userProp_id,
              userAdopt_id:kitem.userAdopt_id,
              dog_id:kitem.dog_id,
            });
        });
};

exports.listkgarten=function(req,res,next){
	  	kgarten.find({}, function(err, pets) {
		 	if (err) {
		 		return res.json(err);
		 	}
			return res.json(pets);
	  	});

};

exports.editKgarten=function(req,res,next){
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  else console.log(req.params.id, "valid");


  console.log("en editKgarten");
  console.log(req.body);
  console.log(req.params.id);

  const updates = {
    dog_id:req.body.dog_id,
    userAdopt_id:req.body.userAdopt_id,
    userProp_id:req.body.userProp_id,

  };

 console.log(updates);
  kgarten.findByIdAndUpdate(req.params.id, updates, function(err,pet){
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log(req.body);
    return res.json(pet);
    });

};
