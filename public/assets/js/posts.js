//文章列表
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(response) {
        console.log(response);

        var html = template('postsTpl', response)
        console.log(html);
        //$('#postsBox').html(html)
    }
})