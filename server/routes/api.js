/**
 * EEPM DEV
 * mccstan
 * December 2016
 * 
 */


"use strict";

var _ = require('lodash');
var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD5QuFb1uHRos-3VP3Qpbsm0TPPiFNaGGI",
    authDomain: "eepm-bib-db.firebaseapp.com",
    databaseURL: "https://eepm-bib-db.firebaseio.com",
    storageBucket: "eepm-bib-db.appspot.com",
    messagingSenderId: "120782703793"
};
firebase.initializeApp(config);

console.log(firebase);
var BOOKS;


//var bookListRef = firebase.database().ref('booklist/');
firebase.database().ref('booklist/').once('value').then(function(snapshot) {
  BOOKS = snapshot.val();
});



//NEW CODE

/**
 * Fetch all books
 * If category query is provided, fetch books filtered by category
 */
exports.fetchBooks = function (req, res) {
    var books = [];
    if(req.query.category){
        books = BOOKS.filter(function(books){
            return books.category === req.query.category;
        });
    } else {
        books = BOOKS;
    }

		setTimeout(function () {
			res.status(200).json(books);
		}, 1000);
};


/**
 * Fetch a book by id
 */
exports.fetchBook = function (req, res){
    var id = req.params.id,

	book = _.find(BOOKS, function (book) {
		return book.id == id;
	});

	if (book) {
		return res.status(200).json(book);
	} else {
		return res.status(404).end();
	}
};


/**
 * Create a book
 */
exports.addBook = function (req, res) {
    var bookToAdd = req.body;

	var existingBook = _.find(BOOKS, function (book) {
		return bookToAdd.title == book.title;
	});

	if (existingBook) {
		return res.status(500).json({ error: 'Le book ' + existingBook.title + ' a déjà été ajouté.' });
	} else {
    	var maxID = _(BOOK).map('id').max() || 0;
		bookToAdd.id = maxID + 1;

		BOOKS.push(bookToAdd);

		return res.status(201).json(bookToAdd);
	}
};


/**
 * Update a book
 */
exports.updateBook = function(req, res) {
    var bookToUpdate = req.body,
		id = req.params.id;

	_.forEach(BOOK, function (book, index) {
		if (book.id == id) {
			BOOKS[index] = bookToUpdate;
			return res.status(200).json(bookToUpdate);
		}
	});

	return res.status(304).json(bookToUpdate);
};


/**
 * Delete a book
 */
exports.deleteBook = function (req, res) {
    var id = req.params.id,

	removedBooks = _.remove(BOOKS, function (book) {
		return book.id == id;
	});

	if (_.isEmpty(removedBooks)) {
		return res.status(304).end();
	} else {
		return res.status(200).json({});
	}

};