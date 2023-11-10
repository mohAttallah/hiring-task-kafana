'use strict';
class DataCollection {
    constructor(model) {
        this.model = model;
    }

    get(id) {
        if (id) {
            return this.model.findOne({ where: { id } });
        }
        else {
            return this.model.findAll({});
        }
    }

    create(record) {
        return this.model.create(record);
    }

    update(id, data) {
        return this.model.findOne({ where: { id } })
            .then(record => record.update(data));
    }

    delete(id) {
        return this.model.findOne({ where: { id } })
            .then(record => {
                if (record) {
                    return this.model.destroy({ where: { id } });
                } else {
                    throw new Error('Record not found');
                }
            });
    }
}


module.exports = DataCollection