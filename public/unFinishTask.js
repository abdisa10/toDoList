function unfinished(id_num) {
    const div_task = document.getElementById(id_num);

    const text_element = div_task.querySelector('.text');
    const priority_num = div_task.querySelector('.priority_num');
    const text = text_element.innerText;
    div_task.parentNode.removeChild(div_task);


    const html = `<div class="task" id="${id_num}">
                    <div class="text">${text}</div>
                    <div class="priority_num" id="priority">${priority_num}</div>
                    <button class="task_complete" onclick="finished(${id_num})">done</button>
                    <button class="deletebtn" id="delete" onclick="deleteOne(${id_num})">&times;</button></div>
                `;




    const currentElement = document.querySelector('.tasks');
    currentElement.insertAdjacentHTML('beforeend', html);




    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/notDone');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id_num }));

}