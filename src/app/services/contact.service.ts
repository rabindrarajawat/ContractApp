import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:5143/api/ContactManagement'; // Adjust the URL to match your API

  constructor(private http: HttpClient) { }

  // GET all Contacts
  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // GET a single Contact by ID
  getContactById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // POST: create a new Contact
  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.apiUrl, contact)
      .pipe(catchError(this.handleError));
  }

  // PUT: update an existing Contact
  updateContact(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.apiUrl}/${id}`, contact)
      .pipe(catchError(this.handleError));
  }

  // DELETE: delete a contact
  deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Handle any errors from the API
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
