import { Component, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cdevlib-export-options',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './export-options.component.html',
  styleUrl: './export-options.component.css',
})
export class ExportOptionsComponent {
  onCallToData = output<void>();

  showOptions() {
    this.onCallToData.emit();
  }
}
