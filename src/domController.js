    import { projectManager, task } from "./task.js";
    import { createProject, createTask, deleteProject, deleteTask, updateTask} from "./appController.js";
    
    
    
    
    export function domController(){
        const projectList = document.getElementById("projects");
        const addProjectBtn = document.getElementById("addProject");
        let currentProject = {};
        
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
            currentProject = project;
            tasksDiv.textContent = "";
            
            projectNameDiv.textContent = project.name;
            
            project.tasks.forEach(((task)=>{
                const li = document.createElement("li");
                li.dataset.id = task.id;
                li.textContent = task.name;
                tasksDiv.appendChild(li);
            }))
        }

        function initializeDom(){
            const projects = projectManager.getProjects();
            renderProjects(projects);
            
            const defaultProject =projectManager.findProject("default")
            renderTasks(defaultProject);
            
            setupTaskEvents();
            setupProjectEvents();
            displayTaskInfo();

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

            const deleteBtn = document.getElementById("deleteProject");
            deleteBtn.addEventListener("click",()=>{
                const projectName = currentProject.name;
                if(projectName === "default"){
                    return;
                }
                deleteProject(projectName);
                const projects = projectManager.getProjects();
                renderProjects(projects);

                currentProject = projectManager.findProject("default");
                renderTasks(currentProject);
            })
        }

        function setupTaskEvents(){
            const addBtn = document.getElementById("addTask");
            const dialogBox = document.getElementById("taskDialog");
            const closeBtn = document.getElementById("closeBtn");
            const form = document.getElementById("taskForm");

            addBtn.addEventListener("click", ()=>{
                dialogBox.showModal();
            })

            closeBtn.addEventListener("click", ()=>{
                dialogBox.close();
            })

            form.addEventListener("submit", (e)=>{
                e.preventDefault();
                const taskName = document.getElementById("taskName").value;
                const taskDescription = document.getElementById("taskDescription").value;
                const taskStatus = document.querySelector(`input[name="status"]:checked`).value;
                const taskDate = document.getElementById("taskDate").value;
                const taskPriority = document.querySelector(`input[name="priority"]:checked`).value;

                createTask(taskName, taskDescription, taskStatus, taskDate, taskPriority, currentProject.name);
                renderTasks(currentProject);
                dialogBox.close();
                form.reset();
            })
        }


        function displayTaskInfo(){
            const tasksDiv = document.getElementById("tasks");
            const dialog = document.getElementById("dialogTaskDisplay");
            const editBtn = document.getElementById("edit");
            const deleteBtn = document.getElementById("delete");
            const closeBtn = document.getElementById("close");
            let currentTask = {};

            tasksDiv.addEventListener("click", (event)=>{
                const taskId = event.target.dataset.id;
                if(taskId === undefined){
                    return;
                }
                const task = currentProject.findTask(taskId);
                currentTask = task;
                dialog.showModal();
                const displayName = document.getElementById("displayName");
                const displayDescription = document.getElementById("displayDescription");
                const displayStatus = document.getElementById("displayStatus");
                const displayDate = document.getElementById("displayDate");
                const displayPriority = document.getElementById("displayPriority");

                displayName.textContent = task.name;
                displayDescription.textContent = task.description;
                displayStatus.textContent = task.status;
                displayDate.textContent = task.date;
                displayPriority.textContent = task.priority;
            } )
            
            closeBtn.addEventListener("click", ()=>{
                dialog.close();
            })
            
            deleteBtn.addEventListener("click", ()=>{
                const taskId = currentTask.id;
                deleteTask(taskId, currentProject.name);
                renderTasks(currentProject)
                dialog.close();
            })

            const editDialog = document.getElementById("editDialog");
            editBtn.addEventListener("click", ()=>{
                dialog.close();
                editDialog.showModal();

                
                document.getElementById("editName").value = currentTask.name;
                document.getElementById("editDescription").value = currentTask.description;
                document.querySelector(`input[name="editStatus"][value="${currentTask.status}"]`).checked = true;
                document.getElementById("editDate").value = currentTask.date;
                document.querySelector(`input[name="editPriority"][value="${currentTask.priority}"]`).checked = true;
            })
            
            const saveBtn = document.getElementById("editSave");
            saveBtn.addEventListener("click",(e)=>{
                e.preventDefault();
                
                const editName = document.getElementById("editName").value;
                const editDescription = document.getElementById("editDescription").value;
                const editStatus = document.querySelector(`input[name="editStatus"]:checked`).value;
                const editDate = document.getElementById("editDate").value;
                const editPriority = document.querySelector(`input[name="editPriority"]:checked`).value;
                
                const change = {
                    name: editName,
                    description: editDescription,
                    status: editStatus,
                    date: editDate,
                    priority: editPriority
                }
                
                
                const projectName = currentProject.name;
                const taskId = currentTask.id;
                
                updateTask(projectName, taskId, change);
                renderTasks(currentProject);
                editDialog.close();
            })

            const exitBtn = document.getElementById("closeEdit");
            exitBtn.addEventListener("click", ()=>{
                editDialog.close();
            })
            
        }


        return {initializeDom};
    }

