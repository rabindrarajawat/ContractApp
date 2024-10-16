import { Routes } from '@angular/router';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';

export const routes: Routes = [{ path: 'contacts', component: ContactListComponent }, 
    { path: 'createcontact', component: ContactFormComponent },
    { path: 'editcontact/:id', component: ContactFormComponent },
    { path: '**', redirectTo: '/users', pathMatch: 'full' }  // Fallback for unknown paths
  ];