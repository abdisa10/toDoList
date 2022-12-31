function deleteOne(id_num) {
    const div_task = document.getElementById(id_num);
    div_task.parentNode.removeChild(div_task);


    console.log(id_num);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/delete');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ id_num }));



}