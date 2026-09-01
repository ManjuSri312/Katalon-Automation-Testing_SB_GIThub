/**
 * Real source (.ts / .html / .scss) for each shared component shown in the
 * design-system library, so the "Related shared components" panel can render
 * an EXAMPLES-style HTML/TS/CSS code viewer (see shared-components.component.html).
 *
 * Kept as plain string literals (rather than reading the files at runtime)
 * because this is a client-only Angular app with no filesystem access in the
 * browser — the snippets below are copied verbatim from their source files.
 */

export interface CodeSnippet {
  tsPath: string;
  htmlPath: string;
  scssPath: string;
  ts: string;
  html: string;
  scss: string;
}

export const CODE_SNIPPETS: Record<string, CodeSnippet> = {
  metric: {
    tsPath: 'shared/dashboard-components/shared-metric-card/shared-metric-card.component.ts',
    htmlPath: 'shared/dashboard-components/shared-metric-card/shared-metric-card.component.html',
    scssPath: 'shared/dashboard-components/shared-metric-card/shared-metric-card.component.scss',
    ts: `import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-metric-card',
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './shared-metric-card.component.html',
  styleUrl: './shared-metric-card.component.scss',
  standalone:true,
})
export class SharedMetricCardComponent {
  @Input() title = '';
  @Input() tooltip = '';
  @Input() subtitle = '';
  @Input() value: string | number | null | undefined = '';
  @Input() unit = '';
  @Input() valueClass = '';
  @Input() valuePadding = '38px 0';
   @Input() showPoweredBy = true;
}
`,
    html: `<div class="cardd">
  <div class="cardd-title">
    {{ title }}
    @if (tooltip) {
      <mat-icon
        class="help-icon"
        [matTooltip]="tooltip"
        matTooltipPosition="below"
        matTooltipClass="custom-tooltip"
      >
        help_outline
      </mat-icon>
    }
  </div>

  @if (subtitle) {
    <div class="card-subtitle">{{ subtitle }}</div>
  }

  <div
    class="big-value"
    [ngClass]="valueClass"
    [style.padding]="valuePadding"
  >
    {{ value ?? 0 }}
    @if (unit) {
      <span class="sub" [ngClass]="valueClass">{{ unit }}</span>
    }
  </div>

   @if (showPoweredBy) {
  <div class="powered-by">
    Powered by --
  </div>
}
</div>
`,
    scss: `.big-value {
  color: var(--Light-mode-Background, #fff);
  font-family: "Open Sans";
  font-size: 64px;
  font-style: normal;
  font-weight: 600;
  line-height: 64px;
  letter-spacing: 0.64px;
}

.big-value.danger {
  color: var(--Primary-Red, #d54300);
}

.sub {
  color: var(--Light-mode-Background, #fff);
  font-family: "Open Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0.24px;
}

.sub.danger {
  color: var(--Primary-Red, #d54300);
}

.card-subtitle {
  color: #999;
}



.powered-by{
color: var(--Gray-Palette-70, #B3B3B3);
text-align: right;
font-family: 'Open Sans';
font-size: 10px;
font-style: italic;
font-weight: 400;
line-height: 0px;
margin-top:-24px;
}

.big-value.Severity-value{
    font-family: "Open Sans";
    font-size: 64px;
    font-style: normal;
    font-weight: 600;
    line-height: 64px;
    letter-spacing: 0.64px;
    color: var(--Accessible-Orange, #D54300) !important;
}

@media only screen and (max-width: 1150px) {
  .big-value,
  .big-value.Severity-value {
    font-size: 48px;
    line-height: 48px;
  }
}

@media only screen and (max-width: 480px) {
  .big-value,
  .big-value.Severity-value {
    font-size: 36px;
    line-height: 36px;
  }
}`,
  },

  asset: {
    tsPath: 'shared/dashboard-components/shared-asset-metric-card/shared-asset-metric-card.component.ts',
    htmlPath: 'shared/dashboard-components/shared-asset-metric-card/shared-asset-metric-card.component.html',
    scssPath: 'shared/dashboard-components/shared-asset-metric-card/shared-asset-metric-card.component.scss',
    ts: `import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-asset-metric-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './shared-asset-metric-card.component.html',
   styleUrls: ['./shared-asset-metric-card.component.scss'],
})
export class SharedAssetMetricCardComponent {
  @Input() title = '';
  @Input() tooltip = '';
  @Input() value: string | number | null | undefined = '';
  @Input() unit = '';
  @Input() valueClass = '';
  @Input() valueColor = '';
  @Input() stackValueExtra = false;
   @Input() showPoweredBy = true;

  get isValueNA(): boolean {
    return this.value === 'N/A';
  }
}
`,
    html: `<div class="cardd">
  <div class="cardd-title">
    {{ title }}
    <mat-icon
      class="help-icon"
      [matTooltip]="tooltip"
      matTooltipPosition="below"
      matTooltipClass="custom-tooltip"
    >
      help_outline
    </mat-icon>
  </div>

  <div class="value" [ngClass]="valueClass"
  [class.stack-extra]="stackValueExtra"
  [style.color]="valueColor">

    @if (!isValueNA) {
      <ng-content select="[metric-prefix]"></ng-content>
    }

    {{ value }}
    @if (!isValueNA) {
      <ng-content select="[metric-postfix]"></ng-content>
    }
    @if (unit) {
      <span class="unit" [ngClass]="valueClass">{{ unit }}</span>
    }
    <ng-content select="[metric-value-extra]"></ng-content>


  </div>

   <div class="metric-subtext">
    <ng-content select="[metric-subtext]"></ng-content>
  </div>

  <div class="footer"   [class.no-footer-margin]="stackValueExtra">
    <ng-content select="[metric-footer]"></ng-content>
  </div>


   @if (showPoweredBy) {
  <div class="powered-by">
    Powered by ---
  </div>
}
</div>
`,
    scss: `.help-icon {
  color: #afafaf;
  font-size: 18px;
}

.value {
  margin-top: 28px;
  color: var(--Light-mode-Background, #fff);
  display: flex;
  align-items: flex-end;
  font-family: "Open Sans";
  font-size: 84px;
  font-style: normal;
  font-weight: 600;
  line-height: 70px;
  letter-spacing: 0.84px;
}

.value.green,
.unit.green {
  color: var(--Green, #00a881);
}

.value.yellow,
.unit.yellow {
  color: #f5b800;
}

.unit {
  margin-left: 4px;
  margin-bottom: 8px;
  color: var(--Light-mode-Background, #fff);
  font-family: "Open Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 10px;
  letter-spacing: 0.24px;
}
.metric-subtext {
  margin-top: 0;
  padding-top: 0;
}

.powered-by{
color: var(--Gray-Palette-70, #B3B3B3);
text-align: right;
font-family: 'Open Sans';
font-size: 10px;
font-style: italic;
font-weight: 400;
line-height: 0px;
margin-top: -4px;
}

.value.stack-extra {
  flex-direction: column;
  align-items: flex-start;
          margin-top: 10px;
}

.value.stack-extra .badge {
  margin-top: 4px;
}

.footer.no-footer-margin {
  margin-top: 0;
}`,
  },

  missing: {
    tsPath: 'shared/dashboard-components/shared-missing-parameter-card/shared-missing-parameter-card.component.ts',
    htmlPath: 'shared/dashboard-components/shared-missing-parameter-card/shared-missing-parameter-card.component.html',
    scssPath: 'shared/dashboard-components/shared-missing-parameter-card/shared-missing-parameter-card.component.scss',
    ts: `import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-shared-missing-parameter-card',
  imports: [MatIconModule, MatTooltipModule],
  templateUrl: './shared-missing-parameter-card.component.html',
  styleUrl: './shared-missing-parameter-card.component.scss',
  standalone:true,
})
export class SharedMissingParameterCardComponent {
  @Input() title = '';
  @Input() assetCount = 0;
  @Input() inputCount = 0;
  @Input() diagnosticCount = 0;
  @Input() varianceImpact = '';
  @Input() tooltip = '';
  @Input() assetLabel: string = 'assets';
  @Input() selectedTab: 'all' | 'critical' = 'all';
  @Input() showDiagnosticPill: boolean = true;

@Output() selectedTabChange = new EventEmitter<'all' | 'critical'>();

onTabChange(tab: 'all' | 'critical', event?: Event) {
  // Prevent this from bubbling up to any ancestor click handler
  // (e.g. a card-preview wrapper elsewhere in the app) that would
  // otherwise treat the tab click as a click on the whole card.
  event?.stopPropagation();
  this.selectedTab = tab;
  this.selectedTabChange.emit(tab);
}
}
`,
    html: `<div class="cardd">
  <div class="cardd-title">
    {{ title }}
    <mat-icon
      class="help-icon"
      [matTooltip]="tooltip"
      matTooltipPosition="below"
      matTooltipClass="custom-tooltip"
    >
      help_outline
    </mat-icon>
  </div>

  <div class="tabs" style="display: flex">
  <span
    class="tab"
    [class.active]="selectedTab === 'all'"
    (click)="onTabChange('all', $event)"
  >
    All
  </span>

  <span
    class="tab"
    [class.active]="selectedTab === 'critical'"
    (click)="onTabChange('critical', $event)"
  >
    Critical
  </span>
</div>

<div class="asset-container">
  <!-- Left -->
  <div class="asset-section">
    <div class="asset-count">{{ assetCount }}</div>
   <div class="asset-label">{{ assetLabel }}</div>
  </div>

  <!-- Right -->
  <div class="pill-container">
    <div class="metric-pill warning">
      <mat-icon>warning_amber</mat-icon>
      <span>{{ inputCount }} inputs</span>
    </div>

    @if (showDiagnosticPill) {
  <div class="metric-pill neutral">
    <mat-icon>info</mat-icon>
    <span>{{ diagnosticCount }} diagnostics</span>
  </div>
}
  </div>
</div>
  <!-- Footer -->
  <div class="footer">
    <ng-content select="[metric-footer]"></ng-content>
  </div>

   <div class="powered-by">
    Powered by ---
  </div>
</div>
`,
    scss: `.asset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin: 6px 0;
}

.asset-section {
  display: flex;
  flex-direction: column;
  align-items: center;
   text-align: center;
  margin-top: -18px !important;
}


.tabs{
    margin: 3px;
}

.asset-count {
   color: var(--Base-Neutrals-White, #FFF);
text-align: center;
font-family: "Open Sans";
font-size: 40px;
font-style: normal;
font-weight: 600;
line-height: 50px;
letter-spacing: 0.4px;
margin-top: 14px;
}

.asset-label {
 color: var(--Base-Neutrals-White, #FFF);
font-family: "Open Sans";
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 20px;
letter-spacing: 0.16px;
}

.pill-container {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.metric-pill {
  display: flex;
  justify-content: center;
    align-items: center;
  gap: 8px;
  align-self: stretch;

  min-width: 150px;
  height: 36px;
  padding: 0 14px;

  font-size: 14px;
  font-weight: 600;
  border-radius: 20px;

  mat-icon {
    font-size: 18px;
    width: 18px;
    height: 18px;
  }
}

.help-icon {
  font-size: 18px;
  width: 18px;
  height: 18px;
  cursor: pointer;
  vertical-align: middle;
}

.warning {
border-radius: 20px;
border: 1px solid var(--Yellow-Sun-500-sun, #F2B705);
background: rgba(242, 183, 5, 0.10);
}

.neutral {
border-radius: 20px;
border: 1px solid var(--Gray-Palette-70, #B3B3B3);
background: rgba(230, 230, 230, 0.10);
}

.footer {
  margin-top: 2px;
   padding: 0px;
  text-align: left;
}

.powered-by{
color: var(--Gray-Palette-70, #B3B3B3);
text-align: right;
font-family: 'Open Sans';
font-size: 10px;
font-style: italic;
font-weight: 400;
line-height: 0px;
margin-top:10px;
}

.tabs {
    width: 100%;
    display: flex;
    background: #000;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 5px;
    height: 31.285px;
}

.tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-family: "Open Sans";
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s ease, color 0.15s ease;
  background-color: #fff;
}

.tab.active {
  background: grey;
  color: #fff;
}`,
  },

  breadcrumb: {
    tsPath: 'shared/dashboard-components/breadcrumb/breadcrumb.component.ts',
    htmlPath: 'shared/dashboard-components/breadcrumb/breadcrumb.component.html',
    scssPath: 'shared/dashboard-components/breadcrumb/breadcrumb.component.scss',
    ts: `import { Component, Input } from '@angular/core';
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
`,
    html: `<nav class="breadcrumb-bar" aria-label="Breadcrumb">
  <button type="button" class="back-btn" (click)="goBack()" aria-label="Go to parent page">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.21802 7.33336H13.3327V8.6667H5.21802L8.79402 12.2427L7.85135 13.1854L2.66602 8.00003L7.85135 2.8147L8.79402 3.75736L5.21802 7.33336Z" fill="#0CA8FF"/>
    </svg>
    <span>Back</span>
  </button>

  <div class="path">
    @for (item of items; track item.link) {
      <a [routerLink]="item.link">{{ item.label }}</a>
      <span class="separator" aria-hidden="true">/</span>
    }
    <b aria-current="page">{{ currentLabel }}</b>
  </div>
</nav>
`,
    scss: `:host { display: block; width: 100%; }

.breadcrumb-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  min-height: 88px;
  /* One shared spacing rule: every page renders the breadcrumb identically. */
  padding: 55px 25px 30px 55px;
  box-sizing: border-box;
  border-bottom: 1px solid #3a3a3a;
  background: #000;
  color: #ccc;
  font-family: "Open Sans";
}

/* Asset Workspace top bar only: tighter spacing than the shared default above. */
:host(.variant-asset-topbar) .breadcrumb-bar {
  padding: 0px 0px 0px 55px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--Sky-Blue, #33A6FF);
  font: inherit;
  font-size: 16px;
  cursor: pointer;
}

.path { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; font-size: 16px; }
.path a { color: var(--Sky-Blue, #33A6FF); text-decoration: none; }
.path a:hover, .path a:focus-visible { color: #33a6ff; text-decoration: underline; }
.path b { color: var(--Dynamic-Orange-500, #ff8200); font-size: 14px; font-weight: 600; line-height: 18px; }`,
  },

  export: {
    tsPath: 'shared/dashboard-components/export-menu/export-menu.component.ts',
    htmlPath: 'shared/dashboard-components/export-menu/export-menu.component.html',
    scssPath: 'shared/dashboard-components/export-menu/export-menu.component.scss',
    ts: `import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-export-menu',
  templateUrl: './export-menu.component.html',
  styleUrls: ['./export-menu.component.scss']
})
export class ExportMenuComponent {

  @Output() exportSelected = new EventEmitter<string>();

   toggleExportMenu(event: Event) {
    event.stopPropagation();
    this.exportMenuOpen = !this.exportMenuOpen;
  }

  exportMenuOpen = false;
  selectedFormat = 'PNG'; // default selected

  selectExport(type: string): void {

  this.selectedFormat = type;

  this.exportSelected.emit(type);

  this.exportMenuOpen = false;
}
}`,
    html: `  <div class="export-wrapper"  (document:click)="exportMenuOpen = false">
            <!-- Export Button -->
           <div
  class="export-action"
  (click)="toggleExportMenu($event)"
  (click)="$event.stopPropagation()"
  [class.open]="exportMenuOpen"
>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.66683 12.6667H13.3335V8H14.6668V13.3333C14.6668 13.5101 14.5966 13.6797 14.4716 13.8047C14.3465 13.9298 14.177 14 14.0002 14H2.00016C1.82335 14 1.65378 13.9298 1.52876 13.8047C1.40373 13.6797 1.3335 13.5101 1.3335 13.3333V8H2.66683V12.6667ZM8.66683 6V10.6667H7.3335V6H4.00016L8.00016 2L12.0002 6H8.66683Z"
                  fill="white"
                />
              </svg>
              <span>Export</span>
              <span class="chevron">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3.5 5.75L8 10.25L12.5 5.75"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>

            <!-- Export Panel -->
           <div
  class="export-panel"
  [class.open]="exportMenuOpen"
  (click)="$event.stopPropagation()"
>
              <div
                class="export-option"
                [class.selected]="selectedFormat === 'PNG'"
                (click)="selectExport('PNG')"
              >
                <span>PNG</span>
              </div>
              <div
                class="export-option"
                [class.selected]="selectedFormat === 'PDF'"
               (click)="selectExport('PDF')"
              >
                <span>PDF</span>
              </div>
            </div>
          </div>
`,
    scss: `.export-action.open {
  background: transparent;
  color: #ff8200;
}

.export-action.open svg path {
  fill: #ff8200;
  stroke: #ff8200;
}

.export-action.open span {
  background: transparent;
  color: #ff8200;
}

.export-wrapper {
  position: relative;
  display: inline-block;
}

.export-action {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  .chevron {
    display: flex;
    transition: transform 0.2s ease;
  }
}

.export-panel {
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  border-radius: 8px;
  border: 1px solid var(--Gray-Palette-30, #4d4d4d);
  background: var(--Gray-Palette-20, #333);
  border-radius: 6px;
  min-width: 160px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  opacity: 0;
  transform: translateY(-4px);
  pointer-events: none;
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
  z-index: 100;

  &.open {
    opacity: 1;
    transform: translateY(0);
    pointer-events: all;
  }
}

.export-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #d1d3db;
  background: var(--Gray-Palette-20, #333);
  transition: background 0.1s;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: var(--Area-Gray-400, #747474);
  }
}

.export-action {
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  cursor: pointer;

  span {
    color: white;
    transition: color 0.1s ease;
  }

  svg path {
    transition: all 0.1s ease;
  }

  &:hover {
    background: #000;
    border: 1px solid #3a3a3a !important;
  }

  &:active {
    background: transparent;
    border: transparent;

    span {
      color: var(--Primary-Orange, #ff8200);
    }

    svg path {
      fill: var(--Primary-Orange, #ff8200);
      stroke: var(--Primary-Orange, #ff8200);
    }
  }
}`,
  },

  csv: {
    tsPath: 'shared/dashboard-components/export-menu/export-csv/export-csv.component.ts',
    htmlPath: 'shared/dashboard-components/export-menu/export-csv/export-csv.component.html',
    scssPath: 'shared/dashboard-components/export-menu/export-csv/export-csv.component.scss',
    ts: `import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-export-csv',
  templateUrl: './export-csv.component.html',
  styleUrl: './export-csv.component.scss',
})
export class ExportCsvComponent {

  @Input() data: any[] = [];
  @Input() fileName: string = 'export.csv';
@Input() columns: { key: string; label: string }[] = [];
exportCSV() {
  if (!this.data?.length || !this.columns?.length) return;

  const csv = this.convertToCSV(this.data, this.columns);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  saveAs(blob, this.fileName);
}
private convertToCSV(data: any[], columns: any[]): string {
  const headers = columns.map(c => c.label);

  const rows = data.map(row =>
    columns.map(col => {
      const value =
        row[col.key] === undefined ||
        row[col.key] === null
          ? ''
          : String(row[col.key]);

      return \`"\${value.replace(/"/g, '""')}"\`;
    }).join(',')
  );

  return [headers.join(','), ...rows].join('\\n');
}
private downloadFile(csv: string, fileName: string) {
  const blob = new Blob([csv], {
    type: 'text/csv;charset=utf-8;',
  });

  saveAs(blob, fileName);
}
}`,
    html: `  <div class="export-wrapper">
            <!-- Export Button -->
           <div
  class="export-action"  (click)="exportCSV()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M2.66683 12.6667H13.3335V8H14.6668V13.3333C14.6668 13.5101 14.5966 13.6797 14.4716 13.8047C14.3465 13.9298 14.177 14 14.0002 14H2.00016C1.82335 14 1.65378 13.9298 1.52876 13.8047C1.40373 13.6797 1.3335 13.5101 1.3335 13.3333V8H2.66683V12.6667ZM8.66683 6V10.6667H7.3335V6H4.00016L8.00016 2L12.0002 6H8.66683Z"
                  fill="white"
                />
              </svg>
              <span>Export CSV</span>
            </div>
          </div>
`,
    scss: `.export-wrapper {
  position: relative;
  display: inline-block;
}

.export-action {
  display: flex;
  align-items: center;
  gap: 6px;
   white-space: nowrap;
  cursor: pointer;
}

.export-action {
  display: flex;
  padding: 12px;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  cursor: pointer;
   white-space: nowrap;

  span {
    transition: color 0.1s ease;
     white-space: nowrap;
color: var(--Light-mode-Background, #FFF);
font-family: "Open Sans";
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 20px;
  }

  &:hover {
    background: #000;
    border: 1px solid #3a3a3a !important;
  }

  &:active {
    background: transparent;
    border: transparent;

    span {
      color: var(--Primary-Orange, #ff8200);
    }

    svg path {
      fill: var(--Primary-Orange, #ff8200);
      stroke: var(--Primary-Orange, #ff8200);
    }
  }
}`,
  },

  filter: {
    tsPath: 'shared/dashboard-components/filter-panel/filter-panel.component.ts',
    htmlPath: 'shared/dashboard-components/filter-panel/filter-panel.component.html',
    scssPath: 'shared/dashboard-components/filter-panel/filter-panel.component.scss',
    ts: `import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { DEFAULT_FILTER_STATE, FilterState } from '../../../../services/filter-state.service';

/**
 * Which filter sections a host page wants rendered. Every page that uses
 * <app-filter-panel> shows a different subset (see the 4 pages this was
 * extracted from), so nothing here defaults to \`true\` except Time Period,
 * which every page shows.
 */
export interface FilterPanelSections {
  assetClass?: boolean;
  location?: boolean;
  criticality?: boolean;
  rul?: boolean;
  timePeriod?: boolean;
}

/**
 * Shared "Filter" button + CDK overlay panel used across the dashboard pages
 * (Asset Workspace, Diagnostics, Internal Dashboard, ...). The panel owns its
 * own draft selection state and only reports it to the host via \`apply\` /
 * \`reset\`; it never talks to FilterStateService or any API itself — the host
 * decides what to persist and what to refetch, since that varies per page.
 *
 * Usage:
 *   <app-filter-panel
 *     [sections]="{ location: true, timePeriod: true }"
 *     [facilityData]="facilityData"
 *     [equipmentClassDetails]="equipmentClassDetails"
 *     [value]="filterStateService.getSnapshot()"
 *     (apply)="onFilterApply($event)"
 *     (reset)="onFilterReset($event)"
 *   ></app-filter-panel>
 */
@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, OverlayModule, MatIconModule],
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
})
export class FilterPanelComponent implements OnInit {
  /** Which sections to render. Unset sections are neither shown nor counted. */
  @Input() sections: FilterPanelSections = { timePeriod: true };

  /** Building/Location options — [{ FacilityId, FacilityName }]. */
  @Input() facilityData: any[] = [];

  /** Asset Class options — [{ EquipmentClassId, EquipmentClassName }]. */
  @Input() equipmentClassDetails: any[] = [];

  /** Initial selection, e.g. \`filterStateService.getSnapshot()\`. Read once on init. */
  @Input() value: FilterState = { ...DEFAULT_FILTER_STATE };

  /** Emits the full draft state when "Apply Filters" is clicked. */
  @Output() apply = new EventEmitter<FilterState>();

  /** Emits the (now-cleared) state when "Reset" is clicked. */
  @Output() reset = new EventEmitter<FilterState>();

  /** Emits when "Cancel" is clicked, closing the panel without applying. */
  @Output() cancel = new EventEmitter<void>();

  // ── Panel / dropdown open flags ──────────────────────────────────────────
  isFilterOpen = false;

  // ── Active filter count / Reset / Apply / Cancel ─────────────────────────

  /** Counts non-default selections, but only for the sections this host renders. */
  get activeFilterCount(): number {
    let count = 0;
    if (this.sections.location && this.selectedLocations.size > 0) count++;
    if (this.sections.assetClass && this.selectedAssetClasses.size > 0) count++;
    if (this.sections.criticality && this.selectedCriticalityFilter.size > 0) count++;
    if (this.sections.rul && this.selectedRul !== DEFAULT_FILTER_STATE.selectedRul) count++;
    if (this.sections.timePeriod && this.selectedTimePeriod !== DEFAULT_FILTER_STATE.selectedTimePeriod) count++;
    return count;
  }

  get isFilterActive(): boolean {
    return this.activeFilterCount > 0;
  }

  toggleFilter(): void {
    const isOpen = this.isFilterOpen;
    this.closeAllDropdowns();
    this.isFilterOpen = !isOpen;
  }

  applyFilters(): void {
    this.closeAllDropdowns();
    this.isFilterOpen = false;
    this.apply.emit(this.buildState());
  }

  resetFilter(): void {
    /* clears every section back to default, then emits reset */
  }

  cancelFilter(): void {
    this.isFilterOpen = false;
    this.cancel.emit();
  }

  // ...draft selection state (selectedLocations, selectedAssetClasses, selectedRul,
  // selectedTimePeriod, etc.) and per-section toggle/select helpers omitted here —
  // see the full file at the path above.
}
`,
    html: `<!-- ══════════════════════════════════════════════════════
 Filter toggle button
 · filter-active  → at least one filter is applied (blue tint)
 · filter-open    → panel is currently visible
 · cdkOverlayOrigin marks this as the anchor for the overlay
═══════════════════════════════════════════════════════ -->
<button
  class="btn-primary"
  [class.filter-active]="isFilterActive"
  [class.filter-open]="isFilterOpen"
  cdkOverlayOrigin
  #trigger="cdkOverlayOrigin"
  (click)="toggleFilter()"
>
  <!-- Funnel icon -->
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.6667 11.6667V16.6667L8.33334 18.3333V11.6667L3.33334 4.16667V2.5H16.6667V4.16667L11.6667 11.6667ZM5.33668 4.16667L10 11.1617L14.6633 4.16667H5.33668Z"
      fill="white"
    />
  </svg>

  <!-- Show badge count when filters are active, plain label otherwise -->
  @if (activeFilterCount > 0) {
    Filter ({{ activeFilterCount }})
  } @else {
    Filter
  }
</button>

<!-- ══════════════════════════════════════════════════════
 FILTER OVERLAY PANEL
 Opens below the Filter button via CDK Connected Overlay.
 Clicking outside (overlayOutsideClick) closes it.
═══════════════════════════════════════════════════════ -->
<ng-template
  cdkConnectedOverlay
  [cdkConnectedOverlayOrigin]="trigger"
  [cdkConnectedOverlayOpen]="isFilterOpen"
  (overlayOutsideClick)="isFilterOpen = false"
>
  <div class="filter-container" (click)="closeAllDropdowns()">
    <h3 class="filter-title">Filters</h3>
    <hr class="divider" />

    <!-- Asset Classes / Location / Criticality / RUL / Time Period sections,
         each gated by [sections], omitted here for brevity — see the full
         file at the path above. -->

    <hr class="divider" />

    <!-- ──────────────────────────────────────────────────
     FILTER ACTIONS — Reset / Cancel / Apply
    ─────────────────────────────────────────────────── -->
    <div class="filter-actions">
      <button class="btn-reset" (click)="resetFilter()">Reset</button>

      <div class="action-group">
        <button class="btn-cancel" (click)="cancelFilter()">Cancel</button>
        <button class="btn-apply" (click)="applyFilters()">Apply Filters</button>
      </div>
    </div>
  </div>
</ng-template>
`,
    scss: `// Styling for the filter button + overlay panel, made self-contained here
// (rather than relying on the global src/assets/scss/styles.scss) so this
// component doesn't depend on anything outside itself.
:host {
  display: contents;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: 1.5px solid #fff;
  background: transparent;
  color: #fff;
  white-space: nowrap;
  transition: background 0.2s, border-color 0.2s;

  &:hover {
    border-radius: 8px;
    border: 1px solid var(--Base-Neutrals-White, #fff);
    background: #1d1d1d;
    color: #fff;
  }

  // Active/selected state — orange when filter panel is open
  &.filter-open,
  &.filter-active {
    border-radius: 8px;
    border: 1px solid var(--Primary-Orange, #ff8200) !important;
    background: var(--Orange-700, #994e00) !important;
    color: #fff;
  }
}

.filter-container {
  padding: 12px;
  width: 320px;
  max-width: calc(100vw - 32px);
  box-sizing: border-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  margin-top: 8px;
  color: white;
  border-radius: 12px;
  border: 1px solid var(--Gray-Palette-20, #333);
  background: #000;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
}

/* Section labels, custom-select dropdowns, location-options lists, date
   range inputs, and season sub-dropdown styling omitted here for brevity —
   see the full file at the path above. */

.filter-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;

  .btn-reset { background: none; border: none; color: #ff8a00; font-weight: bold; cursor: pointer; }
  .action-group { display: flex; gap: 8px; }
  .btn-cancel { background: black; border: 1px solid #fff; color: white; padding: 6px 16px; border-radius: 6px; }
  .btn-apply {
    color: #fff;
    font-family: "Open Sans";
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 4px;
    border: 1px solid var(--Blue-Palette-400, #376af7);
    background: var(--Blue-Palette-500-Electric-Blue, #0545f5);
    display: inline-flex;
    padding: 4px 8px;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
  }
}`,
  },

  calculation: {
    tsPath: 'shared/dashboard-components/calculation-methodology-popup/calculation-methodology-popup.component.ts',
    htmlPath: 'shared/dashboard-components/calculation-methodology-popup/calculation-methodology-popup.component.html',
    scssPath: 'shared/dashboard-components/calculation-methodology-popup/calculation-methodology-popup.component.scss',
    ts: `import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../../material.module';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-calculation-methodology-popup',
  standalone: true,
  imports: [AppMaterialModule, CommonModule,
    FormsModule,],
  templateUrl: './calculation-methodology-popup.component.html',
  styleUrl: './calculation-methodology-popup.component.scss',
})
export class CalculationMethodologyPopupComponent {


  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any
) {}

  selectedDiagnostic = 'Simultaneous Heating/Cooling';
  healthColumns: string[] = ['name', 'value', 'weight'];

  healthData = [
    { name: 'E: Fan Efficiency Score', value: '74.60', weight: '0.35' },
    { name: 'Filter Condition Score', value: '100.00', weight: '0.25' },
    { name: 'Coil deltaP Score', value: '100.00', weight: '0.15' },
    { name: 'Controls & Stability Score', value: '92.00', weight: '0.15' },
    { name: 'Age Score', value: '30.77', weight: '0.10' },
    { name: 'Health Score (0-100)', value: '82.99', weight: '' }
  ];
  varColumns: string[] = ['var', 'val', 'unit'];

  variableData = [
    { var: 'Avg ΔkW', val: '18.4', unit: 'kW' },
    { var: 'Operating Hours', val: '4,032', unit: 'hours/yr' },
    { var: 'Tariff', val: '$0.154', unit: '$/kWh' },
    { var: 'Total Annual Savings', val: '$620k', unit: '$/yr' }
  ];

selectedTab: 'mv' | 'calc' = 'mv';


}
`,
    html: `<div class="task-dialog">
  <!-- Header -->
  <div mat-dialog-title class="dialog-header">
  <h2 class="title">Calculations & Methodology</h2>
    <button mat-icon-button mat-dialog-close class="close" style="color: white">
      ×
    </button>
  </div>

   <mat-dialog-content class="dialog-body">

     <div class="task-details-header">
      <h3 style="margin: 0px;">{{ data?.EquipmentName }}</h3>
    </div>

    <!-- TABS -->
  <div class="tabs">
    <div
      class="tab"
      [class.active]="selectedTab === 'mv'"
      (click)="selectedTab = 'mv'">
      M&V Methodology & Data Sources
    </div>

    <div
      class="tab"
      [class.active]="selectedTab === 'calc'"
      (click)="selectedTab = 'calc'">
      Calculations
    </div>
  </div>

  <mat-card class="m-v" *ngIf="selectedTab === 'mv'">

    <!-- SELECT -->
    <label class="dropdown-label">Select Diagnostic</label>

<div class="dropdown-container">
  <mat-form-field appearance="outline" class="compact-select">
    <mat-select
      [(value)]="selectedDiagnostic"
      placeholder="Select Diagnostic"
    >
      <mat-option value="Simultaneous Heating/Cooling">
       Simultaneous Heating/Cooling
      </mat-option>
    </mat-select>

    <mat-icon matSuffix>keyboard_arrow_down</mat-icon>
  </mat-form-field>
</div>

    <!-- METHOD BOX -->
    <mat-card class="method-box">
      <h3>Method & Assumptions</h3>

      <div class="grid">
        <div>
          <label>Asset</label>
          <p class="link-text">AHU-09</p>
          <span>LGP - HQ Tower</span>
        </div>

        <div>
          <label>Diagnostic</label>
          <p class="link-text">Simultaneous Heating/Cooling</p>
        </div>

        <div>
          <label>Annual Savings</label>
          <p style=" color: var(--Primary-Green, #00A881);">$48.0k</p>
          <span>312k kWh</span>
        </div>

        <div>
          <label>Payback Period</label>
          <p>1.2 years</p>
        </div>

        <div>
          <label>ROI</label>
          <p>85%</p>
        </div>

        <div style="display:flex;flex-direction: column; align-items: flex-start; gap: 4px;">
          <label>M&V Status</label>
          <span class="badge">Under Review</span>
        </div>
      </div>
    </mat-card>

    <!-- WARNING -->
    <mat-card class="warning">
      <div class="warn-title">
        <mat-icon>warning</mat-icon>
        Missing Parameters
      </div>

      <p>Estimated savings range is wider due to missing fan size</p>
      <span class="impactt">Variance Impact: ±$8.2k</span>
    </mat-card>

    <!-- DATA QUALITY -->
    <mat-card class="data-quality">
      <h3 class="data-quality-header">Data Quality</h3>

      <div class="dq-grid">
        <div>
          <label>Source Systems</label>
          <p>BMS (primary), CMMS (work orders)</p>
        </div>

        <div>
          <label>Data Coverage</label>
          <p>98.4%</p>
        </div>

        <div>
          <label>RULE & Risk Commentary</label>
          <p>Addressing this measure extends asset lifespan and reduces operational risk.</p>
        </div>

        <div>
          <label>Normalization</label>
          <p>Weather-adjusted</p>
        </div>
      </div>
    </mat-card>

  </mat-card>

  <!-- ================= CALCULATION TAB ================= -->
  <mat-card class="cal" *ngIf="selectedTab === 'calc'">

    <div class="tab-content">

         <!-- SELECT -->
      <label class="dropdown-label">Select Diagnostic</label>

<div class="dropdown-container">
  <mat-form-field appearance="outline" class="compact-select">
    <mat-select
      [(value)]="selectedDiagnostic"
      placeholder="Select Diagnostic"
    >
      <mat-option value="Simultaneous Heating/Cooling">
        Simultaneous Heating/Cooling
      </mat-option>
    </mat-select>

    <mat-icon matSuffix>keyboard_arrow_down</mat-icon>
  </mat-form-field>
</div>

        <mat-card class="method-box" style="margin-top: 12px;">

      <div class="grid">
        <div>
          <label>Asset</label>
          <p class="link-text">AHU-09</p>

        </div>

        <div>
          <label>Facility</label>
          <p>LGP - HQ Tower</p>
        </div>

        <div>
          <label>Diagnostic</label>
          <p class="link-text">Simultaneous Heating/Cooling</p>
        </div>

      <!-- STATUS -->
      <div class="status" style="display: flex;
    flex-direction: column;
    align-items: flex-start;">
        <label>M&V Status</label>
        <span class="badge yellow">Under Review</span>
      </div>
      </div>
      </mat-card>

          <mat-card class="warning">
      <div class="warn-title">
        <mat-icon>warning</mat-icon>
        Missing Parameters
      </div>

      <p>Estimated savings range is wider due to missing fan size</p>
      <span class="impactt">Variance Impact: ±$8.2k</span>
    </mat-card>

      <!-- SUMMARY -->
      <h3 class="section-title">Calculation Summary & Details</h3>

<mat-card class="section-card summary-card" style="background-color: #000 !important;">

  <div class="row">
    <span class="label">Annual Energy Savings</span>
    <span class="value">312k kWh</span>
  </div>

  <div class="row">
    <span class="label">Energy Rate</span>
    <span class="value">$0.15/kWh</span>
  </div>

  <div class="divider"></div>

  <div class="row highlight">
    <span class="label">Annual Dollar Savings</span>
    <span class="value">$48.0k</span>
  </div>

  <div class="row">
    <span class="label">Payback Period</span>
    <span class="value">1.2 years</span>
  </div>

  <div class="row">
    <span class="label">ROI</span>
    <span class="value">85%</span>
  </div>

</mat-card>

        <!-- HEALTH TABLE -->
        <mat-card class="section-card">
          <h3>Health Score: Impacting Parameters & Weights</h3>

          <table mat-table [dataSource]="healthData" class="mat-elevation-z0">

            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef style="color: var(--Area-Gray-300, #AFAFAF) !important;"> Scoring (Live) </th>
              <td mat-cell *matCellDef="let element"> {{element.name}} </td>
            </ng-container>

            <ng-container matColumnDef="value">
              <th mat-header-cell *matHeaderCellDef style="color: var(--Area-Gray-300, #AFAFAF) !important;"> Value </th>
              <td mat-cell *matCellDef="let element"> {{element.value}} </td>
            </ng-container>

            <ng-container matColumnDef="weight">
              <th mat-header-cell *matHeaderCellDef style="color: var(--Area-Gray-300, #AFAFAF) !important;"> Weight </th>
              <td mat-cell *matCellDef="let element"> {{element.weight}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="healthColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: healthColumns;"></tr>

          </table>
        </mat-card>

        <!-- FORMULA -->
        <mat-card class="section-card">
          <h3>Formula</h3>
          <div class="sectioncard">
          <p class="formula">
            Total Savings = Σ (ΔkW × Operating Hours × Tariff)
          </p>
          <p class="sub">
            Where ΔkW = Baseline kW - Reporting kW (weather normalized)
          </p>
          </div>
        </mat-card>

        <!-- VARIABLES TABLE -->
        <mat-card class="section-card">

          <h3>Variable Values</h3>

          <table mat-table [dataSource]="variableData" style="border: 1px solid #3a3a3a !important;">

            <ng-container matColumnDef="var">
              <th mat-header-cell *matHeaderCellDef style="color: var(--Area-Gray-300, #AFAFAF) !important;"> Variable </th>
              <td mat-cell *matCellDef="let e"> {{e.var}} </td>
            </ng-container>

            <ng-container matColumnDef="val">
              <th mat-header-cell *matHeaderCellDef style="color: var(--Area-Gray-300, #AFAFAF) !important;"> Value </th>
              <td mat-cell *matCellDef="let e"> {{e.val}} </td>
            </ng-container>

            <ng-container matColumnDef="unit">
              <th mat-header-cell *matHeaderCellDef style="color: var(--Area-Gray-300, #AFAFAF) !important;"> Unit </th>
              <td mat-cell *matCellDef="let e"> {{e.unit}} </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="varColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: varColumns;"></tr>

          </table>

        </mat-card>

    </div>

  </mat-card>

  </mat-dialog-content>
<mat-dialog-actions align="end" class="dialog-footer" style="padding: 24px;">

  @if (selectedTab === 'mv') {

    <div class="button-group">
    <button mat-raised-button class="btn primary">
      <mat-icon>visibility</mat-icon>
      View Asset Details
    </button>

    <button mat-stroked-button class="btn secondary">
      <mat-icon>download</mat-icon>
      Download PDF
    </button>

     <button mat-stroked-button class="btn secondary">
      <mat-icon>download</mat-icon>
     Download PNG
    </button>
    </div>

  }

  @if (selectedTab === 'calc') {

   <div class="button-group">
  <button mat-raised-button class="btn primary">
    <mat-icon>visibility</mat-icon>
    View Asset Details
  </button>

  <button mat-stroked-button class="btn secondary">
    <mat-icon>download</mat-icon>
    Download PDF
  </button>

  <button mat-stroked-button class="btn secondary">
    <mat-icon>download</mat-icon>
    Download PNG
  </button>
</div>


  }

</mat-dialog-actions>


</div>
`,
    scss: `/* Trimmed to the layout-defining rules — see the full file for every
   dark-theme override (tables, mat-select panels, badges, etc.). */

.task-dialog {
  background: #1d1d1d;
  color: #ffffff;
  border-radius: 8px;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  border-bottom: 1px solid #3a3a3a;
  display: flex;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
}

.dialog-body {
  display: flex;
  padding: 24px !important;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid #3a3a3a;
  overflow-x: hidden;
}

mat-card.m-v, mat-card.cal {
  padding: 0px 10px 0px 0px;
  background-color: #1d1d1d !important;
  overflow-y: auto;
  height: 300px;
  overflow-x: hidden;
}

.warning {
  border: 1px solid var(--Yellow, #f2b705) !important;
  padding: 12px;
  border-radius: 6px;
  margin-top: 16px;
  background: #0a0a0a !important;
}

.section-card {
  background: #0f0f10;
  color: #e6e6e6;
  border: 1px solid #3a3a3a;
  border-radius: 6px;
  padding: 0px;
}

.summary-card { background: #000 !important; border: 1px solid #3a3a3a !important; border-radius: 6px; padding: 12px 0; width: 100%; }
.highlight .label, .highlight .value { color: var(--Primary-Green, #00a881); font-weight: 600; }
.btn.primary { border-radius: 8px; border: 1px solid #688ff9 !important; background: #0545f5 !important; }
.btn.secondary { border-radius: 8px; border: 1px solid #fff !important; background: transparent !important; }`,
  },

  'create-task': {
    tsPath: 'shared/dashboard-components/create-task-dialog/create-task.component.ts',
    htmlPath: 'shared/dashboard-components/create-task-dialog/create-task.component.html',
    scssPath: 'shared/dashboard-components/create-task-dialog/create-task.component.scss',
    ts: `import { Component, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { InternalDashboardService } from '../../../../services/internal-dashboard.service';
import { DiagnosticsService } from '../../../../services/diagnostics.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { AppMaterialModule } from '../../../../material.module';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.scss',
  imports: [
    FormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    AppMaterialModule,
  ],
})
export class CreateTaskDialogComponent {
  // Read-only context fields — resolved from whichever caller's data shape is
  // passed in (diagnostics-new's child diagnostic record, internal-dashboard-new's
  // two table row shapes, etc.), since each names the same concept differently.
  building: string = '';
  equipmentType: string = '';
  asset: string = '';
  relatedDiagnostic: string = '';
  achievableSavings: number | null = null;
  hasMissingParameters: boolean = false;

  description: string = '';
  expResDate: string = '';

  assignedTo: string = '0';
  status: string = 'InProgress';
  workOrderCategory: string = 'predictive';
  workOrderType: string = 'proactive';
  generateWorkOrder: boolean = false;

  userEmails: any;

  /** Set once the user attempts to save, so required-field errors only show after a first attempt */
  attemptedSave: boolean = false;

  @ViewChild('descInput') descInput!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private internalDashboardService: InternalDashboardService,
    private diagnosticsService: DiagnosticsService,
    private snackBar: MatSnackBar,
  ) {
    this.getUsers();

    const dataM: any = this.data?.data || {};

    // Prefill read-only context — different callers use different field names
    // for the same concept, so fall back across every known shape.
    this.building = dataM.BuildingName || dataM.location || '';
    this.equipmentType = dataM.EquipmentClassName || dataM.category || '';
    this.asset = dataM.EquipmentName || dataM.assetName || '';
    this.relatedDiagnostic = dataM.NotesSummary || dataM.summary || '';
    this.achievableSavings = this.resolveSavings(dataM);
    this.hasMissingParameters = !!dataM.HasMissingParameters;
    this.assignedTo = dataM.Assignee || '0';
  }

  /** Resolves the achievable-savings figure across known caller shapes (Cost vs acs), as a plain number */
  private resolveSavings(dataM: any): number | null {
    const raw = dataM.Cost ?? dataM.acs;
    if (raw === undefined || raw === null || raw === '') return null;
    const num = Number(raw);
    return isNaN(num) ? null : num;
  }

  /** "$8.2k"-style display, matching the abbreviation convention used elsewhere in the app */
  get achievableSavingsDisplay(): string {
    if (this.achievableSavings === null) return '';
    return \`$\${(this.achievableSavings / 1000).toFixed(1)}k\`;
  }

  get isAssignedToInvalid(): boolean {
    return this.attemptedSave && !this.assignedTo;
  }

  get isStatusInvalid(): boolean {
    return this.attemptedSave && !this.status;
  }

  get isDueDateInvalid(): boolean {
    return this.attemptedSave && !this.expResDate;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.descInput?.nativeElement?.focus();
    }, 200);
  }

  close() {
    this.dialog.closeAll();
  }

  getUsers() {
    this.internalDashboardService.getUsers().subscribe((res: any) => {
      this.userEmails = res.data;
    });
  }

  getYesterdayDate(): string {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');

    return \`\${yyyy}-\${mm}-\${dd}\`;
  }

  /** Validates required fields (Assigned To, Status, Due Date), then submits if valid */
  save(): void {
    this.attemptedSave = true;
    if (!this.assignedTo || !this.status || !this.expResDate) {
      return;
    }
    this.createNewTask();
  }

  createNewTask() {
    const dataM = this.data?.data || {};
    let params: any = {
      data: [
        {
          SourceSystemEID: dataM.SourceSystemEID || '',
          Interval: 'Daily',
          Status: this.status,
          AnalysisStartDate: this.getYesterdayDate(),
          Summary: this.description,
          ...(this.expResDate && { expResDate: this.expResDate }),
          Assignee: this.assignedTo === '0' ? 'No Assignee' : this.assignedTo,
        },
      ],
    };
    this.diagnosticsService.createNewTask(params).subscribe({
      next: (result: any) => {
        if (result.exception === null) {
          this.snackBar.open('Saved Successfully!', 'Dismiss', {
            duration: 3000,
          });
          this.close();
        }
      },
      error: (error: any) => {
        this.snackBar.open('Could not create task!', 'Dismiss', {
          duration: 3000,
        });
      },
    });
  }

  assigneeSearch = '';

  get filteredUserEmails() {
    if (!this.assigneeSearch) {
      return this.userEmails;
    }

    return this.userEmails.filter((x: any) =>
      x.Email.toLowerCase().includes(this.assigneeSearch.toLowerCase()),
    );
  }

  onAssigneeClosed() {
    this.assigneeSearch = '';
  }
}
`,
    html: `<div class="dialog-wrapper">
  <!-- HEADER -->
  <div class="dialog-header">
    <h2>Create Task</h2>
    <mat-icon class="close-icon" mat-dialog-close>close</mat-icon>
  </div>

  <!-- BODY (scrollable) -->
  <div class="dialog-body">
    <label>Building</label>
    <input [value]="building" placeholder="Enter building name" readonly />

    <label>Asset Class</label>
    <input
      [value]="equipmentType"
      placeholder="e.g., Air Handling Unit, Chiller"
      readonly
    />

    <label>Asset</label>
    <input [value]="asset" placeholder="e.g., AHU-03" readonly />

    <label>Related Diagnostic</label>
    <input
      [value]="relatedDiagnostic"
      placeholder="e.g., Simultaneous Heating/Cooling"
      readonly
    />

    <label>Achievable Annual Savings</label>
    <div class="readonly-with-icons">
      <input
        [value]="achievableSavingsDisplay"
        placeholder="e.g.,$8.2k"
        readonly
      />
      @if (hasMissingParameters) {
        <mat-icon
          class="warning-icon"
          matTooltip="# inputs required to increase accuracy"
          matTooltipPosition="above"
          matTooltipClass="yellow-tooltip"
          >warning_amber</mat-icon
        >
      }
    </div>

    <label class="dropdown-label"
      ><span class="required-mark">*</span>Assigned to</label
    >
    <div class="dropdown-container">
      <mat-form-field appearance="outline" class="compact-select">
        <mat-select
          [(value)]="assignedTo"
          panelClass="assignee-panel"
          placeholder="Select one..."
          (closed)="onAssigneeClosed()"
        >
          <!-- SEARCH BOX -->
          <mat-option class="search-option" disableRipple>
            <div class="search-box" (click)="$event.stopPropagation()">
              <input
                matInput
                type="text"
                placeholder="Search Assignee..."
                [(ngModel)]="assigneeSearch"
                (click)="$event.stopPropagation()"
                (keydown)="$event.stopPropagation()"
                (input)="$event.stopPropagation()"
              />

              <mat-icon class="search-icon">search</mat-icon>
            </div>
          </mat-option>
          <mat-option value="0">No Assignee</mat-option>

          @for (value of filteredUserEmails; track value) {
            <mat-option [value]="value.Email">
              {{ value.Email }}
            </mat-option>
          }
        </mat-select>

        <mat-icon matSuffix>keyboard_arrow_down</mat-icon>
      </mat-form-field>
      @if (isAssignedToInvalid) {
        <span class="field-error">Assigned to is required.</span>
      }
    </div>

    <label class="dropdown-label"
      ><span class="required-mark">*</span>Status</label
    >

    <div class="dropdown-container">
      <mat-form-field appearance="outline" class="compact-select">
        <mat-select
          [(value)]="status"
          panelClass="assignee-panel"
          placeholder="Select Status"
        >
          <mat-option value="Open">Open</mat-option>
          <mat-option value="InProgress">In Progress</mat-option>
          <mat-option value="Completed">Completed</mat-option>
          <mat-option value="On Hold">On Hold</mat-option>
        </mat-select>

        <mat-icon matSuffix>keyboard_arrow_down</mat-icon>
      </mat-form-field>
      @if (isStatusInvalid) {
        <span class="field-error">Status is required.</span>
      }
    </div>

    <!-- Work Order Category -->
    <label class="dropdown-label">Work Order Category</label>
    <div class="dropdown-container">
      <select [(ngModel)]="workOrderCategory" class="dropdown-select">
        <option value="predictive">Predictive</option>
        <option value="repair">Repair</option>
        <option value="inspection">Inspection</option>
      </select>
      <mat-icon class="dropdown-arrow">keyboard_arrow_down</mat-icon>
    </div>

    <!-- Work Order Type -->
    <label class="dropdown-label">Work Order Type</label>
    <div class="dropdown-container">
      <select [(ngModel)]="workOrderType" class="dropdown-select">
        <option value="proactive">Proactive</option>
        <option value="corrective">Corrective</option>
        <option value="emergency">Emergency</option>
      </select>
      <mat-icon class="dropdown-arrow">keyboard_arrow_down</mat-icon>
    </div>
    <label>Description</label>
    <textarea style="background-color: black !important;"
      [(ngModel)]="description"
      placeholder="Enter task description..."
    ></textarea>

    <label class="dropdown-label"
      ><span class="required-mark">*</span>Due Date</label
    >

    <div class="date-input">
      <mat-icon (click)="dueDateInput.showPicker()">calendar_today</mat-icon>

      <input
        #dueDateInput
        type="date"
        [(ngModel)]="expResDate"
        placeholder="dd-mm-yyyy"
      />
    </div>

    @if (isDueDateInvalid) {
      <span class="field-error">Due date is required.</span>
    }

    <div class="toggle-row">
      <label class="switch">
        <input type="checkbox" [(ngModel)]="generateWorkOrder" />
        <span class="slider"></span>
      </label>

      <span class="toggle-label">Generate Work Order</span>
    </div>
  </div>

  <!-- FOOTER -->
  <div class="dialog-footer">
    <button class="btn-cancel" mat-dialog-close>Cancel</button>
    <button class="btn-create" (click)="save()">Save Task</button>
  </div>
</div>
`,
    scss: `/* Trimmed to the layout-defining rules — see the full file for every
   dark-theme input/select/toggle override. */

.dialog-wrapper {
  background: #1d1d1d;
  color: #fff;
  padding: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 85vh;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #3a3a3a;
  padding: 24px 0px;
}

.dialog-body {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px 24px;
  border-bottom: 1px solid #3a3a3a;
}

.dialog-body input,
.dialog-body select,
.dialog-body textarea {
  background: #000;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
  font-size: 13px;
  border: 1px solid var(--Area-Gray-400, #747474);
  background: var(--Area-Gray-500, #3a3a3a);
}

.field-error {
  color: #f44336;
  font-size: 12px;
  font-weight: 600;
  margin-top: 4px;
  display: block;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 12px;
}

.btn-cancel {
  background: transparent;
  border: 1px solid #555;
  color: #fff;
  padding: 6px 16px;
  border-radius: 6px;
}

.btn-create {
  background: #0545f5;
  border: none;
  color: #fff;
  padding: 6px 16px;
  border-radius: 6px;
}`,
  },

  'task-detail': {
    tsPath: 'shared/dashboard-components/task-details-modal/task-details-modal.component.ts',
    htmlPath: 'shared/dashboard-components/task-details-modal/task-details-modal.component.html',
    scssPath: 'shared/dashboard-components/task-details-modal/task-details-modal.component.scss',
    ts: `import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AppMaterialModule } from '../../../../material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InternalDashboardService } from '../../../../services/internal-dashboard.service';
import { CreateTaskDialogComponent } from '../create-task-dialog/create-task.component';

@Component({
  selector: 'app-task-details-dialog',
  imports: [AppMaterialModule, FormsModule, CommonModule],
  templateUrl: './task-details-modal.component.html',
  styleUrl: './task-details-modal.component.scss',
  standalone: true
})
export class TaskDetailsModalComponent implements OnInit {

  isEditMode = false;
  originalData: any = {};
  editableData: any = {};
  userEmails: any[] = [];
  assigneeSearch: string = '';
  cost: any;
  hasMissingParameters: boolean = false;
  title: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TaskDetailsModalComponent>,
    private internalDashboardService: InternalDashboardService,
    private dialog: MatDialog
  ) {
     this.getUsers();
  }

  ngOnInit() {
    let data = this.data.item
    this.title = this.data.title === 'task' ? true : false ;

    const annualAvoidableCost = Number(data.AnnualAvoidableCost);
    this.cost = Number.isFinite(annualAvoidableCost)
      ? \`$\${(annualAvoidableCost / 1000).toFixed(1)}k\`
      : 'N/A';
    this.hasMissingParameters = !!data.HasMissingParameters;
    this.originalData = { ...data };
    this.editableData = { ...data };
  }


  getUsers() {
    this.internalDashboardService.getUsers().subscribe((res: any) => {
      this.userEmails = res.data;
    });
  }

  enableEdit() {
    this.openCreateTask(this.originalData)
  }


    openCreateTask(item: any) {
      let prefilled = true;
      this.dialog.open(CreateTaskDialogComponent, {
        width: '600px',
        panelClass: 'create-task-dialog',
        data: { data: item , prefilled: prefilled},
        backdropClass: 'hello',
        autoFocus: true,
      });
    }

  cancelEdit() {
    this.editableData = { ...this.originalData }; // revert all changes
    this.isEditMode = false;
    this.assigneeSearch = '';
  }

  saveEdit() {
    const params: any = { data: [this.editableData] };

    this.internalDashboardService.updateTaskRows(params).subscribe({
      next: (res: any) => {
        if (res.exception === null) {
          this.originalData = { ...this.editableData };
          this.isEditMode = false;
          this.dialogRef.close(this.editableData);
        }
      },
      error: (err: any) => {
        console.error('Failed to update task', err);
      },
    });
  }

  get filteredUserEmails(): any[] {
    if (!this.assigneeSearch.trim()) return this.userEmails;
    return this.userEmails.filter((user: any) =>
      user.Email?.toLowerCase().includes(this.assigneeSearch.toLowerCase())
    );
  }

  onAssigneeClosed() {
    this.assigneeSearch = '';
  }
}
`,
    html: `<div class="task-dialog">
  <!-- Header -->
  <div mat-dialog-title class="dialog-header">
    @if (title) {
      <h2>{{ editableData?.ClientTaskID }}</h2>
    } @else {
      <h2>{{ editableData?.WO }}</h2>
    }
    <button mat-icon-button mat-dialog-close class="close" style="color: white">
      ×
    </button>
  </div>

  <!-- Body -->
  <mat-dialog-content class="dialog-body">
    <div
      class="task-details-header"
      style="display: flex; justify-content: space-between; align-items: center; width: 100%;"
    >
      @if (title) {
      <h3>Task Details</h3>
      } @else {
        <h3>Work Order Details</h3>
      }

      <span
        style="right: 0; margin-right: 10px; color:white"
        [ngClass]="{
          'status-unassigned': editableData?.TaskStatus === 'Unassigned' ||  editableData?.TaskStatus === 'APPR' ||  editableData?.TaskStatus === 'Open',
          'status-progress':
            editableData?.TaskStatus === 'UnderReview' ||
            editableData?.TaskStatus === 'InProgress' ||
            editableData?.TaskStatus === 'OnHold',
          'status-completed': editableData?.TaskStatus === 'Completed',
        }"
      >
        {{ editableData?.TaskStatus }}
      </span>
    </div>

    <!-- Related Diagnostic -->
    <div class="detail">
      <label>RELATED DIAGNOSTIC</label>
      <p>{{ editableData?.NotesSummary }}</p>
    </div>

    <!-- Asset -->
    <div style="display: flex; gap: 20px">
      <div class="detail">
        <label>ASSET</label>
        <p>{{ editableData?.EquipmentName }}</p>
      </div>
      <div class="detail">
        <label>ASSET CLASS</label>
        <p>{{ editableData?.EquipmentClassName }}</p>
      </div>
    </div>

    <div class="detail">
      <label>ACHIEVABLE ANNUAL SAVINGS</label>
      <p>
        {{ cost }}
        @if (hasMissingParameters  && cost !== 'N/A') {
          <mat-icon
            class="warning-icon"
            matTooltip="# inputs required to increase accuracy"
            matTooltipPosition="above"
             matTooltipClass="yellow-tooltip"
            >warning_amber</mat-icon
          >
        }
      </p>
    </div>

    <!-- Assigned To -->
    @if (isEditMode || editableData?.Assignee) {
    <div class="detail">
      <label>ASSIGNED TO</label>
      @if (!isEditMode) {
        <p>{{ editableData?.Assignee?.split("@")[0] }}</p>
      } @else {
        <div class="dropdown-container" style="display: flex; align-items: center; gap: 8px">
          <mat-form-field appearance="outline" class="compact-select">
            <mat-select
              [(ngModel)]="editableData.Assignee"
              panelClass="assignee-panel"
              placeholder="Select Assignee"
              (closed)="onAssigneeClosed()"
            >
              <mat-option class="search-option" disableRipple>
                <div class="search-box" (click)="$event.stopPropagation()">
                  <input
                    matInput
                    type="text"
                    placeholder="Search Assignee..."
                    [(ngModel)]="assigneeSearch"
                    (click)="$event.stopPropagation()"
                    (keydown)="$event.stopPropagation()"
                    (input)="$event.stopPropagation()"
                  />
                  <mat-icon class="search-icon">search</mat-icon>
                </div>
              </mat-option>

              <mat-option value="0">No Assignee</mat-option>

              @for (value of filteredUserEmails; track value) {
                <mat-option [value]="value.Email">
                  {{ value.Email?.split("@")[0] }}
                </mat-option>
              }
            </mat-select>
            <mat-icon matSuffix>keyboard_arrow_down</mat-icon>
          </mat-form-field>
        </div>
      }
    </div>
    }

    <!-- Dates -->
    <div class="date-row">
      <div>
        <label>CREATED DATE</label>
        @if (!isEditMode) {
          <p class="date-text">{{ editableData?.TaskCreatedDate | date: "MM-dd-yy" }}</p>
        } @else {
          <input
            class="edit-date"
            type="date"
            [value]="editableData?.TaskCreatedDate | date: 'yyyy-MM-dd'"
            (change)="editableData.TaskCreatedDate = $any($event.target).value"
          />
        }
      </div>

      <div>
        <label>DUE DATE</label>
        @if (!isEditMode) {
          <p class="date-text">{{ editableData?.ExpectedResolutionDate | date: "MM-dd-yy" }}</p>
        } @else {
          <input
            class="edit-date"
            type="date"
            [value]="editableData?.ExpectedResolutionDate | date: 'yyyy-MM-dd'"
            (change)="editableData.ExpectedResolutionDate = $any($event.target).value"
          />
        }
      </div>
    </div>

    <div class="detail">
      <label>Description</label>
      @if (!isEditMode) {
        <p>{{ editableData?.NotesSummary }}</p>
      } @else {
        <input class="edit-input" type="text" [(ngModel)]="editableData.NotesSummary" />
      }
    </div>
  </mat-dialog-content>

  <!-- Footer -->
  <mat-dialog-actions class="dialog-footer">
    @if (!isEditMode) {
      <button mat-button mat-dialog-close class="btn-close">Close</button>
     @if(title){
      <button mat-raised-button color="primary" class="btn-edit" (click)="enableEdit()">
        <span class="btn-edit-label">Edit Task</span>
      </button>
   }
    } @else {
      <button mat-button class="btn-close" (click)="cancelEdit()">Cancel</button>
    @if (title) {
      <button mat-raised-button color="primary" class="btn-edit" (click)="saveEdit()">
        Save Changes
      </button>
    }
    }
  </mat-dialog-actions>
</div>
`,
    scss: `/* Trimmed to the layout-defining rules — see the full file for every
   status-badge, date-picker, and dark-theme dropdown override. */

.task-dialog {
  background: #1d1d1d;
  color: #ffffff;
  border-radius: 8px;
  padding: 0;
  font-family: "Open Sans", sans-serif;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  border-bottom: 1px solid #3A3A3A;
  display: flex;
  padding: 24px;
  justify-content: space-between;
  align-items: center;
}

.dialog-body {
  display: flex;
  padding: 24px 24px 0 24px !important;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid #3A3A3A;
}

.detail label {
  color: var(--Area-Gray-300, #AFAFAF);
  font-family: "Open Sans";
  font-size: 12px;
  font-weight: 600;
}

.detail p {
  display: flex;
  color: #FFF;
  font-family: "Open Sans";
  font-size: 16px;
  gap: 8px;
}

.dialog-footer {
  border-top: 1px solid #3A3A3A;
  display: flex;
  height: 85px;
  padding-right: 24px;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.btn-close {
  background: transparent !important;
  border: 1px solid #3A3A3A !important;
  color: #FFF;
}

.btn-edit {
  border-radius: 4px;
  background: #0545F5 !important;
  display: flex;
  padding: 8px 20px 8px 16px;
  color: #fff;
}`,
  },
};
