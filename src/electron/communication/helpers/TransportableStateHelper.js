const byCharCodes = (str, list) => str + String.fromCharCode(...list);
const encodeSection = (section) => section.reduce(byCharCodes, '');
const encode = (payload) => payload.map(encodeSection).join('-');

const decode = (encoded) => {
    const amounts = [4,2];

    const sections = encoded.split('-');

    return sections.map((section, index) => {

        const sectionList = [];

        for (let i = 0; i < section.length; i += amounts[index]) {

            const list = [];

            for (let j = 0; j < amounts[index]; j++) {
                list[j] = section.charCodeAt(i + j);
            }

            sectionList.push(list);
        }

        return sectionList;

    });
};

module.exports = {
    encode,
    decode
};