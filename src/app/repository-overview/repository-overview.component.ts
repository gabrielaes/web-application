import { Component, Input } from '@angular/core';
import { Repository } from '../services/repository';

@Component({
  selector: 'app-repository-overview',
  templateUrl: './repository-overview.component.html',
  styleUrl: './repository-overview.component.css'
})
export class RepositoryOverviewComponent {
  @Input() repository: Repository | undefined;
}
