$(function () {
    // Post Toggle View
    $('#post-comment').hide();
    $('#btn-toggle-comment').click(e => {
        e.preventDefault();
        // slideToggle mostar elemento de id post-comment
        $('#post-comment').slideToggle();
    });

    // Like Button Request
    $('#btn-like').click(function (e) {
        e.preventDefault();
        let imgId = $(this).data('id');
        console.log(imgId)
        $.post('/images/' + imgId + '/like')
            .done(data => {
                console.log('back:', data)
                $('.likes-count').text(data.likes);
            });
    });

    // Delete Button Request
    $('#btn-delete').click(function (e) {
        e.preventDefault();
        let $this = $(this);
        // confirm
        const response = confirm('Are you sure you want to delete this image?');
        if (response) {
            let imgId = $(this).data('id');
            $.ajax({
                url: '/images/' + imgId,
                type: 'DELETE'
            })
                .done(function (result) {
                    $this.removeClass('btn-danger').addClass('btn-success');
                    $this.find('i').removeClass('fa-times').addClass('fa-check');
                });
        }
    });
});




// // button likes
// let btn_like = document.getElementById('btn-like')
//     .addEventListener('click', async (e) => {
//         e.preventDefault();
//         const data_id = e.target.getAttribute('data-id');
//         if (data_id) {
//             // post
//             const req = await fetch(`/images/${data_id}/like`, {
//                 method: 'POST'
//             });
//             // respuesta del servidor
//             const data = await req.json();

//             // likes count
//             let count_likes = document.querySelector('.likes-count');
//             count_likes.innerHTML = '';
//             count_likes.innerHTML = data.likes;
//         };
//     });

// // button delete
// let btn_delete = document.getElementById('btn-delete')
//     .addEventListener('click', async (e) => {
//         e.preventDefault();
//         const data_id = e.target.getAttribute('data-id');
//         console.log(data_id);
//         if (data_id) {
//             // confirm
//             const response = confirm('Are sure you want to delete this image?');
//             if (response) {
//                 // delete
//                 const req = await fetch(`/images/${data_id}`, {
//                     method: 'DELETE'
//                 });
//                 // respuesta
//                 const data = await req.json();
//                 console.log(data);
//             };
//         };
//     });