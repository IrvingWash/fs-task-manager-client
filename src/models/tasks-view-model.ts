import { BehaviorSubject, Observable } from 'rxjs';

import { ApiTask, ApiTaskPayload } from '../api/api-objects-and-constants';
import { IApiTasksTransport } from '../api/api-transport';

export interface ITasksViewModel {
	tasks$: Observable<ApiTask[]>;
	tasks(): ApiTask[];
	fetchTasks(): Promise<void>;
	createTask(payload: ApiTaskPayload): Promise<void>;
	updateTask(id: string, payload: ApiTaskPayload): Promise<void>;
	deleteTask(id: string): Promise<void>;
}

export class TasksViewModel implements ITasksViewModel {
	public readonly tasks$: Observable<ApiTask[]>;

	private readonly _tasks$ = new BehaviorSubject<ApiTask[]>([]);
	private readonly _apiTasks: () => Promise<ApiTask[]>;
	private readonly _apiCreateTask: (payload: ApiTaskPayload) => Promise<ApiTask>;
	private readonly _apiUpdateTask: (id: string, payload: ApiTaskPayload) => Promise<ApiTask>;
	private readonly _apiDeleteTask: (id: string) => Promise<ApiTask>;

	public constructor(apiTransport: IApiTasksTransport) {
		this.tasks$ = this._tasks$.asObservable();
		this._apiTasks = apiTransport.tasks;
		this._apiCreateTask = apiTransport.createTask;
		this._apiUpdateTask = apiTransport.updateTask;
		this._apiDeleteTask = apiTransport.deleteTask;
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

	public createTask = async (payload: ApiTaskPayload): Promise<void> => {
		try {
			const newTask = await this._apiCreateTask(payload);
			const currentTasks = this.tasks();

			this._tasks$.next([...currentTasks, newTask]);
		} catch {
			throw new Error('Failed to create task');
		}
	};

	public updateTask = async (id: string, payload: ApiTaskPayload): Promise<void> => {
		try {
			const updatedTask = await this._apiUpdateTask(id, payload);

			const currentTasks = this.tasks();
			
			const filteredTasks = currentTasks.filter((task) => task._id !== updatedTask._id);

			this._tasks$.next([updatedTask, ...filteredTasks]);
		} catch {
			throw new Error('Failed to update task');
		}
	};

	public deleteTask = async (id: string): Promise<void> => {
		try {
			const deletedTask = await this._apiDeleteTask(id);

			const currentTasks = this.tasks();

			const filteredTasks = currentTasks.filter((task) => task._id !== deletedTask._id);

			this._tasks$.next([...filteredTasks]);
		} catch {
			throw new Error('Failed to delete task');
		}
	};
}
