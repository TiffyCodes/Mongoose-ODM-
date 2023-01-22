const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';

const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('Connected correctly to server');

    //add new doc
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    // });
    })
    .then(campsite => {
        console.log(campsite);
        // return Campsite.find();
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' }
        }, {
            new: true
            //so it returns the new doc and not original before being updated
        });
    })
    .then(campsite => {
        console.log(campsite);

        //comments sub doc
        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });
        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });
});