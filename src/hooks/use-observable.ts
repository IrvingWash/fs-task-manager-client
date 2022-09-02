import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';

export function useObservable<T>(observable$: Observable<T>, initialValue: T): T;
export function useObservable<T>(observable$: Observable<T>, initialValue?: never): T | undefined;
export function useObservable<T>(observable$: Observable<T>, initialValue?: T): T | undefined {
	const [value, setValue] = useState(initialValue);

	useEffect(
		() => {
			const subscription = observable$.subscribe(setValue);
			return () => subscription.unsubscribe();
		},
		[observable$]
	);

	return value;
}
