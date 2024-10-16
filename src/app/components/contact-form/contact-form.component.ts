import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditMode = false;
  contactId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.contactId = +id;
        this.contactService.getContactById(this.contactId).subscribe(contact => {
          this.contactForm.patchValue(contact);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    const contact: Contact = this.contactForm.value;

    if (this.isEditMode && this.contactId) {
      this.contactService.updateContact(this.contactId, contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    } else {
      this.contactService.createContact(contact).subscribe(() => {
        this.router.navigate(['/contacts']);
      });
    }
  }
}
