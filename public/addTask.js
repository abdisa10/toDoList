


function handleFormSubmit(event) {
    event.preventDefault();

    const task = document.getElementById("task_form").value;
    const priority = document.getElementById("priority").value;
    let err = false;

    if (task == "") {
        err = true;
    }
    if (priority == "choose_below") {
        err = true;
    }
    if (err) {
        console.log("Make sure you entered task, fixed priority to a number, and have no date that's passed. ")
    } else {

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/task');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ task, priority }));

        const xhr_receive = new XMLHttpRequest();
        xhr_receive.open('GET', '/latestTask');
        xhr_receive.setRequestHeader('Content-Type', 'application/json');
        xhr_receive.send();
        xhr_receive.addEventListener('load', () => {
            const data = JSON.parse(xhr_receive.responseText);
            const html = `<div class="task" id="${data.data[0].ids}">
                        <div class="text">${data.data[0].task}</div>
                        <div class="priority_num" id="priority">${data.data[0].priority}</div>
                        <button class="task_complete" onclick="finished(${data.data[0].ids})">done</button>
                        <button class="deletebtn" id="delete" onclick="deleteOne(${data.data[0].ids})">&times;</button></div>
                    `;

            const currentElement = document.querySelector('.tasks');
            currentElement.insertAdjacentHTML('beforeend', html);
        });

    }
};








