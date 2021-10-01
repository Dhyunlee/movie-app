const express = require('express');
const { Favorite } = require('../models/Favorite');

const router = express.Router();

router.post('/favoriteNumber', (req, res) => {
  req.body.movieId;

  //mongoDB에서 favorite 숫자 조회
  Favorite.find({ movieId: req.body.movieId }).exec((err, info) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, favoriteNumber: info.length });
  });
  // 그 다음에 프론트에 다시 숫자 정보 보내기
});

router.post('/favorited', (req, res) => {
  // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB 에서 가져오기

  //mongoDB에서 favorit 숫자 조회
  Favorite.find({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, info) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (info.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, favorited: result });
  });
  // 그 다음에 프론트에 다시 숫자 정보 보내기
});

// Favorite 제거
router.post('/removeFromFavorite', (req, res) => {
  Favorite.findOneAndDelete({
    movieId: req.body.movieId,
    userFrom: req.body.userFrom,
  }).exec((err, doc) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, doc });
  });
});

// Favorite 추가
router.post('/addToFavorite', (req, res) => {
  const favorite = new Favorite(req.body);
  favorite.save((err, doc) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true });
  });
});

router.post('/getFavoriedMovie', (req, res) => {
  Favorite.find({ userFrom: req.body.userFrom }).exec((err, favorite) => {
    if (err) return res.status(400).send(err);
    return res.status(200).json({ success: true, favorite });
  });
});

module.exports = router;
