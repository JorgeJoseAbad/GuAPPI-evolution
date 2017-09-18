
const Q = require('q');
const _ = require('lodash');
const userModel = require('./user.model');




exports.createUser = function(req, res, next) {
	var item = new userModel({
	    name: req.body.name,
      email: req.body.email,
      password:req.body.password,
      direction:req.body.direction,
      imgUrl:req.body.imgUrl

	});

	Q.nfcall(item.save.bind(item))
        .then(function () {
            res.json({
                _id: item._id,
                name: item.name,
                email: item.email,
                password: item.password,
                direction: item.direction,
                imgUrl: item.imgUrl,
                created_at:item.created_at,
                updated_at: item.updated_at
            });
        });
};

// exports.readUser = function(req, res, next) {
//   	userModel.find({}, function(err, lists) {
// 	 	if (err) {
// 	 		return res.json(err);
// 	 	}
//
//         return new Promise((resolve, reject) => {
//             userModel.populate(lists, 'cards')
//                 .then((_lists) => {
//                     _.forEach(lists, (list) => {
//                         user.cards = _.orderBy(list.cards, ['position','title','_id']);
//                     });
//                     return res.json( lists );
//                 })
//                 .catch((error) => res.status(400).json({ message: 'impossible to retrieve user!!' }));
//         });
//   	});
// };
exports.readUser = function(req, res, next){
	const id = req.params.id;
	userModel.findById(id, (err, user)=>{
		if (err) return next(err);
		res.status(200).json(user);
	});
};

/*
exports.editUser = function(req, res, next) {
	listModel
        .findById(req.params.id, function(err, list) {
            if (err) {
                res.status(400).json({ message: 'impossible to update the list', error: err });
            }

            if (list) {
                _.merge(list, req.body);
                list.save(function(err) {
                    if (err) {
                        res.json({ message: 'impossible to update the list', error: err });
                    };
                    res.json({ message: 'list successfully updated', list });
                });
            } else {
                res.status(404).json({ message: 'list not found' });
            }
        });
};

exports.removeUser = function (req, res) {
    listModel
        .findByIdAndRemove(req.params.id, function(err) {

            if (err) {
                res.json({ message: 'error during remove list', error: err });
            }

            // Delete all cards in the list
            cardModel.remove({ list: req.params.id }, function() {
                res.json({ message: 'list successfully deleted' });
            });
        });
};
*/
