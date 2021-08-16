function reformatState(tasks, projects) {
  let projectsInState = {};

  for (let each of tasks) {
    if (!projectsInState[each.project_id]) {
      projectsInState[each.project_id] = {
        name: each.project_name,
        tasks: [
          {
            id: each.id,
            name: each.name,
            project_id: each.project_id,
            description: each.description,
            priority: each.priority,
            status: each.status,
            end: each.end,
            avatar: each.avatar,
            start: each.start,
            user_id: each.user_id,
            user_name: each.user_name,
          },
        ],
      };
    } else {
      let task = {
        id: each.id,
        name: each.name,
        project_id: each.project_id,
        description: each.description,
        priority: each.priority,
        status: each.status,
        end: each.end,
        start: each.start,
        avatar: each.avatar,
        user_id: each.user_id,
        user_name: each.user_name,
      };
      projectsInState[each.project_id].tasks.push(task);
    }
  }

  for (let project of projects) {
    if (!projectsInState[project.id]) {
      projectsInState[project.id] = {
        name: project.name,
        tasks: [],
      };
    }
  }
  return projectsInState;
}

function deleteTask(id, tasks) {
  let index;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      index = i;
    }
  }
  tasks.splice(index, 1);
  return tasks;
}

function listForProject(tasks) {
  let listSchema = [
    {
      id: "1",
      name: "In Progress",
      tasks: [],
    },
    {
      id: "2",
      name: "Backlog",
      tasks: [],
    },
    {
      id: "3",
      name: "On Hold",
      tasks: [],
    },
    {
      id: "4",
      name: "Completed",
      tasks: [],
    },
  ];

  if (!tasks.length) {
    return listSchema;
  }

  for (let list of listSchema) {
    for (let task of tasks) {
      let taskDetails = {};
      if (task.status === list.name) {
        taskDetails["id"] = task.id;
        taskDetails["name"] = task.name;
        taskDetails["priority"] = task.priority;
        taskDetails["status"] = task.status;
        taskDetails["start"] = task.start;
        taskDetails["end"] = task.end;
        taskDetails["user_id"] = task.user_id;
        taskDetails["avatar"] = task.avatar;
        taskDetails["user_name"] = task.user_name;
        taskDetails["description"] = task.description;
        taskDetails["project_id"] = task.project_id;
        list.tasks.push(taskDetails);
      }
    }
  }
  return listSchema;
}

function findIndex(id, tasks) {
  let index;
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      index = i;
    }
  }
  return index;
}

const HaveProjectWithUsers = (projects, users) => {
  let projectWithUsers = {};
  for (let project of projects) {
    if (!projectWithUsers[project.id]) {
      projectWithUsers[project.id] = { users: [] };
    }
    for (let projectUser of project.users) {
      for (let user of users) {
        if (projectUser === user.id) {
          projectWithUsers[project.id].users.push(user);
        }
      }
    }
  }

  return projectWithUsers;
};

const getIncompleteTasks = function (tasks, id) {
  let incompleteTasks = [];

  for (let task of tasks) {
    if (task.user_id === id && task.status !== "Completed") {
      incompleteTasks.push(task);
    }
  }

  return incompleteTasks;
};

const getProjectNames = function (tasks) {
  const projectNames = [];
  for (let task of tasks) {
    if (!projectNames.includes(task.project_name)) {
      projectNames.push(task.project_name);
    }
  }
  return projectNames;
};

const getTaskForProject = function (tasks, project) {
  let projects = [];
  for (let task of tasks) {
    if (task.project_name === project) {
      projects.push(task);
    }
  }
  return projects;
};

const tasksForUser = function (tasks, id) {
  let userTasks = [];

  for (let task of tasks) {
    if (task.user_id === id) {
      userTasks.push(task);
    }
  }

  return userTasks;
};

const listForUser = function (lists, id) {
  for (let list of lists) {
    let newTasks = list.tasks.filter((task) => task.user_id === id);
    list.tasks = newTasks;
  }
  return lists;
};

export {
  reformatState,
  listForProject,
  deleteTask,
  HaveProjectWithUsers,
  findIndex,
  getIncompleteTasks,
  getProjectNames,
  getTaskForProject,
  tasksForUser,
  listForUser,
};
