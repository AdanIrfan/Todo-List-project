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
        const defaultProject = new project("default");
        projects.push(defaultProject);

        const getProjects = () => projects;

        
        function addProject(type){
            const newProject = new project(type);
            projects.push(newProject);
            return newProject;
        }

        function restoreProject(savedProject){
            projects.push(savedProject);
        }

        function replaceProjects(savedProjects){
            projects = savedProjects;
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
        return {getProjects, addProject, removeProject, findProject, restoreProject, replaceProjects};
    })();