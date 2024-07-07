import { Component } from '@angular/core';
import { Repository } from '../services/repository';
import { FormControl } from '@angular/forms';
import { Observable, catchError, concat, map, merge, of, shareReplay, switchMap, timer } from 'rxjs';
import { RepositoriesService } from '../services/repositories.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  searchText = new FormControl('');

  searchStatus: Observable<ResultsStatus>;
  repositories: Observable<Repository[]>;

  constructor(
    private repositoriesService: RepositoriesService
  ) {
    this.searchStatus= this.getSearchStatus().pipe(shareReplay(1));
    this.repositories = this.searchStatus.pipe(map((status)=> status.results))
  }

  private getSearchStatus(): Observable<ResultsStatus> {
    return merge(
      of(this.searchText.value),
      this.searchText.valueChanges
    ).pipe(switchMap((value)=>{
      return concat(
        of({
          isLoading: true,
          results:[]
        }),
        timer(100).pipe(map(()=>{
          return {
            isLoading: true,
            results:[]
          }
        })),
        this.getResults(value || "").pipe(map((results)=>{
          return {
            isLoading: false,
            results
          }
        }))
      )
    }))
  }

  private getResults(value: string): Observable<Repository[]> {
    const request = value != null && value.length > 1 ? 
    this.repositoriesService.getRepositoryByName(value).pipe(map((response)=> [response]))
    : this.repositoriesService.getRepositories()
    return request.pipe(catchError(error => of([])))
  }
}

interface ResultsStatus {
  isLoading: boolean;
  results: Repository[];
}