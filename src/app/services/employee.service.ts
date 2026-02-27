import { Injectable, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  GET_ALL_EMPLOYEES,
  SEARCH_EMPLOYEE_BY_ID,
  SEARCH_BY_DESIGNATION_OR_DEPARTMENT,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from '../graphql/graphql.operations';
import { Employee, DeleteResponse } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly apollo = inject(Apollo);

  getAllEmployees(): Observable<Employee[]> {
    return this.apollo.query<{ getAllEmployees: Employee[] }>({
      query: GET_ALL_EMPLOYEES,
      fetchPolicy: 'network-only',
    }).pipe(map(result => result.data?.getAllEmployees ?? []));
  }

  getEmployeeById(eid: string): Observable<Employee> {
    return this.apollo.query<{ searchEmployeeById: Employee }>({
      query: SEARCH_EMPLOYEE_BY_ID,
      variables: { eid },
      fetchPolicy: 'network-only',
    }).pipe(map(result => result.data!.searchEmployeeById));
  }

  searchEmployees(designation?: string, department?: string): Observable<Employee[]> {
    return this.apollo.query<{ searchEmployeeByDesignationOrDepartment: Employee[] }>({
      query: SEARCH_BY_DESIGNATION_OR_DEPARTMENT,
      variables: {
        designation: designation || null,
        department: department || null,
      },
      fetchPolicy: 'network-only',
    }).pipe(map(result => result.data?.searchEmployeeByDesignationOrDepartment ?? []));
  }

  addEmployee(employee: Partial<Employee>): Observable<Employee> {
    return this.apollo.mutate<{ addEmployee: Employee }>({
      mutation: ADD_EMPLOYEE,
      variables: employee,
    }).pipe(map(result => result.data!.addEmployee));
  }

  updateEmployee(eid: string, updates: Partial<Employee>): Observable<Employee> {
    return this.apollo.mutate<{ updateEmployee: Employee }>({
      mutation: UPDATE_EMPLOYEE,
      variables: { eid, ...updates },
    }).pipe(map(result => result.data!.updateEmployee));
  }

  deleteEmployee(eid: string): Observable<DeleteResponse> {
    return this.apollo.mutate<{ deleteEmployee: DeleteResponse }>({
      mutation: DELETE_EMPLOYEE,
      variables: { eid },
    }).pipe(map(result => result.data!.deleteEmployee));
  }
}
