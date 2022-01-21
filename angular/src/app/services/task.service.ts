import { Injectable } from '@angular/core';

import { Task } from './../interfaces/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private api = 'http://ec2-15-228-254-177.sa-east-1.compute.amazonaws.com:3001/guardar';

  constructor(private  http: HttpClient) { }

  createTask(task: Task){
    const path = `${this.api}`;
    return this.http.post(path, task);
  }
  
  getAllTasks(){
    const path = `${this.api}`;
    return this.http.get<Task[]>(path);
  }
}
