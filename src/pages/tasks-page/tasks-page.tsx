import React, { useEffect } from 'react';

import { Task, TaskActionType } from '../../components/task/task';
import { useObservable } from '../../hooks/use-observable';
import { ITasksViewModel } from '../../models/tasks-view-model';

import * as styles from './tasks-page.scss';

interface TaskPageProps {
	model: ITasksViewModel;
}

export function TasksPage(props: TaskPageProps): JSX.Element {
	const { model } = props;

	useEffect(() => {
		model.fetchTasks();
	}, []);

	const tasks = useObservable(model.tasks$, model.tasks());

	const tasksContent = tasks.map((task) => {
		return (
			<Task
				actionType={ TaskActionType.Update }
				action={ async (): Promise<void> => { return; }}
				title={ task.title }
				description={ task.description }
				status={ task.status }
				key={ task._id }
			/>
		);
	});

	return (
		<main className={ styles.tasksPage }>
			<div>
				<h2>New task</h2>
				<Task actionType={ TaskActionType.Create } action={ model.createTask } />
			</div>
			{ tasksContent }
		</main>
	);
}
