export function task(name, description, status, date, priority){
    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.status = status;
    this.date = date;
    this.priority = priority
}

export function project(name, tasks = []){
    this.name = name;
    this.tasks = tasks;
}

export const projectManager = (function(){
    let projects = [];

    addProject(type){
        const newProject = project(type);
        projects.push(newProject);
    }

    removeProject(type){
        for(const item of projects){
            if(item.name === type){
                let index = projects.indexOf("item");
                projects = projects.splice(index, 1);
            }
        }
    }

    findProject(type){
       for(const item of projects){
            if(item.name === type){
                return item;
            }
        } 
    }
})();