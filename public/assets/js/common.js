//退出功能
$('#logout').on('click', function() {
    var isConfirm = confirm('你确定要退出');
    if (isConfirm) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html'
            },
            error: function() {
                alert('退出失败')
            }
        })
    }
})