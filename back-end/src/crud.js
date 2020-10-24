'use strict';

class Model{
    constructor(schema){
        this.schema = schema;
    }

    read(_id){
        if (_id){
            return this.schema.find({
                _id
            });
        }else{
            return this.schema.find({});
        }
    }

    findByUserName(username){
        console.log('username',username )
        return this.schema.find({username: username})
    }

    create(complaint){
        let newComplaint = new this.schema(complaint);
        return newComplaint.save();
    }

    update(_id, complaint){
        console.log('id schema', _id)
        console.log('complaint schema', complaint)
        return this.schema.findByIdAndUpdate(_id, {status: complaint.status});
    }

    delete(_id){
        return this.schema.findByIdAndDelete(_id);
    }
}

module.exports = Model;