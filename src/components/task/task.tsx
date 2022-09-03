import React, { useState } from 'react';
import classnames from 'classnames';

import { ApiTaskPayload, ApiTaskStatus } from '../../api/api-objects-and-constants';

import * as styles from './task.scss';

export enum TaskActionType {
	Create = 'Create',
	Update = 'Update',
}

interface TaskProps {
	actionType: TaskActionType;
	id?: string;
	title?: string;
	status?: ApiTaskStatus;
	description?: string;
	createTask?: (payload: ApiTaskPayload) => Promise<void>;
	updateTask?: (id: string, payload: ApiTaskPayload) => Promise<void>;
	deleteTask?: (id: string) => Promise<void>;
}

export function Task(props: TaskProps): JSX.Element {
	const { actionType } = props;

	const [title, setTitle] = useState(props.title ?? '');
	const [description, setDescription] = useState(props.description ?? '');
	const [status, setStatus] = useState(props.status ?? ApiTaskStatus.Open);

	return (
		<form
			className={ styles.task }
			onSubmit={ actionType === TaskActionType.Create
				? handleCreate
				: handleUpdate
			}
		>
			<input
				type='text'
				className={ classnames(styles.input, styles.title) }
				placeholder='Title'
				value={ title }
				onChange={ handleTitleInput }
				required={ actionType === TaskActionType.Create }
			/>

			<input
				type='text'
				className={ styles.input }
				placeholder='Description'
				value={ description }
				onChange={ handleDescriptionInput }
			/>

			<div className={ styles.control }>
				<select
					className={ styles.status }
					defaultValue={ status }
					onChange={ handleStatusSelect }
				>
					<option value={ ApiTaskStatus.Open }>Open</option>
					<option value={ ApiTaskStatus.Done }>Done</option>
				</select>

				<button className={ classnames(styles.button, styles.submitButton) } type='submit'>
					{actionType}
				</button>

				{	actionType === TaskActionType.Update && (
					<button className={ classnames(styles.button, styles.deleteButton) } onClick={ handleDelete }>
						Delete
					</button>
				)	}
			</div>
		</form>
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

	async function handleCreate(event: React.FormEvent<HTMLFormElement>): Promise<void> {
		event.preventDefault();

		await props.createTask?.({
			title,
			description,
			status,
		});

		setTitle('');
		setDescription('');
		setStatus(ApiTaskStatus.Open);
	}

	async function handleUpdate(): Promise<void> {
		await props.updateTask?.(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			props.id!,
			{
			title,
			description,
			status,
		});
	}

	async function handleDelete(): Promise<void> {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		await props.deleteTask?.(props.id!);
	}
}
