import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
  host: {
    '[class.variant-asset-topbar]': "variant === 'asset-topbar'",
  },
})
export class BreadcrumbComponent {
  /** Clickable ancestor pages. The current page is supplied separately. */
  @Input() items: BreadcrumbItem[] = [];
  /** Current page is intentionally rendered as non-clickable text. */
  @Input() currentLabel = '';
  /** Parent route for the Back control; does not rely on browser history. */
  @Input() parentLink = '/internal-dashboard';
  /** Per-page spacing override. Default keeps the shared padding for every other usage. */
  @Input() variant: 'default' | 'asset-topbar' = 'default';

  constructor(private readonly router: Router) {}

  goBack(): void {
    this.router.navigateByUrl(this.parentLink);
  }
}
