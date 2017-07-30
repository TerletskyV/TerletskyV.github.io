var todoApp = {
    init: function() {
        $('#todoForm').submit(function(ev) {
            ev.preventDefault();
            $('#add').click(function() {
                todoApp.add();
                return false;
            });
            todoApp.add();
        });
        $('#todoList').click(function(ev) {
            if (ev.target.nodeName === 'LI' || $(ev.target).parent('li')) {
                var id;
                var $liClosest = $(ev.target).closest('li');
                var $sp = $(ev.target).find('.check');
                if ($(ev.target).attr('id')) {
                    id = ev.target.id;
                } else {
                    id = $liClosest.attr('id');
                }
                var todo = myStorage.getItem(id);

                if ($(ev.target).hasClass('checked')) {
                    todo.checked = !$(ev.target).hasClass('checked');
                } else {
                    todo.checked = !$liClosest.hasClass('checked')
                }
                myStorage.setItem(todo);
                if (ev.target.nodeName === 'LI') {
                    $(ev.target).toggleClass('checked grey lighten-1');
                    $sp.toggleClass('hide');
                } else {
                    $liClosest.toggleClass('checked grey lighten-1');
                    $sp.toggleClass('hide');
                }
            }
            if ($(ev.target).hasClass('remove')) {
                todoApp.remove(ev);
                return false;
            }
        });

        todoApp.render();
    },

    add: function(ev) {
        var todoText = $('#todoInput').val();
        if (todoText == '') {
            $('#todoInput').addClass('invalid');
            $('#todoInput').attr('placeholder', 'Type something!');
        } else {
            var todoId = myStorage.generateNewId();
            var todo = {
                id: todoId,
                text: todoText,
                checked: false
            }
            $('#todoInput').removeClass('invalid');
            $('#todoInput').attr('placeholder', 'What to do?');
            myStorage.setItem(todo);
            todoApp.render();
            $('#todoInput').val('');
        }
        return false;
    },

    remove: function(ev) {
        var todoListElement = ev.target;
        while ((todoListElement = todoListElement.parentElement) && !todoListElement.classList.contains('todo-item'));
        if (!todoListElement) {
            return;
        }
        var id = $(todoListElement).attr('id');

        myStorage.removeItem(id);

        todoApp.render();

        return false;
    },

    render: function() {
        var todos = myStorage.getItems();
        var $todoList = $('#todoList').html('');
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i];

            $todoList.append('<li class="collection-item card-panel todo-item row ' + (todo.checked ? 'grey checked grey lighten-1 ' : '') + '" id="' + todo.id + '">' +
                '<div class="col s11">' +
                '<div>' + todo.text + (todo.checked ? '<span class="check"><i class=" material-icons">check</i></span>' : '<span class="check hide"><i class=" material-icons">check</i></span>') +
                '</div>' +
                '</div>' +
                '<div class="col s1">' +
                '<span class="red-text right"><i class="material-icons remove">close</i></span>' +
                '</div>' +
                '</li>');
        }
    }
}