const xhr = new XMLHttpRequest();
xhr.open('GET', '/refresh');
xhr.send();

xhr.addEventListener('load', () => {

    const data = JSON.parse(xhr.responseText);
    for (const index of data.data) {
        const id = index.ids;
        const task = index.task;
        const priority = index.priority;
        const completed = index.completed;

        if (completed == 0) { // not done
            const html = `<div class="task" id="${id}">
                        <div class="text">${task}</div>
                        <div class="priority_num" id="priority">${priority}</div>
                        <button class="task_complete" onclick="finished(${id})">done</button>
                        <button class="deletebtn" id="delete" onclick="deleteOne(${id})">&times;</button></div>
                    `;
            const currentElement = document.querySelector('.tasks');
            currentElement.insertAdjacentHTML('beforeend', html);
        } else { // done
            const html = `<div class="task" id="${id}">
                    <div class="text">${task}</div>
                    <div class="priority_num" id="priority">${priority}</div>
                    <button class="not-donebtn" onclick="unfinished(${id})">not done</button>
                    <button class="deletebtn" id="delete" onclick="deleteOne(${id})">&times;</button></div>
                    `;
            const currentElement = document.querySelector('.finishedTasks');
            currentElement.insertAdjacentHTML('beforeend', html);



        }
    }
})

