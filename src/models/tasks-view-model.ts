import { BehaviorSubject, Observable } from 'rxjs';

import { ApiTask, ApiCreateTaskPayload } from '../api/api-objects-and-constants';

export interface ITasksViewModel {
	tasks$: Observable<ApiTask[]>;
	tasks(): ApiTask[];
	fetchTasks(): Promise<void>;
	createTask(payload: ApiCreateTaskPayload): Promise<void>;
}

interface TasksViewModelParams {
	apiTasks: () => Promise<ApiTask[]>;
	apiCreateTask: (payload: ApiCreateTaskPayload) => Promise<ApiTask>
}

export class TasksViewModel {
	public readonly tasks$: Observable<ApiTask[]>;

	private readonly _tasks$ = new BehaviorSubject<ApiTask[]>([]);
	private readonly _apiTasks: () => Promise<ApiTask[]>;
	private readonly _apiCreateTask: (payload: ApiCreateTaskPayload) => Promise<ApiTask>;

	public constructor(params: TasksViewModelParams) {
		const { apiTasks, apiCreateTask } = params;

		this.tasks$ = this._tasks$.asObservable();
		this._apiTasks = apiTasks;
		this._apiCreateTask = apiCreateTask;
	}

	public tasks = (): ApiTask[] => {
		return this._tasks$.getValue();
	};

	public fetchTasks = async (): Promise<void> => {
		try {
			const tasks = await this._apiTasks();

			this._tasks$.next(tasks);
		} catch {
			throw new Error('Failed to fetch tasks');
		}
	};

	public createTask = async (payload: ApiCreateTaskPayload): Promise<void> => {
		try {
			const newTask = await this._apiCreateTask(payload);
			const currentTasks = this.tasks();

			this._tasks$.next([...currentTasks, newTask]);
		} catch {
			throw new Error('Failed to create task');
		}
	};
}
