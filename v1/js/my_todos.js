    /**
     * Todo
     */
    var TodoApp = {

        init: function() {
            document.getElementById('todoForm').addEventListener('submit', TodoApp.add);
            TodoApp.show();
        },

        add: function(ev) {
            ev.preventDefault();

            var todoText = document.getElementById('todoInput').value;

            if (todoText === '') {
                alert("You must write something!");
            } else {
                var todoId = myStorage.getItems().length;
                var todo = {
                    id: todoId,
                    text: todoText,
                    checked: false
                }
                myStorage.setItem(todo);
                TodoApp.show();
            }

            return false;
        },

        remove: function(ev) {
            debugger;
            // search for parent with class 'todo-item', then get the todo id from it.
            var todoListElement = ev.target;
            while ((todoListElement = todoListElement.parentElement) && !todoListElement.classList.contains('todo-item'));

            if (!todoListElement) {
                return;
            }

            var id = todoListElement.getAttribute('id');

            myStorage.removeItem(id);

            TodoApp.show();

            return false;
        },

        show: function() {
            var todos = myStorage.getItems();

            var html = '<ul class="list-group todo-list">';

            for (var i = 0; i < todos.length; i++) {
                // {text: "asdas", checked: true, id: 1}
                var todo = todos[i];
                html += '<li class="todo-item list-group-item ' + (todo.checked ? 'checked' : '') + '" id="' + todo.id + '">' + todo.text + '<span class="text-danger remove"><i class="glyphicon glyphicon-remove" aria-hidden="true"></i></span></li>';
            };

            html += '</ul>';

            document.getElementById('todos').innerHTML = html;

            var list = document.querySelector('ul.todo-list');

            list.addEventListener('click', function(ev) {
                debugger;
                if (ev.target.classList.contains('remove') || ev.target.parentElement.classList.contains('remove')) {
                    TodoApp.remove(ev);
                }

                if (ev.target.tagName === 'LI') {
                    var id = ev.target.getAttribute('id');
                    var todo = myStorage.getItem(id);
                    todo.checked = !ev.target.classList.contains('checked');
                    myStorage.setItem(todo);
                    ev.target.classList.toggle('checked');
                }
            }, false);
        }
    }