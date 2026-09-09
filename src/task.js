    export function task(name, description, status, date, priority){
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.status = status;
        this.date = date;
        this.priority = priority
    }

    export function project(name){
        this.name = name;
        this.tasks = [];

        this.addTask = function(task){
            this.tasks.push(task);
        }

        this.removeTask = function(task){
            for(const item of this.tasks){
                if(item.id === task.id ){
                    const index = this.tasks.indexOf(item);
                    this.tasks.splice(index, 1);
                    return;
                }
            }
        }

        this.findTask = function(taskId){
            for(const item of this.tasks){
                if(item.id === taskId){
                    return item;
                }
            }
        }
    }

    export const projectManager = (function(){
        let projects = [];
        const defaultProject = project("default");
        projects.push(defaultProject);

        const getProjects = () => projects;

        
        function addProject(type){
            const newProject = project(type);
            projects.push(newProject);
            return newProject;
        }

        function removeProject(type){
            for(const project of projects){
                if(project.name === type){
                    let index = projects.indexOf(project);
                    projects.splice(index, 1);
                }
            }
        }

        function findProject(type){
        for(const project of projects){
                if(project.name === type){
                    return project;
                }
            } 
        }
        return {getProjects, addProject, removeProject, findProject};
    })();


    export function createTask(name, description, status, date, priority){
        const activity = task(name, description, status, date, priority);
        
        const selectProject = prompt("which project do you want to go");
        
        let matchedProject = projectManager.findProject(selectProject);
           if(matchedProject){
                matchedProject.addTask(activity);
           }
           else{
                console.log("project does not exist");

                let newProject = projectManager.addProject(selectProject);
                newProject.addTask(activity);
           }
}
