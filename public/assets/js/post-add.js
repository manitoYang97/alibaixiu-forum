//添加文章
//获取文章分类
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(response) {
        console.log(response);

        var html = template('categoryTpl', { data: response });
        console.log(html);

        $('#category').html(html)
    }
});
//文章缩略图上传
$('#feature').on('change', function() {
    //创建一个formData 实现二进制文件上传
    var formData = new FormData()
    formData.append('cover', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            $('#hiddenIpt').val(response[0].cover);
        }
    })
});
$('#postForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function() {
            location.href = '/admin/posts.html'
        }
    })
    return false
})