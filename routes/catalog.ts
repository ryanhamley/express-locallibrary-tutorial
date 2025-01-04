import express, { Router } from 'express';
const router: Router = express.Router();

// Require controller modules.
import bookController from '../controllers/bookController';
import authorController from '../controllers/authorController';
import genreController from '../controllers/genreController';
import bookInstanceController from '../controllers/bookInstanceController';

/// BOOK ROUTES ///

// GET catalog home page.
router.get('/', bookController.index);

// GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
router.get('/book/create', bookController.bookCreateGet);

// POST request for creating Book.
router.post('/book/create', bookController.bookCreateGet);

// GET request to delete Book.
router.get('/book/:id/delete', bookController.bookCreateGet);

// POST request to delete Book.
router.post('/book/:id/delete', bookController.bookCreateGet);

// GET request to update Book.
router.get('/book/:id/update', bookController.bookCreateGet);

// POST request to update Book.
router.post('/book/:id/update', bookController.bookCreateGet);

// GET request for one Book.
router.get('/book/:id', bookController.bookDetail);

// GET request for list of all Book items.
router.get('/books', bookController.bookList);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/author/create', authorController.authorCreateGet);

// POST request for creating Author.
router.post('/author/create', authorController.authorCreateGet);

// GET request to delete Author.
router.get('/author/:id/delete', authorController.authorCreateGet);

// POST request to delete Author.
router.post('/author/:id/delete', authorController.authorCreateGet);

// GET request to update Author.
router.get('/author/:id/update', authorController.authorCreateGet);

// POST request to update Author.
router.post('/author/:id/update', authorController.authorCreateGet);

// GET request for one Author.
router.get('/author/:id', authorController.authorDetail);

// GET request for list of all Authors.
router.get('/authors', authorController.authorList);

/// GENRE ROUTES ///

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/genre/create', genreController.genreCreateGet);

//POST request for creating Genre.
router.post('/genre/create', genreController.genreCreateGet);

// GET request to delete Genre.
router.get('/genre/:id/delete', genreController.genreCreateGet);

// POST request to delete Genre.
router.post('/genre/:id/delete', genreController.genreCreateGet);

// GET request to update Genre.
router.get('/genre/:id/update', genreController.genreCreateGet);

// POST request to update Genre.
router.post('/genre/:id/update', genreController.genreCreateGet);

// GET request for one Genre.
router.get('/genre/:id', genreController.genreDetail);

// GET request for list of all Genre.
router.get('/genres', genreController.genreList);

/// BOOKINSTANCE ROUTES ///

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get(
  '/bookinstance/create',
  bookInstanceController.bookInstanceCreateGet,
);

// POST request for creating BookInstance.
router.post(
  '/bookinstance/create',
  bookInstanceController.bookInstanceCreateGet,
);

// GET request to delete BookInstance.
router.get(
  '/bookinstance/:id/delete',
  bookInstanceController.bookInstanceCreateGet,
);

// POST request to delete BookInstance.
router.post(
  '/bookinstance/:id/delete',
  bookInstanceController.bookInstanceCreateGet,
);

// GET request to update BookInstance.
router.get(
  '/bookinstance/:id/update',
  bookInstanceController.bookInstanceCreateGet,
);

// POST request to update BookInstance.
router.post(
  '/bookinstance/:id/update',
  bookInstanceController.bookInstanceCreateGet,
);

// GET request for one BookInstance.
router.get('/bookinstance/:id', bookInstanceController.bookInstanceDetail);

// GET request for list of all BookInstance.
router.get('/bookinstances', bookInstanceController.bookInstanceList);

export default router;
