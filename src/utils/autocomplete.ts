import { debounceTime, Observable, skip, switchMap, takeUntil } from 'rxjs';

export const autocomplete = (time: number, selector: any) => (source$: Observable<string>) =>
  source$.pipe(
    debounceTime(time),
    switchMap((...args: any[]) => selector(...args).pipe(takeUntil(source$.pipe(skip(1)))))
  );

// const term$ = new BehaviorSubject<string>('');
// const results$ = term$.pipe(autocomplete(1000, (term: string) => getAutocompleteSuggestions(term)));
