//添加用户
$('#userForm').on('submit', function() {
    var formData = $(this).serialize();
    console.log(formData);

    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function() {
            location.reload();
        },
        error: function(error) {
            alert('添加失败')
        }
    })
    return false;
});

//用户头像上传
$('#modifyBox').on('change', '#avatar', function() {
    //console.log(this.files[0]);
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //不解析请求
        processData: false,
        //不设置请求类型
        contentType: false,
        success: function(response) {
            //console.log(response);
            //头像预览
            $('#preview').attr('src', response[0].avatar);
            $('#hiddenAva').val(response[0].avatar)
        }
    })
});

//用户列表展示
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        var html = template('userTpl', { data: response })
        console.log(html);
        $('#userList').html(html)
    }
})

//用户信息修改
$('#userList').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyTpl', response);
            $('#modifyBox').html(html);
        }
    })
    $('#modifyBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: formData,
            success: function() {
                location.reload();
            }
        })
        return false
    })
})

//删除用户
$('#userList').on('click', '.delete', function() {
    if (confirm('你确定要删除？')) {
        var id = $(this).attr('data-id');
    }
    $.ajax({
        type: 'delete',
        url: '/users/' + id,
        success: function() {
            location.reload();
        }
    })
})

//批量删除
var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')
selectAll.on('change', function() {
    if (selectAll) {
        deleteMany.show()
    } else {
        deleteMany.hide()
    }
    //全选按钮状态同步给用户
    var status = $(this).prop('checked');
    $('#userList').find('input').prop('checked', status);
});
//用户按钮状态同步给全选按钮
$('#userList').on('change', '.userStatus', function() {
        var inputs = $('#userList').find('input');
        if (inputs.length == inputs.filter(':checked').length) {
            selectAll.prop('checked', true)
        } else {
            selectAll.prop('checked', false)
        }

        //选中的用户大于0显示批量删除
        if (inputs.filter(':checked').length > 0) {
            deleteMany.show()
        } else {
            deleteMany.hide()
        }

    })
    //为批量删除添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    var checkedUser = $('#userList').find('input').filter(':checked');
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('data-id'))
    });
    if (confirm('你确定要进行批量删除操作吗？')) {
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function() {
                location.reload();
            }
        })
    }
})