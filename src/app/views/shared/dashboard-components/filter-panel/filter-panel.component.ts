import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatIconModule } from '@angular/material/icon';
import { DEFAULT_FILTER_STATE, FilterState } from '../../../../services/filter-state.service';

/**
 * Which filter sections a host page wants rendered. Every page that uses
 * <app-filter-panel> shows a different subset (see the 4 pages this was
 * extracted from), so nothing here defaults to `true` except Time Period,
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
 * own draft selection state and only reports it to the host via `apply` /
 * `reset`; it never talks to FilterStateService or any API itself — the host
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

  /** Initial selection, e.g. `filterStateService.getSnapshot()`. Read once on init. */
  @Input() value: FilterState = { ...DEFAULT_FILTER_STATE };

  /** Emits the full draft state when "Apply Filters" is clicked. */
  @Output() apply = new EventEmitter<FilterState>();

  /** Emits the (now-cleared) state when "Reset" is clicked. */
  @Output() reset = new EventEmitter<FilterState>();

  /** Emits when "Cancel" is clicked, closing the panel without applying. */
  @Output() cancel = new EventEmitter<void>();

  // ── Panel / dropdown open flags ──────────────────────────────────────────
  isFilterOpen = false;
  isLocationDropdownOpen = false;
  isAssetClassDropdownOpen = false;
  isCriticalityDropdownOpen = false;
  isRulDropdownOpen = false;
  isTimePeriodDropdownOpen = false;
  isSeasonDropdownOpen = false;

  // ── Static option lists (identical across every page that used these) ──
  criticalityOptions: string[] = ['Critical', 'Medium', 'Low'];
  rulOptions: string[] = ['All Ranges', '< 90 days', '< 6 months', '< 1 Years', '< 3 Years', 'custom'];
  timePeriods: string[] = [
    'Last 7 days',
    'Last 30 days',
    'Last 60 days',
    'Last 90 days',
    'Last year',
    'Custom',
    'By Season',
  ];
  seasons: string[] = ['Fall', 'Spring', 'Summer', 'Winter'];

  // ── Draft selection state, seeded from `value` and mutated locally until Apply ──
  selectedLocations: Set<string> = new Set();
  selectedAssetClasses: Set<string> = new Set();
  selectedCriticalityFilter: Set<string> = new Set();
  selectedRul: string = DEFAULT_FILTER_STATE.selectedRul;
  selectedTimePeriod: string = DEFAULT_FILTER_STATE.selectedTimePeriod;
  selectedSeason: string = DEFAULT_FILTER_STATE.selectedSeason;
  customStartDate: string = DEFAULT_FILTER_STATE.customStartDate;
  customEndDate: string = DEFAULT_FILTER_STATE.customEndDate;

  ngOnInit(): void {
    this.seedFromValue();
  }

  private seedFromValue(): void {
    const v = this.value ?? DEFAULT_FILTER_STATE;
    this.selectedLocations = new Set(v.selectedLocations);
    this.selectedAssetClasses = new Set(v.selectedAssetClasses);
    this.selectedCriticalityFilter = new Set(v.selectedCriticality);
    this.selectedRul = v.selectedRul;
    this.selectedTimePeriod = v.selectedTimePeriod;
    this.selectedSeason = v.selectedSeason;
    this.customStartDate = v.customStartDate;
    this.customEndDate = v.customEndDate;
  }

  closeAllDropdowns(): void {
    this.isLocationDropdownOpen = false;
    this.isAssetClassDropdownOpen = false;
    this.isCriticalityDropdownOpen = false;
    this.isRulDropdownOpen = false;
    this.isTimePeriodDropdownOpen = false;
    this.isSeasonDropdownOpen = false;
  }

  toggleFilter(): void {
    const isOpen = this.isFilterOpen;
    this.closeAllDropdowns();
    this.isFilterOpen = !isOpen;
  }

  toggleLocationDropdown(): void {
    const isOpen = this.isLocationDropdownOpen;
    this.closeAllDropdowns();
    this.isLocationDropdownOpen = !isOpen;
  }

  toggleAssetClassDropdown(): void {
    const isOpen = this.isAssetClassDropdownOpen;
    this.closeAllDropdowns();
    this.isAssetClassDropdownOpen = !isOpen;
  }

  toggleCriticalityDropdown(): void {
    const isOpen = this.isCriticalityDropdownOpen;
    this.closeAllDropdowns();
    this.isCriticalityDropdownOpen = !isOpen;
  }

  toggleRulDropdown(): void {
    const isOpen = this.isRulDropdownOpen;
    this.closeAllDropdowns();
    this.isRulDropdownOpen = !isOpen;
  }

  toggleTimePeriodDropdown(): void {
    const isOpen = this.isTimePeriodDropdownOpen;
    this.closeAllDropdowns();
    this.isTimePeriodDropdownOpen = !isOpen;
  }

  /**
   * Closes every other dropdown before opening Season, same as the other
   * toggleXDropdown() methods — the per-page copies of this had drifted
   * (some left Time Period open behind the Season list); this is the one
   * consistent version.
   */
  toggleSeasonDropdown(): void {
    const isOpen = this.isSeasonDropdownOpen;
    this.closeAllDropdowns();
    this.isSeasonDropdownOpen = !isOpen;
  }

  // ── Building / Location ──────────────────────────────────────────────────
  get locationLabel(): string {
    return this.selectedLocations.size === 0
      ? 'All Locations'
      : Array.from(this.selectedLocations).join(', ');
  }

  get isAllSelected(): boolean {
    return this.selectedLocations.size === 0;
  }

  onAllClick(): void {
    this.selectedLocations.clear();
    this.isLocationDropdownOpen = false;
  }

  onLocationToggle(location: string): void {
    if (this.selectedLocations.has(location)) {
      this.selectedLocations.delete(location);
    } else {
      this.selectedLocations.add(location);
    }
    this.isLocationDropdownOpen = false;
  }

  isLocationChecked(location: string): boolean {
    return this.selectedLocations.has(location);
  }

  // ── Asset Classes ────────────────────────────────────────────────────────
  get assetClassLabel(): string {
    const selected = Array.from(this.selectedAssetClasses);
    if (selected.length === 0) return 'All Classes';
    if (selected.length <= 2) return selected.join(', ');
    return `${selected.slice(0, 2).join(', ')} +${selected.length - 2} more`;
  }

  get isAssetClassAllSelected(): boolean {
    return this.selectedAssetClasses.size === 0;
  }

  onAssetClassAllClick(): void {
    this.selectedAssetClasses.clear();
  }

  onAssetClassToggle(cls: string): void {
    if (this.selectedAssetClasses.has(cls)) {
      this.selectedAssetClasses.delete(cls);
    } else {
      this.selectedAssetClasses.add(cls);
    }
  }

  isAssetClassChecked(cls: string): boolean {
    return this.selectedAssetClasses.has(cls);
  }

  trackByEquipmentClass(_index: number, item: any): string {
    return item?.EquipmentClassId;
  }

  // ── Criticality ───────────────────────────────────────────────────────────
  get criticalityLabel(): string {
    return this.selectedCriticalityFilter.size === 0
      ? 'All Statuses'
      : Array.from(this.selectedCriticalityFilter).join(', ');
  }

  get isCriticalityAllSelected(): boolean {
    return this.selectedCriticalityFilter.size === 0;
  }

  onCriticalityAllClick(): void {
    this.selectedCriticalityFilter.clear();
  }

  onCriticalityToggle(level: string): void {
    if (this.selectedCriticalityFilter.has(level)) {
      this.selectedCriticalityFilter.delete(level);
    } else {
      this.selectedCriticalityFilter.add(level);
    }
  }

  isCriticalityChecked(level: string): boolean {
    return this.selectedCriticalityFilter.has(level);
  }

  // ── RUL ───────────────────────────────────────────────────────────────────
  onRulSelect(range: string): void {
    this.selectedRul = range;
    this.isRulDropdownOpen = false;
  }

  // ── Time Period (+ Custom date range / By Season) ────────────────────────
  get isCustomSelected(): boolean {
    return this.selectedTimePeriod === 'Custom';
  }

  get isBySeasonSelected(): boolean {
    return this.selectedTimePeriod === 'By Season';
  }

  onTimePeriodSelect(period: string): void {
    this.selectedTimePeriod = period;
    if (period !== 'By Season') {
      this.isTimePeriodDropdownOpen = false;
      this.isSeasonDropdownOpen = false;
    }
  }

  onSeasonSelect(season: string): void {
    this.selectedSeason = season;
    this.isSeasonDropdownOpen = false;
  }

  /**
   * Native <input type="date"> doesn't reliably open its picker just from
   * the browser's own click handling, so this opens it explicitly via
   * showPicker(). A plain (click) handler alone re-fires that on every
   * click while the picker is already open (e.g. a second click on the
   * icon), which reads as the popup blinking — so re-opening is debounced
   * to once per 500ms, well under normal human click-again pacing but long
   * enough to swallow rapid repeat clicks on the same open picker.
   */
  private lastDatePickerOpenAt = 0;
  openDatePicker(event: Event): void {
    const now = Date.now();
    if (now - this.lastDatePickerOpenAt < 500) return;
    this.lastDatePickerOpenAt = now;
    (event.target as HTMLInputElement).showPicker();
  }

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

  private buildState(): FilterState {
    return {
      selectedLocations: Array.from(this.selectedLocations),
      selectedAssetClasses: Array.from(this.selectedAssetClasses),
      selectedCriticality: Array.from(this.selectedCriticalityFilter),
      selectedRul: this.selectedRul,
      selectedTimePeriod: this.selectedTimePeriod,
      selectedSeason: this.selectedSeason,
      customStartDate: this.customStartDate,
      customEndDate: this.customEndDate,
    };
  }

  /** Clears every filter back to its default value, closes the panel, and reports it. */
  resetFilter(): void {
    this.selectedLocations.clear();
    this.selectedAssetClasses.clear();
    this.selectedCriticalityFilter.clear();
    this.selectedRul = DEFAULT_FILTER_STATE.selectedRul;
    this.selectedTimePeriod = DEFAULT_FILTER_STATE.selectedTimePeriod;
    this.selectedSeason = DEFAULT_FILTER_STATE.selectedSeason;
    this.customStartDate = '';
    this.customEndDate = '';
    this.closeAllDropdowns();
    this.isFilterOpen = false;
    this.reset.emit(this.buildState());
  }

  applyFilters(): void {
    this.closeAllDropdowns();
    this.isFilterOpen = false;
    this.apply.emit(this.buildState());
  }

  cancelFilter(): void {
    this.isFilterOpen = false;
    this.cancel.emit();
  }
}
