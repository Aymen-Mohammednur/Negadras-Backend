const fileUpload = async (req, res, next) => {
  console.log("file disk uploaded");
  console.log("Response: ", res.file);
  res.send("file disk upload success");
};

module.exports = {
  fileUpload,
};
