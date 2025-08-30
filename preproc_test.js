let markdown = `
![][image-4]

[image-4]:\thttps://upload.wikimedia.org/wikipedia/commons/d/db/Swissbit_2GB_PC2-5300U-555.jpg
[image-5]:\thttps://arith-matic.com/notebook/img/memory/memory-addressing.jpg
[image-6]:\thttps://5.imimg.com/data5/GH/CM/MY-16113916/intel-processor-500x500.jpg
[image-7]:\thttps://i0.wp.com/www.techquintal.com/wp-content/uploads/2021/12/Advantages-and-Disadvantages-of-Assembly-Language.jpg?fit=1024%2C576&ssl=1

`

const regexp = /^\[(image-\d+)\]:\t(http.*)/gm
let result = regexp.exec(markdown);
while(result != null) {
    // console.log(result[1], result[2])
    markdown = markdown.replace("![][" + result[1] + "]", "![](" + result[2] + ")")
    result = regexp.exec(markdown);
}

console.log(markdown)