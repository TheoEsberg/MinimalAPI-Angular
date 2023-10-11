import { HttpClient } from "@angular/common/http";
import { Book } from "../models/book";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class BookService{
    baseUrl = 'https://localhost:7174/api/';

    constructor(private http:HttpClient){ }

    // Get All Books
    getAllBooks():Observable<Book[]>{
        return this.http.get<Book[]>(this.baseUrl + "books")
    }

    addBook(book:Book):Observable<Book>{
        return this.http.post<Book>(this.baseUrl + "AddBook", book)
    }

    deleteBook(id:number):Observable<Book>{
        return this.http.delete<Book>(this.baseUrl + "DeleteBook/" + id)
    }

    updateBook(book:Book):Observable<Book>{
        return this.http.put<Book>(this.baseUrl + "UpdateBook", book)
    }
}