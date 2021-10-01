const express = require('express');
const { Favorite } = require('../models/Favorite');

const router = express.Router();

router.post('/favorteNumber', (req, res) => {
  req.body.movieId;

  //mongoDB에서 favorte 숫자 조회
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
  // 그 다음에 프론트에 다시 숫자 정보 보내기
});

module.exports = router;
