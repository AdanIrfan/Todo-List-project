import {projectManager, project, task} from "./task.js";



export function storeData(){
    const projects = JSON.stringify(projectManager.getProjects());
    localStorage.setItem("todoProjects", projects);

}

export function loadData(){
    const projects = localStorage.getItem("todoProjects");
    if(!projects){
        return false;
    }
    try{
        const parsedProjects = JSON.parse(projects);
        return Array.isArray(parsedProjects) ? parsedProjects : false;
    }
    catch(error){
        localStorage.removeItem("todoProjects");
        return false;
    }
}
    
export function restoreProjects(){
        const projects = loadData();
        if(!projects){
            return;
        }
        const restoredProjects = [];
        projects.forEach(eachProject => {
            if(!eachProject || typeof eachProject.name !== "string"){
                return;
            }
            const newProject = new project(eachProject.name);
            const savedTasks = Array.isArray(eachProject.tasks) ? eachProject.tasks : [];
            for(const work of savedTasks){
                if(!work || typeof work.name !== "string"){
                    continue;
                }
                const newTask = new task(work.name, work.description, work.status, work.date, work.priority);
                newTask.id = work.id;
                newProject.addTask(newTask)
            }
            restoredProjects.push(newProject);
        });
        if(restoredProjects.length > 0){
            if(!restoredProjects.some(eachProject => eachProject.name === "default")){
                restoredProjects.unshift(new project("default"));
            }
            projectManager.replaceProjects(restoredProjects);
        }
    }
        