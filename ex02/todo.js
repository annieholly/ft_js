var tasklist = document.getElementById("ft_list");

var taskcount = checkTaskCount();
var tasks_obj = {};
var tasks_json = "";
var cookie_tasks = "cookie_tasks";
var cookie_taskcount = "cookie_taskcount";

function save_task(task){
    var task_string = JSON.stringify(taskarray);
    console.log("task_string:"+task_string);
    tasks_obj = JSON.parse(task_string);
    console.log("json object:"+tasksObj);
}

function newTask() {
    console.log("taskcount:"+taskcount);
    var task = prompt("Enter task:");
    if (task == "")
      return ;
    tasks_obj[id_name] = task;
    var id_name = 'task'+taskcount;
    add_to_dom(task, id_name);
    setCookie(cookie_taskcount, taskcount, 30);
    taskcount++;
}

function add_to_dom(task, id_name){
    var d = document.createElement("DIV");
    var text = document.createTextNode(task);
    d.setAttribute('id', id_name);
    d.setAttribute('onclick', "removeTask(this.id)");
    d.appendChild(text);
    tasklist.appendChild(d);
    tasks_json = JSON.stringify(tasks_obj);
    setCookie(cookie_tasks, tasks_json, 30);
}

function removeTask(id_name){
    var current_elem = document.getElementById(id_name);
    var delete_prompt = prompt("Are you sure you want to remove this task?");
    delete_prompt = delete_prompt.toLowerCase();
    console.log(delete_prompt);
    if (delete_prompt != "yes" && delete_prompt != "y"
        && delete_prompt != "ok" && delete_prompt != "okay")
      return ;
    else {
      current_elem.parentNode.removeChild(current_elem);
      delete tasks_obj[id_name];
      tasks_json = JSON.stringify(tasks_obj);
      setCookie(cookie_tasks, tasks_json, 30);
    }
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(){

    tasks_json = getCookie(cookie_tasks);
    if (tasks_json == "")
        console.log("no cookies here");
    else
        load_existing_tasks(tasks_json);
}

function checkTaskCount(){
    var taskcount_json = getCookie(cookie_taskcount);
    if (!taskcount_json)
    {
        taskcount = 0;
        console.log("cookie_taskcount empty");
    }
    else
        taskcount = taskcount_json;
    return taskcount;
}

function load_existing_tasks(){
    tasks_obj = JSON.parse(tasks_json);
    for (var key in tasks_obj) {
        add_to_dom(tasks_obj[key], key);
        console.log(key+":"+tasks_obj[key]);
    }
}


//TaskList
//to delete task
//remove from JSON object and update cookie

checkCookie();
