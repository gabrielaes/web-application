import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RepositoriesService } from './services/repositories.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RepositoryDetailComponent } from './repository-detail/repository-detail.component';
import { RepositoryOverviewComponent } from './repository-overview/repository-overview.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    RepositoryDetailComponent,
    RepositoryOverviewComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    RepositoriesService, 
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
