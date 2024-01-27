const moment = require("moment");
const Posts = require("../models/Post");

function getDate(days) {
  let date = moment().subtract(days, "days");
  return date.toDate();
}

function generateFilterObject(filter) {
  let filterObj = {};
  let order = 1;

  switch (filter) {
    case "day": {
      filterObj = {
        createdAt: {
          $gt: getDate(2),
        },
      };
      order = -1;
      break;
    }
    case "weak": {
      filterObj = {
        createdAt: {
          $gt: getDate(7),
        },
      };
      order = -1;
      break;
    }
    case "month": {
      filterObj = {
        createdAt: {
          $gt: getDate(30),
        },
      };
      order = -1;
      break;
    }
    case "all": {
      order = -1;
      break;
    }
  }
  return {
    filterObj,
    order,
  };
}

exports.exploreController = async (req, res, next) => {
  const query = req.query.filter || "lasted";

  const { filterObj, order } = generateFilterObject(query.toLowerCase());

  try {
    const postsData = await Posts.find(filterObj).sort(
      order === 1 ? "-createdAt" : "createdAt"
    );

    res.json({ data: postsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};
