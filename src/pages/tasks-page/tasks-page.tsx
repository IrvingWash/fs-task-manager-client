import React, { useEffect } from 'react';

import { useObservable } from '../../hooks/use-observable';
import { ITasksViewModel } from '../../models/tasks-view-model';

interface TaskPageProps {
	model: ITasksViewModel;
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
