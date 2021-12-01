// import { BehaviorSubject, debounceTime, skip, switchMap, takeUntil } from 'rxjs';
//
// export const autocomplete = (time: number, selector) => (source$) =>
//   source$.pipe(
//     debounceTime(time),
//     switchMap((...args: any[]) => selector(...args).pipe(takeUntil(source$.pipe(skip(1)))))
//   );
//
// const term$ = new BehaviorSubject<string>('');
// const results$ = term$.pipe(autocomplete(1000, (term: string) => getAutocompleteSuggestions(term)));
