import { task, projectManager } from "./task.js";
import { storeData } from "./storage.js";
    
    
    const validStatuses = ["complete", "pending"];
    const validPriorities = ["high", "medium", "low"];

    function isValidDate(date){
        if(!/^\d{4}-\d{2}-\d{2}$/.test(date)){
            return false;
        }

        const parsedDate = new Date(`${date}T00:00:00Z`);
        return !Number.isNaN(parsedDate.getTime()) && parsedDate.toISOString().startsWith(date);
    }

    function isValidTaskData(name, status, date, priority){
        return typeof name === "string" && name.trim() !== ""
            && validStatuses.includes(status)
            && validPriorities.includes(priority)
            && isValidDate(date);
    }

    export function createTask(name, description, status, date, priority, projectName){
        if(!isValidTaskData(name, status, date, priority)){
            alert("Please complete all task fields");
            return false;
        }
        const activity = new task(name, description, status, date, priority);
        
        
        let matchedProject = projectManager.findProject(projectName);
           if(matchedProject){
            matchedProject.addTask(activity);
            storeData();
            return true;
           }
           else{
                alert("project does not exist");
             return false;
           }
    }

    export function deleteTask(taskId, projectName){
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
        storeData();
    }

    export function createProject(projectName){
        const normalizedName = typeof projectName === "string" ? projectName.trim() : "";
        const projects = projectManager.getProjects();
        const alreadyExist = projects.find((project)=> {
            return project.name === normalizedName;
        });
        if(normalizedName === ""){
            alert("Project name cannot be empty");
        }
        else if(alreadyExist){
            alert("Project already exists");
        }
        else{
            projectManager.addProject(normalizedName);
            storeData();
            return true;
        }
        return false;
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
        storeData();
    }

    export function updateTask(projectName, taskId, changes){
    const selectedProject = projectManager.findProject(projectName);

    if(selectedProject === undefined){
        return false;
    }

    const selectedTask = selectedProject.findTask(taskId);

    if(selectedTask === undefined){
        return false;
    }

    const updatedTask = {
        name: Object.hasOwn(changes, "name") ? changes.name : selectedTask.name,
        description: Object.hasOwn(changes, "description") ? changes.description : selectedTask.description,
        status: Object.hasOwn(changes, "status") ? changes.status : selectedTask.status,
        date: Object.hasOwn(changes, "date") ? changes.date : selectedTask.date,
        priority: Object.hasOwn(changes, "priority") ? changes.priority : selectedTask.priority
    };

    if(!isValidTaskData(updatedTask.name, updatedTask.status, updatedTask.date, updatedTask.priority)){
        alert("Please complete all task fields");
        return false;
    }

    selectedTask.name = updatedTask.name.trim();
    selectedTask.description = updatedTask.description;
    selectedTask.status = updatedTask.status;
    selectedTask.date = updatedTask.date;
    selectedTask.priority = updatedTask.priority;

    storeData();
    return true;
}