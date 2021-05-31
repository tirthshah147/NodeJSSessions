function getCustomers(req,res) {
  res.send("GET request for customers is successfull.");
}

// function postCustomers(req,res) {
//   res.send("GET request for customers is successfull.");
// }

module.exports.getCustomers = getCustomers;
// module.exports.postCustomers = postCustomers;