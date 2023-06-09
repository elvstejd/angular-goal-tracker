import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { GoalItemComponent } from './components/goal-item/goal-item.component';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { GoalFormComponent } from './components/goal-form/goal-form.component';
import { RelativeDatePipe } from './pipes/relative-date.pipe';
import { SentenceCasePipe } from './pipes/sentence-case.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    ProgressBarComponent,
    GoalItemComponent,
    GoalListComponent,
    LoginFormComponent,
    ModalComponent,
    GoalFormComponent,
    RelativeDatePipe,
    SentenceCasePipe,
  ],
  imports: [CommonModule, HomeRoutingModule, FormsModule],
})
export class HomeModule {}
