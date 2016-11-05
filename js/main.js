(function(){
    //Remove and complete icons font awesome format
    var removeFontIcon = '<i class="fa fa-trash-o fa-2x fill" aria-hidden="true"></i>';
    var completeFontIcon = '<i class="fa fa-check-square-o fa-2x fill" aria-hidden="true"></i>';

    //Prompt message 
    var promptComplete = 'Task Completed';
    var promptIncomplete = 'Uh oh! Someone checked off too early!!'
    var promptRemove = 'Not needed huh??';

    var prompt = document.createElement('p');
    var container = document.getElementsByClassName('container')[0];

    //User click on the add button
    //If there is text inside item field, add that text to todo list
    document.getElementById('add').addEventListener('click', function(){
        var value = document.getElementById('item').value;

        if (value) {
            addItemTodo(value);
            document.getElementById('item').value = '';
        }
    })

    function removeItem() {
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        
        parent.removeChild(item);

        animatePrompt();
        prompt.innerHTML = promptRemove;
        container.appendChild(prompt);
    }

    function completeItem() {
        var item = this.parentNode.parentNode;
        var parent = item.parentNode;
        var id = parent.id;

        animatePrompt();
        container.appendChild(prompt);

        //Check if item should be add to the completed or to be re-added onto todo
        var target = (id === 'todo') ? document.getElementById('completed'):document.getElementById('todo');

        parent.removeChild(item);
        target.insertBefore(item, target.childNodes[0]);

        var promptMessage = (id === 'todo') ? prompt.innerHTML = promptComplete:prompt.innerHTML = promptIncomplete;
        
    }

    function animatePrompt() {
        prompt.classList.add('prompt', 'active');
        setTimeout(function() {
            prompt.classList.remove('active');
        }, 3000);
        container.appendChild(prompt);
    }

    //Add new items to todo list
    function addItemTodo(text) {

        var list = document.getElementById('todo');

        var item = document.createElement('li');
        item.innerText = text;

        var buttons = document.createElement('div');
        buttons.classList.add('buttons');

        var remove = document.createElement('button');
        remove.classList.add('remove');
        remove.innerHTML = removeFontIcon;

        //Add click event for removing the item
        remove.addEventListener('click', removeItem);

        var complete = document.createElement('button');
        complete.classList.add('complete');
        complete.innerHTML = completeFontIcon;

        //Add click event for completing the item
        complete.addEventListener('click', completeItem);

        buttons.appendChild(remove);
        buttons.appendChild(complete);
        item.appendChild(buttons);

        list.insertBefore(item, list.childNodes[0]);
    }
}());
