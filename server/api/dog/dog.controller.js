const Q = require('q');
const _ = require('lodash');
mongoose = require('mongoose');
const fs         = require('fs');

const dogModel = require('./dog.model');

console.log("he llegado a controlador de chuhos");

exports.createDog = function(req, res) {
	console.log("req.body:------------ en create Dogs");
	console.log(req.body);
	console.log("req.file.filename:---------- en create Dogs");
	console.log(req.file.filename);

	var item = new dogModel({
			user_id: req.body.user_id,
	    dogName: req.body.dogName,
      breed: req.body.breed,
      age:req.body.age,
      description:req.body.description,
			imgUrl:`/uploads/${req.file.filename}`,
			latitude:req.body.latitude,
			longitude:req.body.longitude
	});

	console.log("item:");
	console.log(item);
	Q.nfcall(item.save.bind(item))
      .then(function () {
					console.log("en Q.nfcall");
					console.log(item);
          res.json({
              _id: item._id,
							user_id: item.user_id,
              dogName: item.dogName,
              breed: item.breed,
              age: item.age,
							imgUrl: item.imgUrl,
							latitude: item.latitude,
							longitude: item.longitude,
              created_at:item.created_at,
              updated_at: item.updated_at
          });
      })
			.catch(function(e){
				console.log("error en BBDD---->",e);
				res.json({message:"Error in Dog saving on BBDD: " + e.message});
			});
};


exports.readDogs=function(req,res,next){
	  	dogModel.find({}, function(err, dogs) {
		 	if (err) {
		 		return res.json(err);
		 	}
			return res.json(dogs);
	  	});

};

exports.readDog=function(req,res,next){
			console.log(req.params.id);
	  	dogModel.find({_id:req.params.id}, function(err, dog) {
				if (err) {
					return res.json(err);
				}
				return res.json(dog);
	  	});
   };

   //intento sacar perros segun el id del usuario logueado
	 //el req.params.id seria el user_id.
 exports.readDogByIdUser=function(req,res,next){
 			console.log(req.params.id);
 	  	dogModel.find({user_id:req.params.id}, function(err, dog) {
 				if (err) {
 					return res.json(err);
 				}
 				return res.json(dog);
 	  	});
    };

			//Lee el perro por su id es directo de un get(/:id)
		exports.readDogById=function(req,res,next){
				 console.log(req.params.id);
				 dogModel.find({_id:req.params.id}, function(err, dog) {
					 if (err) {
						 return res.json(err);
					 }
					 return res.json(dog);
				 });
			 };

		exports.deleteDog=function(req,res,next){
				console.log(req.params.id);
				dogModel.findByIdAndRemove({_id:req.params.id},function(err,dog){
					console.log(dog);
					console.log(dog.imgUrl);
		      var picToDelete='public'+dog.imgUrl;
		      console.log(picToDelete);
					if (err){
						return res.json(err);
					}
					else{
						fs.unlink(picToDelete, (err) => {
		          try{
		            if (err) throw err;

		          }
		          catch (e){
		            console.log(e);

		          }
		          finally {
		            console.log("unlink made");
		          }
		        });
					}
					return res.json({
						message: 'dog has been removed!'
					});

				});

		};

/*
exports.createList = function(req, res, next) {
	var item = new listModel({
	    title: req.body.title,
        position: req.body.position
	});

	Q.nfcall(item.save.bind(item))
        .then(function () {
            res.json({
                _id: item._id,
                title: item.title,
                position: item.position,
                cards: []
            });
        });
};
*/
