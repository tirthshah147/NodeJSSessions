// Using References(normalization)

//Trade off between query performance vs consistency

//Author table (collection) // Good in consistency but bad in query performance
let author = {
  name:"tirth"
}

let course={
  courseName:"NodeJS",
  author:"id"
}

// Using Embedded Documents (Denormalization) // Good in query performance but bad in consistency

let author = {
  name:"Tirth"
}

let course={
  courseName:"nodeJS",
  author:{
    name:"Tirth"
  }
}

// Hybrid approach


let author = {
  name:"Tirth"
}

let course={
  courseName:"nodeJS",
  author:{
    _id: 1234,
    name:"Tirth",
    college:"LD",
    charges:250
  }
}


