


const axios = require('axios');

const checkedLinks = []
const data = []

module.exports = async (contents) => {
    let arr=[]
    if (typeof contents !== 'string') {
        contents = Object.values(contents)
        contents.map(async content => {
            content.map(async item => {
                data.push(item)
            });
        });
        contents = data
    }
    if (typeof contents === 'string') {
        contents = [contents]
    }
    
    for (let i = 0; i < contents.length; i += 1) {
        let link = contents[i];
        if (!checkedLinks.includes(link)) {
            try {
                let response = await axios(`${link}`).catch((err) => console.log(err));
                console.log(link);
                arr = [];
                arr.push(response.data);
                checkedLinks.push(link);
            } catch (error) {
                console.log(error)
                console.log("Error occurred while fetching data");
            }
        }
    }
    return arr
}

