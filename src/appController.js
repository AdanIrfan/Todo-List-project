import { task, projectManager } from "./task";
    
    
    export function createTask(name, description, status, date, priority, projectName){
        const activity = task(name, description, status, date, priority);
        
        
        let matchedProject = projectManager.findProject(projectName);
           if(matchedProject){
                matchedProject.addTask(activity);
           }
           else{
                alert("project does not exist");
                return;
           }
    }

    export function deletetask(taskId, projectName){
        const selectedProject = projectManager.findProject(projectName);
        if(selectedProject === undefined){
            alert("project doesn't exist");
            return;
        }

        const deleteTask = selectedProject.findTask(taskId);
        if(deleteTask === undefined){
            alert("invalid task id, no match");
            return;
        }

        selectedProject.removeTask(deleteTask);
    }

    export function createProject(projectName){
        const projects = projectManager.getProjects();
        if(projects.find((project)=> {
            return project.name === projectName;
        })){
            alert("already exist");
        }
        else{
            projectManager.addProject(projectName);
        }
    }

    export function deleteProject(projectName){
        if(projectName === "default"){
            return;
        }
        const selectedProject = projectManager.findProject(projectName);

        if(selectedProject === undefined){
            alert("Project doesn't exist");
            return;
        }
        projectManager.removeProject(selectedProject.name);
    }

    export function updateTask(projectName, taskId, changes){
        const selectedProject = projectManager.findProject(projectName);
        if(selectedProject === undefined){
            return;
        }
        const selectedTask = selectedProject.findTask(taskId);
        if(selectedTask === undefined){
            return;
        }

        if(Object.hasOwn(changes, "name")){
            selectedTask.name = changes.name;
        }
        if(Object.hasOwn(changes, "description")){
            selectedTask.description = changes.description;
        }
        if(changes.status){ 
            selectedTask.status = changes.status;
        }
        if(changes.date){
            selectedTask.date = changes.date;
        }
        if(changes.priority){
            selectedTask.priority = changes.priority;
        }
    }


    