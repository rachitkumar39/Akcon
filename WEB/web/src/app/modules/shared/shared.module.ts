import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  HeaderComponent,
  FooterComponent,
  LoginComponent,
  ForgotPasswordComponent,
  AboutComponent,
  SignupComponent,
  CreatePostComponent,
  ViewPostComponent,
  NotFoundComponent,
  PostDetailModelComponent,
  ErrorDialogComponent,
  EventDetailModelComponent,
  NewsDetailModelComponent,
  CreatePostModelComponent,} from './components';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { ResizeImageModelComponent } from './components/models/resize-image-model/resize-image-model.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageComponent } from './components/message/message.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShowProfilePhotoModelComponent } from './components/models/show-profile-photo-model/show-profile-photo-model.component';
import { ProfilePersonalDetailModelComponent } from './components/models/profile-personal-detail-model/profile-personal-detail-model.component';
import { ProfilePersonalDetailEditModelComponent } from './components/models/profile-personal-detail-edit-model/profile-personal-detail-edit-model.component';
import { ProfileContactModelComponent } from './components/models/profile-contact-model/profile-contact-model.component';
import { ProfileContactEditModelComponent } from './components/models/profile-contact-edit-model/profile-contact-edit-model.component';
import { ProfileEducationModelComponent } from './components/models/profile-education-model/profile-education-model.component';
import { ProfileEducationEditModelComponent } from './components/models/profile-education-edit-model/profile-education-edit-model.component';
import { ProfileExperienceModelComponent } from './components/models/profile-experience-model/profile-experience-model.component';
import { ProfileExperienceEditModelComponent } from './components/models/profile-experience-edit-model/profile-experience-edit-model.component';
import { ProfileSkillsModelComponent } from './components/models/profile-skills-model/profile-skills-model.component';
import { ProfileSkillsEditModelComponent } from './components/models/profile-skills-edit-model/profile-skills-edit-model.component';
import { MessageuserlistComponent } from './components/models/messageuserlist/messageuserlist.component';
// import { PostDetailModelComponent } from './components/models/post-detail-model/post-detail-model.component';
// import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
// import { EventDetailModelComponent } from './components/models/event-detail-model/event-detail-model.component';
// import { NewsDetailModelComponent } from './components/models/news-detail-model/news-detail-model.component';
// import { CreatePostModelComponent } from './components/models/create-post-model/create-post-model.component';
// import { ImageCropModelComponent } from './components/models/image-crop-model/image-crop-model.component';

const COMMON_COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LoginComponent,
  ForgotPasswordComponent,
  AboutComponent,
  SignupComponent,
  CreatePostComponent,
  ViewPostComponent,
  PostDetailModelComponent,
  NotFoundComponent,
  ErrorDialogComponent,
  EventDetailModelComponent,
  NewsDetailModelComponent,
  CreatePostModelComponent,
]
const MATERIAL_MODULES=[
  MatSidenavModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatMenuModule,
  MatSelectModule,
]

@NgModule({
  declarations: [
    ...COMMON_COMPONENTS,
    ResizeImageModelComponent,
    MessageComponent,
    SearchComponent,
    ProfileComponent,
    ShowProfilePhotoModelComponent,
    ProfilePersonalDetailModelComponent,
    ProfilePersonalDetailEditModelComponent,
    ProfileContactModelComponent,
    ProfileContactEditModelComponent,
    ProfileEducationModelComponent,
    ProfileEducationEditModelComponent,
    ProfileExperienceModelComponent,
    ProfileExperienceEditModelComponent,
    ProfileSkillsModelComponent,
    ProfileSkillsEditModelComponent,
    MessageuserlistComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    ImageCropperModule,
    HttpClientModule,
    ...MATERIAL_MODULES
  ],
  exports:[
    ...COMMON_COMPONENTS,
    ...MATERIAL_MODULES
  ],
})
export class SharedModule { }
