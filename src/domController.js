    import { projectManager } from "./task.js";
    import { createProject} from "./appController.js";
    
    
    
    
    export function domController(){
        const projectList = document.getElementById("projects");
        const addProjectBtn = document.getElementById("addProject");
        
        function renderProjects(projects){
                projectList.textContent = "";
            for(let i = 0; i < projects.length; i++){
                const li = document.createElement("li");
                li.textContent = projects[i].name;
                li.dataset.project = projects[i].name;
                projectList.appendChild(li);
            }

        }

        
        function renderTasks(project){
            const projectNameDiv = document.getElementById("projectName");
            const tasksDiv = document.getElementById("tasks");
            tasksDiv.textContent = "";
            
            projectNameDiv.textContent = project.name;
            
            project.tasks.forEach(((task)=>{
                const li = document.createElement("li");
                li.textContent = task.name;
                tasksDiv.appendChild(li);
            }))
        }

        function initializeDom(){
            const projects = projectManager.getProjects();
            renderProjects(projects);
            
            const defaultProject =projectManager.findProject("default")
            renderTasks(defaultProject);

            setupProjectEvents();

        }
        
        function setupProjectEvents(){
            projectList.addEventListener("click", (event)=>{
                if(event.target.dataset.project === undefined){
                    return;
                }
                const matchedDataset = event.target.dataset.project;
                const project = projectManager.findProject(matchedDataset)
                renderTasks(project);
            })

            const dialog = document.getElementById("dialogBox");
            addProjectBtn.addEventListener("click", function(){
                dialog.showModal();
            })
            
            const closeBtn = document.getElementById("closeButton");
            closeBtn.addEventListener("click", ()=>{
                dialog.close();
            })
            
            const form = document.getElementById("projectForm");
            form.addEventListener("submit", (event)=>{
                event.preventDefault();
                const projectName =  document.getElementById("projectInput").value;
                createProject(projectName);
                const projects = projectManager.getProjects()
                renderProjects(projects);
                dialog.close();
            })
            
        }

        return {initializeDom};
    }