const fs = require('fs');

const obj = {
    a: 5,
    b: 6,
};

// json 
const jsonObjn = JSON.stringify(obj)

fs.writeFile("test.txt", jsonObjn, (err) => {
    // Write file done
    if (err) {
        console.log(err);
    } else {
        console.log("Write file success!!");
    }
});
console.log("End write file");

console.log("End read file");
fs.readFile("test.txt", { encoding: 'utf-8' }, (err, data) => {
    // Write file done
    if (err) {
        console.log(err);
    } else {
        const dataObj = JSON.parse(data);
        console.log("File data: ", dataObj.a);
    }
});
console.log("End read file");