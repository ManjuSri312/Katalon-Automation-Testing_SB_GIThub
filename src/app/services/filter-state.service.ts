import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Draft/applied selection shape shared by every host page's <app-filter-panel>.
 * FilterPanelComponent seeds its own draft state from this on init and reports
 * it back (via `apply`/`reset`) in this same shape — it never reads or writes
 * FilterStateService directly, so each host decides what to persist.
 */
export interface FilterState {
  selectedLocations: string[];
  selectedAssetClasses: string[];
  selectedCriticality: string[];
  selectedRul: string;
  selectedTimePeriod: string;
  selectedSeason: string;
  customStartDate: string;
  customEndDate: string;
}

/** Everything unselected, except Time Period — every host page shows that section, defaulted to "Last 7 days". */
export const DEFAULT_FILTER_STATE: FilterState = {
  selectedLocations: [],
  selectedAssetClasses: [],
  selectedCriticality: [],
  selectedRul: '',
  selectedTimePeriod: 'Last 7 days',
  selectedSeason: '',
  customStartDate: '',
  customEndDate: '',
};

/**
 * Holds the last-applied filter selection so it can survive navigation between
 * pages that share the same <app-filter-panel>. A host page applies a new
 * selection via `setSnapshot()` (typically from the panel's `(apply)` output)
 * and reads it back via `getSnapshot()` (typically as the panel's `[value]`).
 */
@Injectable({ providedIn: 'root' })
export class FilterStateService {
  private readonly state$ = new BehaviorSubject<FilterState>({ ...DEFAULT_FILTER_STATE });

  /** Current snapshot, e.g. for seeding `<app-filter-panel [value]>` on init. */
  getSnapshot(): FilterState {
    return { ...this.state$.value };
  }

  /** Replaces the stored snapshot, e.g. from the panel's `(apply)` output. */
  setSnapshot(state: FilterState): void {
    this.state$.next({ ...state });
  }

  /** Clears back to defaults, e.g. from the panel's `(reset)` output. */
  clear(): void {
    this.state$.next({ ...DEFAULT_FILTER_STATE });
  }
}
