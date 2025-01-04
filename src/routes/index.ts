import express, { Router } from 'express';
const router: Router = express.Router();

// GET home page.
router.get('/', function (req, res) {
  res.redirect('/catalog');
});

export default router;
