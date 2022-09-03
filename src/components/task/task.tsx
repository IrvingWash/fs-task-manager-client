import React, { useState } from 'react';
import classnames from 'classnames';

import { ApiCreateTaskPayload, ApiTaskStatus } from '../../api/api-objects-and-constants';

import * as styles from './task.scss';

export enum TaskActionType {
	Create = 'Create',
	Update = 'Update',
}

interface TaskProps {
	actionType: TaskActionType;
	action: (payload: ApiCreateTaskPayload) => Promise<void>;
	title?: string;
	status?: ApiTaskStatus;
	description?: string;
}

export function Task(props: TaskProps): JSX.Element {
	const [title, setTitle] = useState(props.title ?? '');
	const [description, setDescription] = useState(props.description ?? '');
	const [status, setStatus] = useState(props.status ?? ApiTaskStatus.Open);

	return (
		<div className={ styles.task }>
			<input
				type='text'
				className={ classnames(styles.input, styles.title) }
				placeholder='Title'
				value={ title }
				onChange={ handleTitleInput }
			/>

			<input
				type='text'
				className={ styles.input }
				placeholder='Description'
				value={ description }
				onChange={ handleDescriptionInput }
			/>

			<select
				className={ styles.status }
				defaultValue={ status }
				onChange={ handleStatusSelect }
			>
				<option value={ ApiTaskStatus.Open }>Open</option>
				<option value={ ApiTaskStatus.Done }>Done</option>
			</select>

			<button
				onClick={ handleCreate }
			>
				{props.actionType}
			</button>
		</div>
	);

	function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setTitle(event.target.value);
	}

	function handleDescriptionInput(event: React.ChangeEvent<HTMLInputElement>): void {
		setDescription(event.target.value);
	}

	function handleStatusSelect(event: React.ChangeEvent<HTMLSelectElement>): void {
		setStatus(event.target.value as ApiTaskStatus);
	}

	async function handleCreate(): Promise<void> {
		await props.action({
			title,
			description,
			status,
		});

		setTitle('');
		setDescription('');
		setStatus(ApiTaskStatus.Open);
	}
}
