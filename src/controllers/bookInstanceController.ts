import BookInstance from '../models/bookinstance';
import Book from '../models/book';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';

import type { Response, Request, NextFunction } from 'express';
import ExpressError from '../types/express-error';

// Display list of all BookInstances.
const bookInstanceList = asyncHandler(async (req: Request, res: Response) => {
    const allBookInstances = await BookInstance.find().populate('book').exec();

    res.render('book_instance_list', {
        title: 'Book Instance List',
        book_instance_list: allBookInstances,
    });
});
  
// Display detail page for a specific BookInstance.
const bookInstanceDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate('book')
      .exec();
  
    if (bookInstance === null) {
      // No results.
      const err: ExpressError = new Error('Book copy not found');
      err.status = 404;
      return next(err);
    }
  
    res.render('book_instance_detail', {
      title: 'Book:',
      book_instance: bookInstance,
    });
});  

// Display BookInstance create form on GET.
const bookInstanceCreateGet = asyncHandler(async (req: Request, res: Response) => {
    const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();
  
    res.render('book_instance_form', {
      title: 'Create BookInstance',
      book_list: allBooks,
    });
});  

// Handle BookInstance create on POST.
const bookInstanceCreatePost = [
    // Validate and sanitize fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified')
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body('status').escape(),
    body('due_back', 'Invalid date')
      .optional({ values: 'falsy' })
      .isISO8601()
      .toDate(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req: Request, res: Response) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a BookInstance object with escaped and trimmed data.
      const bookInstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
      });
  
      if (!errors.isEmpty()) {
        // There are errors.
        // Render form again with sanitized values and error messages.
        const allBooks = await Book.find({}, 'title').sort({ title: 1 }).exec();
  
        res.render('book_instance_form', {
          title: 'Create BookInstance',
          book_list: allBooks,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          book_instance: bookInstance,
        });
        return;
      } else {
        // Data from form is valid
        await bookInstance.save();
        res.redirect(bookInstance.url);
      }
    }),
];  

// Display BookInstance delete form on GET.
const bookInstanceDeleteGet = asyncHandler(async (req: Request, res: Response) => {
    const bookInstance = await BookInstance.findById(req.params.id)
      .populate('book')
      .exec();
  
    if (bookInstance === null) {
      // No results.
      res.redirect('/catalog/bookinstances');
    }
  
    res.render('book_instance_delete', {
      title: 'Delete BookInstance',
      book_instance: bookInstance,
    });
});
  
// Handle BookInstance delete on POST.
const bookInstanceDeletePost = asyncHandler(async (req: Request, res: Response) => {
    // Assume valid BookInstance id in field.
    await BookInstance.findByIdAndDelete(req.body.id);
    res.redirect('/catalog/bookinstances');
});

// Display BookInstance update form on GET.
const bookInstanceUpdateGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // Get book, all books for form (in parallel)
    const [bookInstance, allBooks] = await Promise.all([
      BookInstance.findById(req.params.id).populate('book').exec(),
      Book.find(),
    ]);
  
    if (bookInstance === null) {
      // No results.
      const err: ExpressError = new Error('Book copy not found');
      err.status = 404;
      return next(err);
    }
  
    res.render('book_instance_form', {
      title: 'Update BookInstance',
      book_list: allBooks,
      selected_book: bookInstance.book._id,
      book_instance: bookInstance,
    });
});
  
// Handle BookInstance update on POST.
const bookInstanceUpdatePost = [
    // Validate and sanitize fields.
    body('book', 'Book must be specified').trim().isLength({ min: 1 }).escape(),
    body('imprint', 'Imprint must be specified')
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body('status').escape(),
    body('due_back', 'Invalid date')
      .optional({ values: 'falsy' })
      .isISO8601()
      .toDate(),
  
    // Process request after validation and sanitization.
    asyncHandler(async (req: Request, res: Response) => {
      // Extract the validation errors from a request.
      const errors = validationResult(req);
  
      // Create a BookInstance object with escaped/trimmed data and current id.
      const bookInstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
        _id: req.params.id,
      });
  
      if (!errors.isEmpty()) {
        // There are errors.
        // Render the form again, passing sanitized values and errors.
  
        const allBooks = await Book.find({}, 'title').exec();
  
        res.render('book_instance_form', {
          title: 'Update BookInstance',
          book_list: allBooks,
          selected_book: bookInstance.book._id,
          errors: errors.array(),
          book_instance: bookInstance,
        });
        return;
      } else {
        // Data from form is valid.
        await BookInstance.findByIdAndUpdate(req.params.id, bookInstance, {});
        // Redirect to detail page.
        res.redirect(bookInstance.url);
      }
    }),
];

export default {
  bookInstanceList,
  bookInstanceDetail,
  bookInstanceCreateGet,
  bookInstanceCreatePost,
  bookInstanceDeleteGet,
  bookInstanceDeletePost,
  bookInstanceUpdateGet,
  bookInstanceUpdatePost,
};