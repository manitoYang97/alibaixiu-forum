//添加分类
$('#addCategory').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function() {
            location.reload();
        }
    })
    return false;
})

//分类数据展示
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        // console.log(response);
        var html = template('categoryTpl', { data: response })
        $('#categoryTab').html(html)
    }
});
//分类数据修改
$('#categoryTab').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: "get",
        url: '/categories/' + id,
        success: function(response) {
            //console.log(response);
            var html = template('modifyTpl', response);
            $('#categoryBox').html(html)
        }
    })
})
$('#categoryBox').on('submit', '#modCategory', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(response) {
            //console.log(response);
            location.reload()
        }
    })
    return false
})

//删除分类
$('#categoryTab').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    if (confirm('你确定要删除？')) {
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function() {
                location.reload();
            }
        })
    }
})