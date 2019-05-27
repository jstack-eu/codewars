module.exports = ({
    name
}) => (model) => {

    model.name = name;

    return model;
};