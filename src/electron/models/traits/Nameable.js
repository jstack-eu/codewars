module.exports = ({
    nickname
}) => (model) => {

    model.nickname = nickname;

    return model;
};