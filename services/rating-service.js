const ratingModel = require('../models/rating-model');

exports.addRating = async (ratingInfo) => {
  await ratingModel.addRating(ratingInfo);
  let totalRating = 0;
  let totalNumberRating = 0;
  const ratings = await ratingModel.getRatingByIdBook(ratingInfo.id_book);
  ratings.forEach((item) => {
    totalRating += item.rating;
    totalNumberRating += 1;
  });
  const averageRating = parseFloat(totalRating / totalNumberRating);
  return { ratings, averageRating };
};
