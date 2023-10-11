import { Component } from '@angular/core';
import { BookService } from './service/book.service';
import { Book } from "./models/book";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Angular-MinimalAPI';

  books : Book[]=[];

  newBook: Book = {
    id: 0,
    title: '',
    description: '',
    author: '',
    genre: '',
    year: null,
    isAvailable: false
  };

   updatedBook: Book = {
    id: 0,
    title: '',
    description: '',
    author: '',
    genre: '',
    year: null,
    isAvailable: false
  };

  constructor(private bookservice:BookService){ }

  ngOnInit():void{
    this.getAllBooks();
  }

  // Get all books
  getAllBooks() {
    this.bookservice.getAllBooks().subscribe((response: any) => {
      console.log('Response from service:', response);

      // Check if the response is successful
      if (response.isSuccess) {
        this.books = response.result; // Assign the 'result' property
      } else {
        // Handle error if needed
        console.error('Error in response:', response.errorMessages);
      }
    });
  }

  toggleDetails(book: Book): void {
    book.showDetails = !book.showDetails;
  }

  addBook(): void {
    // Send a request to your API to add the new book
    this.bookservice.addBook(this.newBook).subscribe((response: any) => {
      if (response.isSuccess) {
        // If the request is successful, add the new book to the local list
        this.books.push(this.newBook);
        // Reset the form for the next entry
        this.resetForm();
      } else {
        // Handle errors here if needed
        console.error('Error adding the book:', response.errorMessages);
      }
    });
  }

  updateBook(): void {
    // Send a request to your API to update the book
    this.bookservice.updateBook(this.updatedBook).subscribe((response: any) => {
      console.log(response); 
      if (response.isSuccess) {
        // If the request is successful, update the existing book in the local list
        const index = this.books.findIndex((book) => book.id === this.updatedBook.id);
        if (index !== -1) {
          this.books[index] = { ...this.updatedBook }; // Update the existing book
        }
        // Reset the form for the next entry
        this.resetForm();
      } else {
        // Handle errors here if needed
        console.error('Error updating the book:', response.errorMessages);
      }
    });
  }

  resetForm(): void {
    this.newBook = {
      id: 0,
      title: '',
      description: '',
      author: '',
      genre: '',
      year: null,
      isAvailable: false
    };
  }

  deleteBook(id:number): void{
    console.log("IS RUNNING!")
    this.bookservice.deleteBook(id).subscribe(response => this.getAllBooks());
  }

  populateForm(book:Book){
    this.updatedBook = book;
  }
}
