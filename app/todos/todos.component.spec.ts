import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { TodosComponent } from './todos.component';
import { TodosService } from './shared/todos.service';
import { Todo } from './shared/todos.model';

describe('a todos component', () => {
	let component: TodosComponent;

	// register all needed dependencies
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpModule],
			providers: [
				{ provide: TodosService, useClass: MockTodosService },
				TodosComponent
			]
		});
	});

	// instantiation through framework injection
	beforeEach(inject([TodosComponent], (TodosComponent:any) => {
		component = TodosComponent;
	}));

	it('should have an instance', () => {
		expect(component).toBeDefined();
	});
});

// Mock of the original todos service
class MockTodosService extends TodosService {
	getTodos(): Observable<any> {
		return Observable.from([ { id: 1, name: 'One'}, { id: 2, name: 'Two'} ]);
	}
}
