import React, { useEffect } from 'react';

import { useObservable } from '../../hooks/use-observable';
import { ITaskViewModel } from '../../models/task-view-model';

interface TaskPageProps {
	model: ITaskViewModel;
}

export function TasksPage(props: TaskPageProps): JSX.Element {
	const { model } = props;

	useEffect(() => {
		model.fetchTasks();
	}, []);

	const tasks = useObservable(model.tasks$, model.tasks());

	console.log(tasks);

	return (
		<main>
			Tasks
		</main>
	);
}
