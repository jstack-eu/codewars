export const decode = (encoded) => {
    const amounts = [4, 3];

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
