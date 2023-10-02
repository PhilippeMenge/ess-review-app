import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { User } from '../../models/userModel';
import { ContentModel } from '../../models/content';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.scss']
})
export class EditContentComponent implements OnInit{
  username: string | null = null;
  user: User | undefined;
  contentDto = new ContentModel();
  constructor(private router: Router, private authService: AuthService){}
  ngOnInit() {
    this.authService.getUserData().subscribe({
      next: (user) =>{
        this.username = user.username;
        this.user = user;
      },
      error: (error) =>{
        console.error("Erro ao obter o usuário", error);
      }
    })
  }

    editContent(contentdto: ContentModel){
      return this.authService.editContent(contentdto).subscribe()
       
    }
    removeContent(contentdto: ContentModel){
      return this.authService.removeContent(contentdto).subscribe()
    }
    redirectToProfile(event: Event){
      event.preventDefault();
      this.router.navigate(['profile']);
    }
    
    redirectToHome(event: Event){
      event.preventDefault();
      this.router.navigate(['home', ]);
    }
  
    redirectToFilms(event: Event){
      event.preventDefault();
      this.router.navigate(['profile']);
    }
    logout() {
      localStorage.removeItem('jwtToken');
  
      this.router.navigate(['home']);
    }
}


