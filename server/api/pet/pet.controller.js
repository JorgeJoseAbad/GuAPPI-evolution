const Q = require('q');
const _ = require('lodash');
const petModel = require('./pet.model');




exports.createPet = function(req, res, next) {
	var item = new petModel({
	    name: req.body.name,
      specie: req.body.specie,
      breed:req.body.breed,
      description:req.body.description,
      imgUrl:req.body.imgUrl

	});

	Q.nfcall(item.save.bind(item))
        .then(function () {
            res.json({
                _id: item._id,
                name: item.name,
                specie: item.specie,
                breed: item.breed,
                description: item.description,
                imgUrl: item.imgUrl,
                created_at: item.created_at,
                updated_at: item.updated_at
            });
        });
};

exports.getPet = function(req, res, next) {
  	petModel.find({}, function(err, lists) {
	 	if (err) {
	 		return res.json(err);
	 	}

        return new Promise((resolve, reject) => {
            petModel.populate(lists, 'cards')
                .then((_lists) => {
                    _.forEach(lists, (list) => {
                        pet.cards = _.orderBy(list.cards, ['position','title','_id']);
                    });
                    return res.json( lists );
                })
                .catch((error) => res.status(400).json({ message: 'impossible to retrieve user!!' }));
        });
  	});
};
